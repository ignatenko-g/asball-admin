import { message } from 'antd';

export const showError = (messageError: string) => {
  message.error({
    type: 'error',
    content: messageError,
  });
};
