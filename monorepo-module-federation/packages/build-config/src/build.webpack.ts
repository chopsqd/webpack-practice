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
        mode: mode ?? 'development',
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: "[name].[contenthash].js",
            clean: true
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
        devServer: buildDevServer(options)
    }
}
