import webpack, {Configuration} from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {IWebpackOptions} from "./types/webpack.types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";

export function buildPlugins({mode, paths, analyzer}: IWebpackOptions): Configuration['plugins'] {
    const isDev = mode === 'development'

    // Общие плагины
    const plugins: Configuration['plugins'] = [
        // Сборка html по указанному шаблону
        new HTMLWebpackPlugin({
            template: paths.html
        }),
    ]

    // Добавляем плагины для development сборки
    if (isDev) {
        // Отображение прогресс бара
        plugins.push(new webpack.ProgressPlugin())
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
    }

    if (analyzer) {
        // Анализ размера бандлов
        plugins.push(new BundleAnalyzerPlugin())
    }

    return plugins
}
