import Client from './AxiosClient';

export default {
  post(nameFile, dataFile) {
    const param = {
      Parameters: [
        {
          Name: 'File',
          FileValue: {
            Name: nameFile,
            Data: dataFile,
          },
        },
        {
          Name: 'StoreFile',
          Value: true,
        },
      ],
    };
    return Client.post('/convert/ppt/to/pdf?Secret=0ERdQKaLQrzpOtUv', param);
  },
};
