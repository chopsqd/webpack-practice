import type {Configuration as DevServerConfiguration} from "webpack-dev-server"
import {IWebpackOptions} from "./types/webpack.types";

export function buildDevServer({port}: IWebpackOptions): DevServerConfiguration {
    return {
        port: port ?? 3000,
        open: true,
        historyApiFallback: true,
        hot: true
    }
}
