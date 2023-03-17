import fs from 'node:fs';

export const checkImage = async (path) => {
  try {
    if (fs.existsSync(path)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}