import path from "path";
import webpack from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server"
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

type ModeType = 'development' | 'production'

interface IEnvVariables {
    mode: ModeType
    port: number
}

export default (env: IEnvVariables) => {
    const isDev = env.mode === 'development'

    const config: webpack.Configuration = {
        // Формат сборки - development/production
        mode: env.mode ?? 'development',
        // Точка входа в приложение
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        // Куда и как происходит сборка
        output: {
            // Куда
            path: path.resolve(__dirname, 'build'),
            // С каким названием
            // [] -> использование шаблонов, чтобы избежать проблем с кешированием
            filename: "[name].[contenthash].js",
            // Очистка старых файлов перед сборкой
            clean: true
        },
        // Плагины
        // .filter(Boolean) -> чтобы нормально работало isDev && ...
        plugins: [
            // Сборка html по указанному шаблону
            new HTMLWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html')
            }),
            // Отображение прогресс бара
            isDev && new webpack.ProgressPlugin(),
            // Минификация css файлов
            !isDev && new MiniCssExtractPlugin({
                // Сохранение основного файла
                filename: 'css/[name].[contenthash:8].css',
                // Сохранение чанков
                chunkFilename: 'css/[name].[contenthash:8].css'
            })
        ].filter(Boolean),
        module: {
            // Указываем лоадеры, через которые прогоняется код
            // Порядок имеет значение
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Создает 'style' из JS строк
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        // Перевод CSS в CommonJS
                        'css-loader',
                        // Компиляция Sass в CSS
                        'sass-loader'
                    ]
                },
                {
                    // Название (чаще расширение) файлов для обработки
                    test: /\.tsx?$/,
                    // Название лоадера
                    use: 'ts-loader',
                    // Не обрабатывай
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            // Расширения для обработки // полезно для импортов
            // import {} from './main.tsx' -> import {} from './main'
            extensions: ['.tsx', '.ts', '.js']
        },
        // Карта исходного кода
        // помогает понять в каком исходном виде был написан код
        devtool: isDev && 'inline-source-map',
        // Настраиваем локальный сервер
        devServer: {
            port: env.port ?? 3000,
            open: true
        }
    }

    return config
}
