import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {IWebpackOptions} from "./types/webpack.types";

export function buildLoaders({mode}: IWebpackOptions): ModuleOptions['rules'] {
    const isDev = mode === 'development'

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
        use: 'ts-loader',
        // Не обрабатывай
        exclude: /node_modules/
    }

    // Указываем лоадеры, через которые прогоняется код
    // Порядок имеет значение

    return [
        scssLoader,
        tsLoader
    ]
}
