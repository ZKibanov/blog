import { notification } from 'antd';

interface ErrorDetails {
  property: keyof ErrorDetails;
}

const ErrorIndicator = (errors: ErrorDetails) => {
  const errorEntries = Object.entries(errors);
  errorEntries.forEach((el) => {
    notification.open({
      message: 'Errors',
      description: `${el[0]}: ${el[1].join(' ')}`,
    });
  });
};

export default ErrorIndicator;
