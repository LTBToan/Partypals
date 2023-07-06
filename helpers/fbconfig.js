const fbAdmin = require('firebase-admin');
const multer = require('multer');

const firebaseConnect = fbAdmin.initializeApp({
  credential: fbAdmin.credential.cert({
    projectId: "f-club-management",
    clientEmail: "firebase-adminsdk-601p4@f-club-management.iam.gserviceaccount.com",
    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCiMs6VWK17wrzt\npWG4kaTBg2gyHGLJkpCM5n5MJ8RAz0GQEB9lDRl4Feg6+aX9astGOHsdDCeAVrS9\n1DV7MYbWgD5cYBpEl+fbeuhYJV9VIco4IYWtkH8X5goMlK4Qi+f2JROVvcTmQXg1\nblARX8/OqU0W0CygPy7Tb2WwmMUl1vZ/MWzHs6yrpj2Ah4cpBqoF5h9llqqAuJpU\n9twRgkLzgGxFQ1NJAu48rltqDMtWaR8hZaeKGmF60DfsZeOMuzIjiIA+ud5IU0B4\nwO4DYqqz4WTdUL5UN93pgOKgOoESwAoDxi5hjNLyooFVkQidW56Jt31Rj/QuIBz6\nLOBDykbnAgMBAAECggEAAcut0yQYKm50kyDhONtHOcF+0kba1CWPu0eX9erBsx12\ncKYBYzLmtkt+Tm1KyUvdd9zCES+VtBR9/vmnkuNEsKHiKkgfDcDNu81k4wGc98EP\nxFGSHXFP1NNmSOF0xzssXKRksX95Odu9qPwrEPOo6p1PZrJEk0rHi7cjjVwgLT0W\n+7geQmTtK5TxZlD5de4pbVda5FZiuGc/f2FO1NgwT1iQRUSfhxKiwz/nN1/HqMtV\nf6Jnjjvr7tUdf6ygOOB9vGUSxzfaVISKx3Eu6DgrvFsIlKzboeokaE4l3ChfKia1\n0S0GXe1qJr3tAHWLdmOy99siyIXTzImquW6AOffj8QKBgQDgC7MpCrNcS7LBCa0v\nI+4ZrRaQw5QxTJOu/DV7mSuBhjk79+R1w3Pk4rDiEfSV3hxn9nn7FA+AG2Nv7izJ\nmYejC/v1kmDQhw26PWwqRCnz6uWm/O1WrqCSbIU+eCCjwNf5hUOH8AuCQiVt/ywR\nNM+65vWo5ERn4u5svxQxS0au0QKBgQC5VPTVYj5+MlA4gBOMXtoimwqPvpP07js5\nU2ugSA1mWZ5oC7pvewGkwVNb1DeUh99kIko2/ChE2zYqLHZhxLJVAiSgv9BjsYeA\nrrmhi465NdzE5m2wrO8gKYANLUQ/o9dZx7s2IQ15JBLt1IfTNuZAwKq/92PsCcsi\naZKOZM04NwKBgQCfHpAauPfTuAt3X/j4vurun2ikXdMVBE7q+0K8yncEoaBqf89o\n9+yKhZmcpaXw/nNsPrg5YvDzSgBgUWbLs1eKrAtBSLmrwA8200LL7edhzdVWuNGT\nO6jc9WfYixabVm3NUCE7HXf/Bh1xNsZEXh6enkOgtKYEpj4xS6/6pnzH0QKBgQCp\n98gyik9V3T7FEnDbI4JaimY9PkLjNjkKcf8al/nyC+7C7T6mTuFLACI67X2rspCl\nfO0jUE5+F6ytMOnA8Gu8mqKM6l1rkLz8v0FvblYOdd9qlQm0JmWH0YemjgUxeElg\nBVUkZ1u75eGWTHvksUypxgjS1UfGiZTKkpfeD4RGMQKBgDn3Lh708Ch/rk+i0dQH\nnEhzOmeG91zinq5U7pI+CrSKUmB3FQZumC2IP1LRK8ZDMbdpa5IoP0Na9+Doi7y4\nWQuXmxv9y646c4BX3mMBzkmfMpMYpgF4Uz7vaRJ4gZZwcplb0P6PsHLeul5WuON/\nXi6XevfZLIz116cEVd3LqE2w\n-----END PRIVATE KEY-----\n'
  }),
  storageBucket: "f-club-management.appspot.com"
});


const expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + 60);

exports.upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // Giới hạn kích thước tệp: 5MB
  }
});

exports.uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    const bucket = firebaseConnect.storage().bucket();

    if (!file) {
      reject(new Error('No file uploaded.'));
    }

    const filename = Date.now() + '-' + file.originalname;
    const fileUpload = bucket.file(filename);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    stream.on('error', (err) => {
      console.error('Error uploading file:', err);
      reject(err);
    });

    stream.on('finish', async () => {
      console.log('File uploaded successfully.');

      try {
        // Lấy URL của tệp đã tải lên từ Firebase Storage
        const [signedUrl] = await fileUpload.getSignedUrl({
          action: 'read',
          expires: expirationDate // Thời gian hết hạn URL (60 ngày)
        });
        
        resolve(signedUrl);
      } catch (err) {
        console.error('Error generating signed URL:', err);
        reject(err);
      }
    });

    stream.end(file.buffer);
  });
};


