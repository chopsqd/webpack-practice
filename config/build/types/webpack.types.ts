export type ModeType = 'development' | 'production'
export type PlatformType = 'mobile' | 'desktop'

export interface IWebpackPaths {
    entry: string
    html: string
    public: string
    output: string
    src: string
}

export interface IWebpackOptions {
    port: number
    paths: IWebpackPaths
    mode: ModeType
    platform: PlatformType
    analyzer?: boolean
}
