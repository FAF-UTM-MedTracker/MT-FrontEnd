import { 
  Button, 
  Layout, 
  theme, 
  Card, 
  Avatar, 
  Col, 
  Row, 
  Modal, 
  Tooltip,
  Popconfirm } from 'antd';

import { UserOutlined, 
  MedicineBoxTwoTone, 
  EditOutlined, 
  WarningTwoTone, 
  CheckOutlined, 
  CloseOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux-toolkit/hooks/hooks';
import { logout } from '../redux-toolkit/slices/authSlice';
import { getTreatments, updateTreatment } from '../redux-toolkit/slices/treatmentSlice';
import TextArea from 'antd/es/input/TextArea';
import Timestamp from 'react-timestamp';

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

  const {treatments} = useAppSelector(
      (state) => state.treatments
    )

  let initialState: any = {}

  for(let k=0;k< treatments.length; k++)
  {
    initialState[k] = false
  }

  const [modalShow, setModal] = useState<any>({...initialState})

  const changeModal = (id: number, open: boolean) =>{
    modalShow[id] = open
    setModal({...modalShow})
  }
 

  useEffect(() => {
    console.log('use effect');
    dispatch(getTreatments())
}, [dispatch])

  const [value, setValue] = useState('');
  const [changed, setChanged] = useState(false);

  const refreshTreatments=()=>{
    const timer = setTimeout(() => {
      dispatch(getTreatments())
    }, 500);
    return () => clearTimeout(timer);
  }

  const modalSave = (id: number)=>{
    console.log(value);
    
    dispatch(updateTreatment(
      {
        "idTreatment": id, 
        "status": "Accepted", 
        "note": value
      }))

      refreshTreatments()
  } 

  const rejectTreatment = (id: number) => {
    console.log('Rejected');
    dispatch(updateTreatment(
      {
        "idTreatment": id, 
        "status": "Rejected", 
        "note": "The doctor does not monitor your treatment."
      }))

      refreshTreatments()
  }

  const acceptTreatment = (id: number) => {
    console.log('Accepted');
    dispatch(updateTreatment(
      {
        "idTreatment": id, 
        "status": "Accepted", 
        "note": ''
      }))

      refreshTreatments()
  }

  
  let cardsList = [];
  let medList: any[] = [];
  for (let i = 0; i< treatments.length; i++)
  {
    if(treatments[i].status.toLowerCase() != "rejected")
  {
    medList[i]= [];

    for (let j = 0; j< treatments[i].meds.length; j++)
    {
      let medicines = treatments[i].meds

      let date = new Date(medicines[j].timeUse)
      let now = new Date()

      let medColor = 'mintcream'

      if (date.getTime() < now.getTime()) medColor = 'mistyrose'

      medList[i].push(
        <Col key={j} flex={'auto'} style={{display:'inline', minWidth:'100px', width:'fit-content'}}>
        <Card type="inner" style={{backgroundColor: medColor}} hoverable
          title= {<div style={{fontSize:16}}><MedicineBoxTwoTone /> {medicines[j].name}</div> }
          extra={
          date.getTime() < now.getTime()?
          (<Tooltip color='red' title='Patient has not taken this medicine.'>
            <WarningTwoTone style={{fontSize:25}} twoToneColor='red' />
          </Tooltip>)
          :((<div></div>))
          }
        >
          Due <Timestamp date={date} />
        </Card>
        </Col>
      )
    }
    cardsList.push(
      <Card 
        key={i} 
        title= {
          <div style={{fontWeight:'normal'}}>
            <Avatar style={{backgroundColor:'lightskyblue'}} size='large' shape='square' icon = {<UserOutlined/>}/>
            <b style={{marginLeft:'10px'}}>Name Surname:</b> Treatment for {treatments[i].name}
          </div>
        } 
        
        extra={treatments[i].status.toLowerCase() == "pending"?(<div>
          <Popconfirm onConfirm={()=>acceptTreatment(treatments[i].id)} title='Accept treatment assignment? '>
            <Button icon={<CheckOutlined/>} shape='circle' style={{color:'green', borderColor:'green', marginRight:'10px'}} />  
          </Popconfirm>

            <Popconfirm onConfirm={()=>rejectTreatment(treatments[i].id)} title='Reject treatment assignment? '>
              <Button icon={<CloseOutlined/>} shape='circle' danger/>
            </Popconfirm>
        </div>)
          
        
        :<Button onClick={() => changeModal(i, true)} 

        size='large' type='text'><EditOutlined key="edit"/></Button>} 

        hoverable 
        bordered 
        style={{width:'60vw', minHeight:'200px', height:'fit-content', marginBottom:'20px'}} >
        
        <Modal
          title = {`Notes for Patient's treatment for ${treatments[i].name}`}
          open = {modalShow[i]}
          okText = 'Save'
          okButtonProps={{disabled:!changed}}
          onOk={()=>{modalSave(treatments[i].id);changeModal(i,false);setChanged(false)}}
          onCancel={()=>{changeModal(i,false);setChanged(false)}}
        >
          <TextArea
              showCount
              maxLength={2048}
              defaultValue={treatments[i].note}
              onChange={(e) => {setValue(e.target.value);setChanged(true)}}
              placeholder="Notes for this treatment"
              autoSize={{ minRows: 7, maxRows: 10 }}
              style={{marginBottom:'20px'}}
            />

        </Modal>
          <Row gutter={[8,8]}>
            {medList[i]}
          </Row>
          
      </Card>
    )
  }}


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
          <img src="src/assets//pill.svg" style={{width:'50px', height:'50px', marginRight:'10px', marginTop:'5px'}} />
          <b style={{color:'white', fontSize:'36px', verticalAlign:'top'}}>MedTracker</b>
          <Button onClick={onClick} size='large' style={{float:'right', marginTop:'10px'}}>Log out</Button>
      
      </Header>
      <Content className="site-layout" style={{ padding: '5vh 50px', 
      backgroundImage:'linear-gradient(lightblue, lightgray)', 
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