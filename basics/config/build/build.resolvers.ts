import {Configuration} from "webpack";
import {IWebpackOptions} from "./types/webpack.types";

export function buildResolvers(options: IWebpackOptions): Configuration['resolve'] {
    // Расширения для обработки // полезно для импортов
    // import {} from './main.tsx' -> import {} from './main'

    return {
        extensions: ['.tsx', '.ts', '.js'],
        // Оптимизация импортов | @/* -> ./src/*
        alias: {
            '@': options.paths.src
        }
    }
}
