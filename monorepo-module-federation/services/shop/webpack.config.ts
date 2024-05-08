import path from "path";
import webpack from "webpack";
import {buildWebpack, IWebpackPaths, IWebpackOptions, ModeType, PlatformType} from '@packages/build-config'

interface IEnvVariables {
    mode?: ModeType
    port?: number
    analyzer?: boolean
    platform?: PlatformType
}

export default (env: IEnvVariables) => {
    const paths: IWebpackPaths = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        public: path.resolve(__dirname, 'public'),
        src: path.resolve(__dirname, 'src')
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop'
    })

    return config
}
