import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import { ImageManager, type ImageParams } from "./imagesManager";
import { urlencoded } from "express";
import mime from "mime-types";

export class AwsImageManager implements ImageManager {

    static instance: AwsImageManager;
    private s3: S3Client;
    private bucketName: string;
    private region: string;

    constructor() {
        if (AwsImageManager.instance) {
            return AwsImageManager.instance;
        }
        AwsImageManager.instance = this;

        this.region = process.env.AWS_REGION
        this.bucketName = process.env.AWS_BUCKET_NAME;
        this.s3 = new S3Client({
            region: this.region,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET
            }
        });
    }

    async uploadImage(params: ImageParams): Promise<any> {

        let payload, contentType;
        if (params.payload) {
            payload = params.payload
        }
        else {
            payload = fs.readFileSync(params.imagePath)
        }
        if (params.contentType) {
            contentType = params.contentType
        }
        else {
            contentType = mime.lookup(params.extension)
        }

        if (!contentType) {
            throw new Error(params.imagePath + " no tiene un tipo de contenido válido")
        }

        const response = await this.s3.send(new PutObjectCommand({
            Bucket: this.bucketName,
            Key: params.key,
            Body: payload,
            ContentType: contentType
        }))

        return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${params.key}`;
    }

    async deleteImage(key: string): Promise<void> {
        await this.s3.send(new DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: key,
        }))
    }
}