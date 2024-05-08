import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {IWebpackOptions} from "./types/webpack.types";
import ReactRefreshTypeScript from "react-refresh-typescript";
import {babelBuildLoader} from "./babel/babel.build-loader";

export function buildLoaders(options: IWebpackOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development'

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
    }

    const svgrLoader = {
        test: /\.svg$/i,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true,
                                }
                            }
                        ]
                    }
                }
            }
        ]
    }

    const cssModulesLoader = {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
            }
        }
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            cssModulesLoader,
            'sass-loader'
        ]
    }

    const tsLoader = {
        test: /\.tsx?$/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: isDev,
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypeScript()].filter(Boolean)
                    })
                }
            }
        ],
        exclude: /node_modules/,
    }

    const babelLoader = babelBuildLoader(options)

    return [
        assetLoader,
        scssLoader,
        tsLoader,
        // babelLoader,
        svgrLoader
    ]
}
