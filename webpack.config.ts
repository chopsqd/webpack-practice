import path from "path";
import webpack from "webpack";
import {buildWebpack} from "./config/build/build.webpack";
import {IWebpackPaths, ModeType} from "./config/build/types/webpack.types";

interface IEnvVariables {
    mode: ModeType
    port: number
    analyzer?: boolean
}

export default (env: IEnvVariables) => {
    const paths: IWebpackPaths = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src')
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        analyzer: env.analyzer,
        paths
    })

    return config
}
