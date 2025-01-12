import React from 'react';
import { Layout } from 'antd';
import Header from '../Header/Header'; // Ваш компонент хедера
import Footer from '../Footer/Footer'; // Ваш компонент футера

const { Content } = Layout;

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <div className='line'></div>
      <Content style={{  maxWidth: '1200PX', margin: '0 auto', width: '100%', padding: '0 24px' }}>{children}</Content>
      <Footer />
    </Layout>
  );
};

export default AppLayout;
