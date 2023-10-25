import { Layout, theme} from 'antd';
import React from 'react';
import SignupForm from './SignupForm';
import { isMobile } from '../utilities/deviceCheck';

const { Header, Content, Footer } = Layout;

const SignupLayout: React.FC = () => {
  const {
    token: {},
  } = theme.useToken();

  return (
    <Layout
      style={{
        width: '100vw',
        minHeight: '100vh',
        height: 'fit-content',
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
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          backgroundColor: 'white'
        }}
      >
          <img src="/pill.png" style={{width:'50px', height:'50px', marginRight:'10px', marginTop:'5px', marginLeft:'-30px'}} />
          <b style={{fontSize:'36px', verticalAlign:'top', alignSelf:'center'}}>MedTracker</b>
      </Header>
      <Content className="site-layout" style={{ padding: '5vh 0px', 
      backgroundImage:'linear-gradient(lightblue, white)', 
      display: 'flex', justifyContent:'center'}}>

        <div className='rectangle' style={!isMobile()?{display: 'inline-block', 
        minWidth:'500px',
        width: 'fit-content', 
        height: 'fit-content',
        background: 'white',
        margin:'0 auto',
        borderRadius:'50px'
        }
        :{display: 'inline-block', 
          marginTop:'-2vh',
          width: '93vw', 
          height: 'fit-content',
          background: 'white',
          borderRadius:'50px'
        }}>
          <h1 style={{color: 'black', textAlign:'center'}}>Sign up</h1>
          <SignupForm/>
        </div>
        
      </Content>
      <Footer style={{ textAlign: 'center' }}>MedTracker ©2023 Created by PBL Team 10, FAF 3rd year</Footer>
    </Layout>
  );
};
export default SignupLayout;