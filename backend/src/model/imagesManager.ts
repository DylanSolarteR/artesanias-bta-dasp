
export type ImageParams = { fileName: string, contentType?: string } &
    ({ imagePath: string, payload?: never } | { payload: string, imagePath?: never });

export interface ImageManager {
    uploadImage(params: ImageParams): Promise<string>;
}

