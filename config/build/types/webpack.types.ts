export type ModeType = 'development' | 'production'

export interface IWebpackPaths {
    entry: string
    html: string
    output: string
    src: string
}

export interface IWebpackOptions {
    port: number
    paths: IWebpackPaths
    mode: ModeType
    analyzer?: boolean
}
