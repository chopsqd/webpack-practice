import {IWebpackOptions} from "../types/webpack.types";
import {removeDataTestIdBabelPlugin} from "./babel.remove-testId-plugin";

export function babelBuildLoader({mode}: IWebpackOptions) {
    const isDev = mode === 'development'

    const plugins = []

    if (!isDev) {
        plugins.push([
            removeDataTestIdBabelPlugin,
            {
                props: ['data-testId']
            }
        ])
    }

    return {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-typescript',
                    ['@babel/preset-react', {
                        runtime: isDev ? 'automatic' : 'classic'
                    }]
                ],
                plugins: plugins.length ? plugins : undefined
            }
        }
    }
}
