import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setStorage, useAuth } from '../AuthContext';
import './Login.css'


const Login = () => {
    const {login} = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/v1/login`, { username, password });
            
            // localStorage.setItem('token', response.data.token);
            // localStorage.setItem('name', response.data.name)
            console.log(response);
            if(response?.status === 200){
               ;
                console.log("Login token:", localStorage.getItem('token'));
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.setItem('token', response?.data.token)}`;
                
            }

            // setStorage(response.data.token)
            // 
            navigate('/admin/home');
        } catch (error) {
            console.error('Login failed', error);
            
            
        }
    };

    return (
        <div className='login-wrapper'>
            
            <form onSubmit={handleSubmit} className='login-form'>
                <h1>Login</h1>
                <p>Please enter your username and password</p>
                    <input
                        className='login-input'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='username'
                    />
                
                
                    
                    <input
                        className='login-input'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='password'
                    />
                
                
                <button type="submit" className='login-button'>Login</button>
            </form>
        </div>
    );
};

export default Login;