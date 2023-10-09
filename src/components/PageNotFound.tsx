import { NavLink, Outlet } from 'react-router-dom'
import { useAppSelector } from '../redux-toolkit/hooks/hooks'
import { Button, Layout, Result } from 'antd';

const { Header, Content, Footer } = Layout;

const PageNotFound: React.FC = () => {
  const { userInfo, success } = useAppSelector((state) => state.auth)

  // show unauthorized screen if no user is found in redux store
  if (!success) {
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
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary">Back Home</Button>}
        />
        
      </Content>
      <Footer style={{ textAlign: 'center' }}>MedTracker ©2023 Created by PBL Team 10, FAF 3rd year</Footer>
    </Layout>
        
    )
  }

  // returns child route elements
  return <Outlet />
}
export default PageNotFound