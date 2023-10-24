import { 
  Button, 
  theme, 
  Card, 
  Avatar, 
  Col, 
  Row, 
  Modal, 
  Tooltip,
  Popconfirm, 
  Popover
} from 'antd';
import * as cloneDeep from 'lodash/cloneDeep';
import { UserOutlined, 
  MedicineBoxTwoTone, 
  EditOutlined, 
  WarningTwoTone, 
  CheckOutlined, 
  CloseOutlined,
  FileDoneOutlined 
} from '@ant-design/icons';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux-toolkit/hooks/hooks';
import { getTreatments, updateTreatment } from '../redux-toolkit/slices/treatmentSlice';
import TextArea from 'antd/es/input/TextArea';
import Timestamp from 'react-timestamp';
import { isMobile } from '../utilities/deviceCheck';
import { getPatientTreatments, getPatients } from '../redux-toolkit/slices/patientSlice';

const TreatmentCards: React.FC = () => {
    const {
    token: { colorBgContainer },
  } = theme.useToken();

const {patients, patientTreatments} = useAppSelector(
        (state) => state.patients
    )

    const {treatments} = useAppSelector(
        (state) => state.treatments)

  const combinePatientData = () =>{

    let temp = cloneDeep(patients) 

    for(let key in patients)
    {
        for(let j=0;j< patientTreatments.length;j++)
        {
            for(let i=0;i< treatments.length;i++)
            {
                if(patientTreatments[j].idTreatment == treatments[i].id 
                  && (patientTreatments[j].idPatient==Number(key))
                  && treatments[i].status.toLowerCase() != "rejected"
                  )
                {
                    temp[patientTreatments[j].idPatient].treatments=[...temp[patientTreatments[j].idPatient].treatments,treatments[i]]
                }
            }
        }
    }

    return temp;
}

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    // console.log(combinePatientData());
  }, [])

  let initialState: any = {}

  for(let k=0;k< treatments.length; k++)
  {
    initialState[treatments[k].id] = false
  }

  const [modalShow, setModal] = useState<any>({...initialState})

  const changeModal = (id: number, open: boolean) =>{
    modalShow[id] = open
    setModal({...modalShow})
  }

  const [value, setValue] = useState('');
  const [changed, setChanged] = useState(false);

  const refreshData=()=>{
    const timer = setTimeout(() => {
      dispatch(getTreatments())
      dispatch(getPatients())
      dispatch(getPatientTreatments())
    }, 500);
    return () => clearTimeout(timer);
  }

  const modalSave = (id: number)=>{
    dispatch(updateTreatment(
      {
        "idTreatment": id, 
        "status": "Accepted", 
        "note": value
      }))

      refreshData()
  } 

  const rejectTreatment = (id: number) => {
    console.log('Rejected');
    dispatch(updateTreatment(
      {
        "idTreatment": id, 
        "status": "Rejected", 
        "note": "The doctor does not monitor your treatment."
      }))

      refreshData()
  }

  const acceptTreatment = (id: number) => {
    console.log('Accepted');
    dispatch(updateTreatment(
      {
        "idTreatment": id, 
        "status": "Accepted", 
        "note": ''
      }))

      refreshData()
  }

  let deviceWidth = '60vw';
  if(isMobile()) deviceWidth = '85vw';

  let patientList: any[] = []
  let tempPatients = combinePatientData()
  for(let k in tempPatients){

    let cardsList = [];
    let medList: any[] = [];
    let treatments = tempPatients[k].treatments
    
    for (let i = 0; i < treatments.length; i++)
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
          <Col key={`med${j}`} flex={'auto'} style={{display:'inline', minWidth:'100px', width:'fit-content'}}>
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
            <div style={{}}>
              <Avatar style={{backgroundColor:'aquamarine', marginRight:'8px'}} size='large' shape='square' icon = {<FileDoneOutlined />}/>
              Treatment for {treatments[i].name}
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
            
          
          :<Button onClick={() => changeModal(treatments[i].id, true)} 

          size='large' type='text'><EditOutlined key="edit"/></Button>} 

          hoverable 
          bordered 
          style={{borderColor:'#01ccb4', width:deviceWidth,  height:'fit-content', marginBottom:'20px'}} >
          
          <Modal
            title = {`Notes for ${tempPatients[k].firstName} ${tempPatients[k].lastName}'s treatment for ${treatments[i].name}`}
            open = {modalShow[treatments[i].id]}
            okText = 'Save'
            okButtonProps={{disabled:!changed}}
            onOk={()=>{modalSave(treatments[i].id);changeModal(treatments[i].id,false);setChanged(false)}}
            onCancel={()=>{changeModal(treatments[i].id,false);setChanged(false)}}
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
  }
    
    
}
if(treatments.length>0)
{patientList.push(

      <Card 
        key={k}
        title= {
          <Popover content={
            <div style={{justifyContent:'center', display:'flex'}}>
          <div style={{width:'250px', height:'100px'}}>
            <div style={{fontSize:'18px', width:'fit-content', fontWeight:'bold'}}>{tempPatients[k].firstName} {tempPatients[k].lastName}'s info:</div>
            <br />
            <div style={{fontSize:'17px', width:'fit-content'}}>Phone number: {tempPatients[k].phoneNumber}</div>
          </div></div>
          } 
          trigger="click">

          <Button type='text' style={{height:'fit-content', width:'fit-content'}}>
            <Avatar style={{backgroundColor:'lightskyblue'}} size='large' shape='square' icon = {<UserOutlined/>}/>
            <b style={{marginLeft:'10px', fontSize:'18px'}}>{tempPatients[k].firstName} {tempPatients[k].lastName}</b>
          </Button>
          </Popover>
        } 
        hoverable 
          bordered 
          style={{width:'fit-content', minHeight:'200px', height:'fit-content', marginBottom:'20px'}} 
      >
        {cardsList}
      </Card>
    )}

}


  return (
    <div>{patientList}</div>
  );
};
export default TreatmentCards;