import React from 'react';
import { AutoComplete, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingIndicator = () => {
  const antIcon = (
    <LoadingOutlined
      style={{ ...{ color: 'PowderBlue', fontSize: 144 } }}
      spin
    />
  );

  const spinStyle = { marginTop:"300px" }

  return <Spin indicator={antIcon} style={spinStyle}/>;
};

export default LoadingIndicator;
