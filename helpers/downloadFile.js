
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import axios from 'axios';

const __dirname = dirname(fileURLToPath(import.meta.url));

const downloadFile = async (fileUrl, downloadFolder) => {
  console.log('fileUrl', fileUrl)
  // from https://api.telegram.org/file/bot5928167599:AAGjlw6lyVfwuN0rIh_nVR6kg2QUm-4kGj8/photos/file_9.jpg to file_9.jpg 
  const name = fileUrl.split('/').pop()
  // Get the file name
  // let type = fileUrl.split('.').pop();

  // const fileName = path.basename(name + '.' + type); // до 01.02.2023 было так 
  const fileName = path.basename(name);

  // The path of the downloaded file on our machine
  // const localFilePath = path.resolve(__dirname, downloadFolder, fileName);
  const localFilePath = path.resolve(__dirname, downloadFolder, fileName);
  try {
    const response = await axios({
      method: 'GET',
      url: fileUrl,
      responseType: 'stream',
    })

    const w = response.data.pipe(fs.createWriteStream(localFilePath));
    w.on('finish', () => {
      console.log('Successfully downloaded file!');
    });
  } catch (err) {
    if (err?.response?.status === 404) {
      console.log('File not found');
      // download file from another server 
      // const response = await axios({
      //   method: 'GET',
      //   url: 'https://api.telegram.org/file/bot5928167599:AAGjlw6lyVfwuN0rIh_nVR6kg2QUm-4kGj8/photos/file_9.jpg',
    } else {
      console.log('Error', err.message);
    }
  }
};

export default downloadFile;