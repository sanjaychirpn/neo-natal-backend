// upload files to s3 bucket
const { BUCKET_NAME, REGION } = process.env;
import { config, S3 } from 'aws-sdk';
config.update({ region: REGION });

export async function uploadFileToS3(file) {
  return new Promise((resolve, reject) => {
    let params = {
      params: {
        Bucket: BUCKET_NAME,
        Key: file.name,
        Body: data,
        ContentType: file.mimetype,
      },
    };

    var upload = new S3.ManagedUpload(params);

    var promise = upload.promise();

    promise
      .then((data) => {
        console.log('Successfully uploaded.');
        console.log(data);
        resolve(data);
      })
      .catch((err) => {
        console.error('There was an error uploading: ', err.message);
        reject(err);
      });
  });
}
