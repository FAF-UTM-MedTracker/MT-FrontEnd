import { Button, Form, Input, Alert } from 'antd';
import React, { useEffect } from 'react';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux-toolkit/hooks/hooks';
import { userLogin } from '../redux-toolkit/slices/authSlice';



const SigninForm: React.FC = () => {
    const [form] = useForm()
    const navigate = useNavigate()

    const { loading, error, success, userToken } = useAppSelector(
        (state) => state.auth
      )
    const dispatch = useAppDispatch()

    const onFinish = async () => {
        const { email, uPassword } = await form.validateFields();
        dispatch(userLogin({email, uPassword}))
    };

    useEffect(() => {
        if (userToken) {
            console.log("logged in")
            navigate('/patients')
        }
        if (error) console.log('error:',error)
    }, [navigate, success, error, userToken])


    return (
        <Form
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 13 }}
            component={false}
            form={form}
            size="large"
            // style={{minHeight:'50vh', minWidth:'300px'}}
        >

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input a valid email!',}]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="uPassword"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
                

            </Form.Item>
                <div style={{ 
                    marginTop:'-15px',
                    marginBottom:'15px',
                    marginRight:'60px',
                    display: 'flex', 
                    justifyContent:'right'}}> 
                    <a>Forgot password?</a>
                </div>
            

            <div  style={{ 
                margin:'0 auto',
                display: 'flex', 
                justifyContent:'center'
            }}>
                {success?(
                    (<div></div>))
                    :error?(<Alert message={error} type='error' showIcon style={{marginBottom:'10px'}}/>)
                    :(<div></div>)
                }
            </div>
            
            <Form.Item wrapperCol={{ span: 5 }} style={{display: 'flex', justifyContent:'center'}}>
                <Button type="primary" onClick={onFinish} size='large' loading={loading}>
                    Sign in
                </Button>
            </Form.Item>
            <br />
            <p style={{color:'black', textAlign:'center', marginTop:'-20px'}}>Don't have an account? <a href="/signup">Sign up</a> </p>
        </Form>
    );
};

export default SigninForm;