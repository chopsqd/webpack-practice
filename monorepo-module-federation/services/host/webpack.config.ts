import path from "path";
import webpack from "webpack";
import {buildWebpack, IWebpackPaths, IWebpackOptions, ModeType, PlatformType} from '@packages/build-config'
import packageJson from './package.json'

interface IEnvVariables {
    mode?: ModeType
    port?: number
    analyzer?: boolean
    platform?: PlatformType

    SHOP_REMOTE_URL?: string
    ADMIN_REMOTE_URL?: string
}

export default (env: IEnvVariables) => {
    const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost:3001'
    const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? 'http://localhost:3002'

    const paths: IWebpackPaths = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'bootstrap.tsx'),
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

    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        // Название микрофронтенда
        name: 'host',
        // Файл, который будет удаленно подключаться в host контейнер
        filename: 'remoteEntry.js',
        // Указываем путь до remoteEntry файлов из сервисов
        remotes: {
            shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
            admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
        },
        // Указываем, какие библиотеки общие
        shared: {
            ...packageJson.dependencies,
            react: {
                // eager: true -> подгрузи эту библиотеку сразу
                eager: true,
                // Используй версию из package.json
                // requiredVersion: packageJson.dependencies['react'],
            },
            'react-router-dom': {
                eager: true,
                // requiredVersion: packageJson.dependencies['react-router-dom'],
            },
            'react-dom': {
                eager: true,
                // requiredVersion: packageJson.dependencies['react-dom'],
            },
        },
    }))

    return config
}
