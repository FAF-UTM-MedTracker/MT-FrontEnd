import { Alert, Button, Form, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import { PasswordInput } from 'antd-password-input-strength';
import { useAppDispatch, useAppSelector } from '../redux-toolkit/hooks/hooks';
import { authReducer, registerUser } from '../redux-toolkit/slices/authSlice';



const SignupForm: React.FC = () => {
    const [form] = useForm()
    const navigate = useNavigate()

    const { loading, userInfo, error, success } = useAppSelector(
        (state) => state.auth
      )

    // const { users } = useAppSelector((state) => ({ ...state.auth }))
    const dispatch = useAppDispatch()

    const [level, setLevel] = useState(0)

    const minLevel = 1;
    const errorMessage = 'Password is too weak';


    const onFinish = async (data: any) => {
        const {name, surname, email, uPassword, confirm_password } = await form.validateFields();
        const doctor = true
        console.log('password:', uPassword)
        dispatch(registerUser({email, uPassword, doctor:true}))
    };

    useEffect(() => {
        if (success) {
            console.log("registered")
            if (success) navigate('/')
        }
        if (error) console.log('error:',error)
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
                label="First name"
                name="name"
                rules={[{ required: true, message: 'Please input your first name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Surname"
                name="surname"
                rules={[{ required: true, message: 'Please input your surname!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input a valid email!', type: 'email' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="uPassword"
                hasFeedback
                rules={[{ 
                    required: true, 
                    // message: 'Please create your password!',
                    validator: async () => {
                        return level >= minLevel ? Promise.resolve() : Promise.reject(errorMessage);
                      },
                    message: errorMessage
                 }]}
            >
                <PasswordInput 
                    onLevelChange={setLevel}
                    // settings={{
                    //     colorScheme}}
                    />
            </Form.Item>

            <Form.Item
                label="Confirm password"
                name="confirm_password"
                dependencies={['uPassword']}
                hasFeedback
                rules={[
                    { 
                        required: true, 
                        message: 'Please confirm your password!' 
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('uPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                      }),

                ]}
            >
                <Input.Password/>
            </Form.Item>
            <div  style={{ 
                margin:'0 auto',
                display: 'flex', 
                justifyContent:'center'
            }}>
                {success?(
                    <Alert message={"Signed up successfully"} type='success' showIcon style={{marginBottom:'10px'}}/>)
                    :error?(<Alert message={error} type='error' showIcon style={{marginBottom:'10px'}}/>)
                    :(<div></div>)
                }
            </div>
            <Form.Item wrapperCol={{ span: 5 }} style={{display: 'flex', justifyContent:'center'}}>
                <Button type="primary" onClick={onFinish} size='large' loading={loading}>
                    Sign up
                </Button>
            </Form.Item>
            <p style={{color:'black', textAlign:'center'}}>Already have an account? <a href="/">Sign in</a> </p>
        </Form>
    );
};

export default SignupForm;