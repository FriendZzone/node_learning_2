import { S3 } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { config } from 'dotenv'
import { readFileSync } from 'fs'
import path from 'path'

config()

const s3 = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string
  }
})

// s3.listBuckets({}).then((data) => console.log(data))
export const uploadFileToS3 = async ({
  fileName,
  filePath = 'image/jpeg',
  contentType
}: {
  fileName: string
  filePath: string
  contentType?: string
}) => {
  const file = readFileSync(path.resolve(filePath))

  const parallelUploads3 = new Upload({
    client: s3,
    params: {
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: fileName,
      Body: file,
      ContentType: contentType
    }
  })

  parallelUploads3.on('httpUploadProgress', (progress) => {
    console.log(progress)
  })

  const result = await parallelUploads3.done()

  return result
}
