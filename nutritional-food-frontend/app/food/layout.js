import { Suspense } from 'react';
import { Card, Flex } from 'antd';

const Layout = ({ children }) => {
  return (
    <Suspense
      fallback={
        <Flex justify={'center'}>
          <Card>Loading...</Card>
        </Flex>
      }
    >
      {children}
    </Suspense>
  );
};

export default Layout;
