import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setStorage, useAuth } from '../AuthContext';
import Cookies from 'js-cookie';
import './Logout.css'


const Logout = () => {
    const { logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            const csrfToken = Cookies.get('XSRF-TOKEN')
            console.log(token);
            
            await axios.post(`${import.meta.env.VITE_APP_URL}/api/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'X-CSRF-TOKEN': csrfToken
                },
                withCredentials: true
            });
            
            localStorage.removeItem('token');
           
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error.response ? error.response.data : error.message);
            
        }
    };

    return (
        <div>
            
            <button onClick={handleLogout} className='logout-button'>Logout</button>
        </div>
    );
};

export default Logout;