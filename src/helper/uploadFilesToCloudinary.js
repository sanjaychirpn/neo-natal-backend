import cloudinary from 'cloudinary';

export async function uploadFile(file) {
  // console.log('file', file);
  if (file?.mimetype?.includes('image')) {
    console.log('image file');
    try {
      let result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: 'neonatal',
      });
      return result.secure_url;
    } catch (error) {
      console.log('Error Uploading image to Cloudinary: ' + error);
    }
  } else if (file?.mimetype?.includes('audio')) {
    console.log('audio file');
    try {
      const fName = file.name;
      let result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        resource_type: 'raw',
        public_id: `AudioUploads/${fName}`,
      });
      return result.secure_url;
    } catch (error) {
      console.log('Error Uploading audio to Cloudinary: ' + error);
    }
  } 
  else if (file?.mimetype?.includes('video')) {
    console.log('video file');
    try {
      const fName = file.name;
      let result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        resource_type: 'video',
        public_id: `VideoUploads/${fName}`,
      });
      return result.secure_url;
    } catch (error) {
      console.log('Error Uploading video to Cloudinary: ' + error);
    }
  }else {
    console.log(
      `Unspecified file format: ${file.name} with type: ${file.mimeType}`
    );
  }
}
