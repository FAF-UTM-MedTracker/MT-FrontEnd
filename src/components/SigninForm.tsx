import { Button, Form, Input, Alert } from 'antd';
import React, { useEffect } from 'react';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux-toolkit/hooks/hooks';
import { authReducer, registerUser, userLogin } from '../redux-toolkit/slices/authSlice';



const SigninForm: React.FC = () => {
    const [form] = useForm()
    const navigate = useNavigate()

    const { loading, error, success } = useAppSelector(
        (state) => state.auth
      )

    // const { users } = useAppSelector((state) => ({ ...state.auth }))
    const dispatch = useAppDispatch()


    const onFinish = async (data: any) => {
        const { email, uPassword } = await form.validateFields();
        dispatch(userLogin({email, uPassword}))
    };

    useEffect(() => {
        if (success) console.log("logged in")
        if (error) console.log('error:',error)
        // if (userInfo) navigate('/user-profile')
    }, [navigate, success, error])


    return (
        <Form
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 13 }}
            component={false}
            form={form}
            size="large"
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

            <div  style={{ 
                margin:'0 auto',
                display: 'flex', 
                justifyContent:'center'
            }}>
                {success?(
                    <Alert message={"Signed in successfully"} type='success' showIcon style={{marginBottom:'10px'}}/>)
                    :error?(<Alert message={error} type='error' showIcon style={{marginBottom:'10px'}}/>)
                    :(<div></div>)
                }
            </div>
            
            <Form.Item wrapperCol={{ span: 5 }} style={{display: 'flex', justifyContent:'center'}}>
                <Button type="primary" onClick={onFinish} size='large' loading={loading}>
                    Sign in
                </Button>
            </Form.Item>
            <p style={{color:'black', textAlign:'center'}}>Don't have an account? <a href="/signup">Sign up</a> </p>
        </Form>
    );
};

export default SigninForm;