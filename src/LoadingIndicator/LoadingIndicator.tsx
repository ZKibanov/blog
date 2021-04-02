import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingIndicator = () => {
  const antIcon = (
    <LoadingOutlined
      style={{ ...{ color: 'PowderBlue', fontSize: 44 } }}
      spin
    />
  );

  return <Spin indicator={antIcon} />;
};

export default LoadingIndicator;
