import { Alert, Button, Form, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import { PasswordInput } from 'antd-password-input-strength';
import { useAppDispatch, useAppSelector } from '../redux-toolkit/hooks/hooks';
import { authReducer, registerUser } from '../redux-toolkit/slices/authSlice';
import PhoneInput from "antd-phone-input";


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
        const {firstName, lastName, phoneNumber, email, uPassword, confirm_password } = await form.validateFields();
        dispatch(registerUser({firstName, lastName, email, "phoneNumber":`+${phoneNumber.countryCode }${phoneNumber.areaCode}${phoneNumber.phoneNumber}`,uPassword, "isDoctor":true}))
    };

    useEffect(() => {
        if (success) {
            console.log("registered")
            navigate('/login')
        }
        if (error) console.log('error:',error)
    }, [navigate, success, error])


    return (
        <Form
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 13 }}
            component={false}
            form={form}
            size="large"
        >
            <Form.Item
                label="First name"
                name="firstName"
                rules={[{ required: true, message: 'Please input your first name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Surname"
                name="lastName"
                rules={[{ required: true, message: 'Please input your surname!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[{ required: true, 
                    // message: 'Please input your phone number!', 
                    validator: (_, {valid}) => {
                        if (valid()) {
                          return Promise.resolve();
                        }
                        return Promise.reject("Invalid phone number");
                      }
                }]}
            >
                <PhoneInput size='large'
                    enableSearch/>
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, 
                    message: 'Please input a valid email!', type: 'email' }]}
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
                          return Promise.reject(new Error('The passwords do not match!'));
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
                    (<div></div>))
                    :error?(<Alert message={error} type='error' showIcon style={{marginBottom:'10px'}}/>)
                    :(<div></div>)
                }
            </div>
            <Form.Item wrapperCol={{ span: 5 }} style={{display: 'flex', justifyContent:'center'}}>
                <Button type="primary" onClick={onFinish} size='large' loading={loading}>
                    Sign up
                </Button>
            </Form.Item>
            <p style={{color:'black', textAlign:'center'}}>Already have an account? <a href="/login">Sign in</a> </p>
        </Form>
    );
};

export default SignupForm;