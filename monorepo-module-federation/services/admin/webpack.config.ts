import path from "path";
import webpack from "webpack";
import {buildWebpack, IWebpackPaths, IWebpackOptions, ModeType, PlatformType} from '@packages/build-config'
import packageJson from './package.json'

interface IEnvVariables {
    mode?: ModeType
    port?: number
    analyzer?: boolean
    platform?: PlatformType
}

export default (env: IEnvVariables) => {
    const paths: IWebpackPaths = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'bootstrap.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        public: path.resolve(__dirname, 'public'),
        src: path.resolve(__dirname, 'src')
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3002,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop'
    })

    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        // Название микрофронтенда
        name: 'admin',
        // Файл, который будет удаленно подключаться в host контейнер
        filename: 'remoteEntry.js',
        // Указываем, что предоставляем контейнеру
        exposes: {
            './Router': './src/router/Router.tsx',
        },
        shared: {
            ...packageJson.dependencies,
            react: {
                eager: true,
                requiredVersion: packageJson.dependencies['react'],
            },
            'react-router-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-router-dom'],
            },
            'react-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-dom'],
            },
        },
    }))

    return config
}
