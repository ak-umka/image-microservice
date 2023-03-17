import aws from 'aws-sdk';
import axios from 'axios';
import dotenv from 'dotenv';

import Area from '../models/area.js';

dotenv.config()

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
})

class UploadImageService {
    async uploadImage() {
        try {
            const allimage = await Area.find()

            for (let i = 0; i < allimage.length; i++) {
                const imageUrl = allimage[i].images?.fileId
                const res = await axios.get(imageUrl, {
                    responseType: 'arraybuffer'
                }).catch(err => {
                    if (err?.response?.status === 404) {
                        console.log('File not found');
                    }
                });

                if (res === undefined) {
                    continue;
                }

                const buffer = Buffer.from(res?.data, 'binary');
                await s3.headObject({
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    Key: imageUrl.split('/').pop(),
                }, (err, data) => {
                    if (!err) {
                        console.log('File already exists in S3:', data);
                    } else {
                        // upload to s3
                        s3.upload({
                            Bucket: process.env.AWS_S3_BUCKET_NAME,
                            Key: imageUrl.split('/').pop(),
                            Body: buffer,
                        }).promise().then((data) => {
                            console.log('File uploaded successfully')
                        })
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    async uploadViolationImage() {
        try {
            const folderName = 'violation';
            const allimage = await Area.find().populate('violation')
            for (let i = 0; i < allimage.length; i++) {
                const areaViolation = allimage[i].violation;
                for (let j = 0; j < areaViolation.length; j++) {
                    const imageUrl = areaViolation[j].image?.fileId;
                    const res = await axios.get(imageUrl, {
                        responseType: 'arraybuffer'
                    }).catch(err => {
                        if (err?.response?.status === 404) {
                            console.log('File not found');
                        }
                    });

                    if (res === undefined) {
                        continue;
                    }

                    const buffer = Buffer.from(res?.data, 'binary');

                    // upload to s3 to folder violation 
                    await s3.headObject({
                        Bucket: process.env.AWS_S3_BUCKET_NAME,
                        Key: imageUrl.split('/').pop(),
                    }, (err, data) => {
                        if (!err) {
                            console.log('File already exists in S3:', data);
                        } else {
                            // upload to s3
                            s3.upload({
                                Bucket: process.env.AWS_S3_BUCKET_NAME,
                                Key: imageUrl.split('/').pop(),
                                Body: buffer,
                            }).promise().then((data) => {
                                console.log('File uploaded successfully')
                            })
                        }
                    })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default new UploadImageService()