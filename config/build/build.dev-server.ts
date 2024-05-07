import type {Configuration as DevServerConfiguration} from "webpack-dev-server"
import {IWebpackOptions} from "./types/webpack.types";

export function buildDevServer({port}: IWebpackOptions): DevServerConfiguration {
    // Настраиваем локальный сервер

    return {
        port: port ?? 3000,
        open: true,
        // Для работы роутинга
        // Если раздавать статику через nginx, то надо делать проксирование на Index.html
        historyApiFallback: true,
        // Обновление кода без перезагрузки страницы (HMR)
        hot: true
    }
}
