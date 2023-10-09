import { Breadcrumb, Layout, Menu, theme, Space } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SigninForm from './SigninForm';
// import styled from 'styled-components';

const { Header, Content, Footer } = Layout;

const SigninLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      style={{
        width: '100vw',
        height: '100vh',
        boxSizing:  'border-box'
      }}>
      <Header
        style={{
          alignSelf: 'right',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <img src="src/assets//pill.svg" style={{width:'50px', height:'50px', marginRight:'10px'}} />
        <h1 style={{color:'white'}}>MedTracker</h1>
      </Header>
      <Content className="site-layout" style={{ padding: '10vh 50px', 
      backgroundImage:'linear-gradient(lightblue, white)', 
      display: 'flex', justifyContent:'center'}}>

        <div className='rectangle' style={{display: 'inline-block', 
        width: 'fit-content', 
        height: 'fit-content',
        background: 'white',
        margin:'0 auto',
        borderRadius:'50px'
        }}>
          <h1 style={{color: 'black', textAlign:'center'}}>Sign in</h1>
          <SigninForm/>
        </div>
        
      </Content>
      <Footer style={{ textAlign: 'center' }}>MedTracker ©2023 Created by PBL Team 10, FAF 3rd year</Footer>
    </Layout>
  );
};
export default SigninLayout;