const fs = require('fs');
const path = require('path');

const initFolders = () => {
  const folders = [
    'uploads',
    'uploads/photos',
    'uploads/documents',
    'uploads/documents/cv',
    'uploads/documents/payments'
  ];

  folders.forEach(folder => {
    const folderPath = path.join(__dirname, '..', folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`Created folder: ${folder}`);
    }
  });
};

module.exports = initFolders;