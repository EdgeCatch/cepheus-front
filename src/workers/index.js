import worker from 'workerize-loader!./crypto'; // eslint-disable-line import/no-webpack-loader-syntax
let instance = worker(); // `new` is optional

export const generateAccount = async () => instance.generateAccount();
