import {Configuration} from "webpack";
import {IWebpackOptions} from "./types/webpack.types";

export function buildResolvers(options: IWebpackOptions): Configuration['resolve'] {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': options.paths.src
        }
    }
}
