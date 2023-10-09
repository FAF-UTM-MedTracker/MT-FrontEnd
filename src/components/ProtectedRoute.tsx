import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux-toolkit/hooks/hooks'
import { Button, Layout, Result } from 'antd';

const { Header, Content, Footer } = Layout;

const ProtectedRoute = () => {
  const { userInfo, success, userToken } = useAppSelector((state) => state.auth)

  const navigate = useNavigate()

  const onFinish = async (data: any) => {
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
        }}
      >
        <div className="demo-logo" />
        <img src="src/assets//pill.svg" style={{width:'50px', height:'50px', marginRight:'10px'}} />
        <h1 style={{color:'white'}}>MedTracker</h1>
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