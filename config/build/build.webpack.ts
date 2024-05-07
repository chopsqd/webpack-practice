import webpack from "webpack";
import {buildDevServer} from "./build.dev-server";
import {buildLoaders} from "./build.loaders";
import {buildPlugins} from "./build.plugins";
import {buildResolvers} from "./build.resolvers";
import {IWebpackOptions} from "./types/webpack.types";

export function buildWebpack(options: IWebpackOptions): webpack.Configuration {
    const {mode, paths} = options
    const isDev = mode === 'development'

    return {
        // Формат сборки - development/production
        mode: mode ?? 'development',
        // Точка входа в приложение
        entry: paths.entry,
        // Куда и как происходит сборка
        output: {
            // Куда
            path: paths.output,
            // С каким названием
            // [] -> использование шаблонов, чтобы избежать проблем с кешированием
            filename: "[name].[contenthash].js",
            // Очистка старых файлов перед сборкой
            clean: true
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        // Карта исходного кода
        // помогает понять в каком исходном виде был написан код
        devtool: isDev && 'inline-source-map',
        devServer: buildDevServer(options)
    }
}
