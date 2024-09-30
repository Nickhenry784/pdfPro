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
    return Client.post(
      '/convert/pdf/to/compress?Secret=0ERdQKaLQrzpOtUv',
      param,
    );
  },
};
