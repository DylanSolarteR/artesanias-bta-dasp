
export type ImageParams = { key: string, contentType?: string, extension?: string } &
    ({ imagePath: string, payload?: never } | { payload: string, imagePath?: never });

export interface ImageManager {
    uploadImage(params: ImageParams): Promise<string>;
    deleteImage(key: string): Promise<void>;
}

