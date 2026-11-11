import { Alert } from 'antd';

function ErrorMessage({
  message = 'Something went wrong!',
  description,
}) {
  return (
    <Alert
      message={message}
      description={description}
      type="error"
      showIcon
    />
  );
}

export default ErrorMessage;