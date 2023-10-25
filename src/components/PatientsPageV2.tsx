import { 
  Button, 
  Layout, 
  Tooltip, 
  theme, 
} from 'antd';

import { LogoutOutlined
} from '@ant-design/icons';

import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch} from '../redux-toolkit/hooks/hooks';
import { logout } from '../redux-toolkit/slices/authSlice';
import { getTreatments} from '../redux-toolkit/slices/treatmentSlice';
import TreatmentCards from './TreatmentCards';
import { isMobile } from '../utilities/deviceCheck';
import { getPatientTreatments, getPatients } from '../redux-toolkit/slices/patientSlice';

const { Header, Content, Footer } = Layout;

const PatientsPage: React.FC = () => {
    const {
    token: {},
  } = theme.useToken();
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onClick =()=> {
    dispatch(logout())
    navigate('/login')
  }

  useEffect(() => {
    console.log('use effect');
    console.log('Mobile check: ', isMobile());
    
    dispatch(getTreatments())
    dispatch(getPatients())
    dispatch(getPatientTreatments())
}, [dispatch])


  return (
    <Layout
      style={{
        width: '100vw',
        minHeight:'100vh',
        height: 'fit-content',
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
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          backgroundColor: 'white'
        }}
      >
        
          <img src="/pill.png" style={{width:'50px', height:'50px', marginRight:'10px', marginTop:'5px', marginLeft:'-30px'}} />
          <b style={{fontSize:'36px', verticalAlign:'top', alignSelf:'center'}}>MedTracker</b>
          <Tooltip title='Log out'>
            <Button shape='circle' onClick={onClick} size='large' style={{float:'right', marginTop:'10px', marginRight:'-30px'}} icon={<LogoutOutlined />}/>
          </Tooltip>

      </Header>
      <Content className="site-layout" style={{ padding: '2vh 50px', 
        backgroundImage:'linear-gradient(lightblue, lightgray)', 
        minHeight:'85vh',
        display: 'flex', 
        justifyContent:'center'}}>

        <TreatmentCards/>
      </Content>
      <Footer style={{ textAlign: 'center' }}>MedTracker ©2023 Created by PBL Team 10, FAF 3rd year</Footer>
    </Layout>
  );
};
export default PatientsPage;