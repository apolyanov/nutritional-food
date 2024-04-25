'use client';
import { Card, Typography } from 'antd';

const Header = () => {
  return (
    <Card style={{ marginTop: 32 }} bordered={false}>
      <Typography.Title>Nutritional Foods</Typography.Title>
    </Card>
  );
};

export default Header;
