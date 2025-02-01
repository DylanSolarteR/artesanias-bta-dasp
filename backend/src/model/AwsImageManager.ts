import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import { ImageManager, type ImageParams } from "./imagesManager";
import { urlencoded } from "express";

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

        let payload
        if (params.payload) {
            payload = params.payload
        }
        else {
            payload = fs.readFileSync(params.imagePath)
        }

        const response = await this.s3.send(new PutObjectCommand({
            Bucket: this.bucketName,
            Key: params.fileName,
            Body: payload,
            ContentType: params.contentType
        }))

        return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${params.fileName}`;
    }
}