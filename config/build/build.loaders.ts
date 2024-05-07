import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {IWebpackOptions} from "./types/webpack.types";
import ReactRefreshTypeScript from "react-refresh-typescript";

export function buildLoaders({mode}: IWebpackOptions): ModuleOptions['rules'] {
    const isDev = mode === 'development'

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
    }

    const svgrLoader = {
        test: /\.svg$/i,
        use: [
            {
                // Работа с SVG изображениями как с JSX элементами
                loader: '@svgr/webpack',
                options: {
                    // Конфигурация для работы с SVG иконками
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                // Позволяет удобно задавать цвет SVG иконкам
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
            // Конфигурация модулей
            modules: {
                // Формирование названий для итоговых селекторов из css модулей
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
            }
        }
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Создает 'style' из JS строк
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Перевод CSS в CommonJS
            cssModulesLoader,
            // Компиляция Sass в CSS
            'sass-loader'
        ]
    }

    const tsLoader = {
        // Название (чаще расширение) файлов для обработки
        test: /\.tsx?$/,
        // Название лоадера
        use: [
            {
                loader: 'ts-loader',
                // Оптимизируем работу с typescript
                options: {
                    transpileOnly: isDev,
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypeScript()].filter(Boolean)
                    })
                }
            }
        ],
        // Не обрабатывай
        exclude: /node_modules/,
    }

    // Указываем лоадеры, через которые прогоняется код
    // Порядок имеет значение

    return [
        assetLoader,
        scssLoader,
        tsLoader,
        svgrLoader
    ]
}
