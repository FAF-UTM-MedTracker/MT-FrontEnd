import { Outlet, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux-toolkit/hooks/hooks'
import { Button, Layout, Result } from 'antd';

const { Header, Content, Footer } = Layout;

const ProtectedRoute = () => {
  const { userToken } = useAppSelector((state) => state.auth)

  const navigate = useNavigate()

  const onFinish = async () => {
      navigate('/login')
  };

  // show unauthorized screen if no user is found in redux store
  if (!userToken) {

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
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          backgroundColor: 'white'
        }}
      >
          <img src="/pill.png" style={{width:'50px', height:'50px', marginRight:'10px', marginTop:'5px', marginLeft:'-30px'}} />
          <b style={{fontSize:'36px', verticalAlign:'top', alignSelf:'center'}}>MedTracker</b>
      </Header>
      <Content className="site-layout" style={{ padding: '10vh 50px', 
      backgroundImage:'linear-gradient(lightblue, white)', 
      display: 'flex', justifyContent:'center'}}>

          <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button onClick={onFinish} type="primary">Sign in</Button>}
        />
        
      </Content>
      <Footer style={{ textAlign: 'center' }}>MedTracker ©2023 Created by PBL Team 10, FAF 3rd year</Footer>
    </Layout>
        
    )
  }

  // returns child route elements
  return <Outlet />
}
export default ProtectedRoute