import { Button, Layout, theme, Card} from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from './SignupForm';
import { useAppDispatch, useAppSelector } from '../redux-toolkit/hooks/hooks';
import { authReducer, userLogin } from '../redux-toolkit/slices/authSlice';
import { logout } from '../redux-toolkit/slices/authSlice';
import { getTreatments } from '../redux-toolkit/slices/treatmentSlice';

const { Header, Content, Footer } = Layout;

const PatientsPage: React.FC = () => {
    const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onClick =()=> {
    dispatch(logout())
    navigate('/login')
  }

  const onRequest =()=> {
    dispatch(getTreatments())
  }
  
//   useEffect(() => {
//     dispatch(getTreatments())
// }, [dispatch])

  const {treatments} = useAppSelector(
    (state) => state.treatments
  )
  
  let cardsList = [];
  for (let i = 0; i<= 4; i++)
  {
    cardsList.push(<Card bordered style={{width:'60vw', height:'200px', marginBottom:'20px'}} title= {`Treatment ${i}`} key={i}></Card>)
  }


  return (
    <Layout
      style={{
        width: '100vw',
        minHeight:'100vh',
        height: 'fit-content',
        // boxSizing:  'border-box',
        justifyContent:'center',
        display: 'inline-block',
        alignItems: 'center',
      }}>
      <Header
        style={{
          alignSelf: 'right',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'inline-block',
          alignItems: 'center',
        }}
      >
        
          <div className="demo-logo" />
          <img src="src/assets//pill.svg" style={{width:'50px', height:'50px', marginRight:'10px'}} />
          <b style={{color:'white', fontSize:'36px', verticalAlign:'top'}}>MedTracker</b>
          {/* <Button onClick={onRequest} size='large' style={{float:'right', marginTop:'10px'}}>Request</Button> */}
          <Button onClick={onClick} size='large' style={{float:'right', marginTop:'10px'}}>Log out</Button>
      
      </Header>
      <Content className="site-layout" style={{ padding: '10vh 50px', 
      backgroundImage:'linear-gradient(lightblue, white)', 
      minHeight:'85vh',
      display: 'flex', 
      // height: 'fit-content',
      justifyContent:'center'}}>

        <div>{cardsList}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>MedTracker ©2023 Created by PBL Team 10, FAF 3rd year</Footer>
    </Layout>
  );
};
export default PatientsPage;