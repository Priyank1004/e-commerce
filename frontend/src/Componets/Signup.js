import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [name, setuseName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/");
        }
    })

    const handelSignup = async () => {
        console.log(name, email, password);
        let result = await fetch('http://localhost:5000/register', {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        // window.location.reload();
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate('/');
    }

    return (
        <div className='signup_container'>
            <h2>Register</h2>
            <input className='inputbox' type='text' value={name} onChange={(e) => setuseName(e.target.value)} placeholder='Enter User Name' />
            <input className='inputbox' type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
            <input className='inputbox' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
            <button type='button' className='signupBtn' onClick={handelSignup}>Sign Up</button>

            <div className='loginLink'> If you are alreay use then <Link to="/login">Login</Link></div>
        </div>
    )
}

export default Signup
