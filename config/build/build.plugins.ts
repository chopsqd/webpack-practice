import path from "path";
import webpack, {Configuration, DefinePlugin} from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {IWebpackOptions} from "./types/webpack.types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins({mode, paths, analyzer, platform}: IWebpackOptions): Configuration['plugins'] {
    const isDev = mode === 'development'

    // Общие плагины
    const plugins: Configuration['plugins'] = [
        // Сборка html по указанному шаблону
        new HTMLWebpackPlugin({
            template: paths.html,
            favicon: path.resolve(paths.public, 'favicon.ico')
        }),
        // Глобальные переменные -> значения на этапе сборки
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(platform),
            __ENV__: JSON.stringify(mode)
        })
    ]

    // Добавляем плагины для development сборки
    if (isDev) {
        // Отображение прогресс бара
        plugins.push(new webpack.ProgressPlugin())
        // Выносит проверку типов в отдельный процесс, не нагружая сборку
        plugins.push(new ForkTsCheckerWebpackPlugin())
        // Обновление без перезагрузки страницы (HMR)
        plugins.push(new ReactRefreshWebpackPlugin)
    }

    // Добавляем плагины для production сборки
    if (!isDev) {
        // Минификация css файлов
        plugins.push(new MiniCssExtractPlugin({
            // Сохранение основного файла
            filename: 'css/[name].[contenthash:8].css',
            // Сохранение чанков
            chunkFilename: 'css/[name].[contenthash:8].css'
        }))
        // Копирование файлов в итоговую сборку
        plugins.push(new CopyPlugin({
            patterns: [
                { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') }
            ]
        }))
    }

    if (analyzer) {
        // Анализ размера бандлов
        plugins.push(new BundleAnalyzerPlugin())
    }

    return plugins
}
