import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    },[navigate])

    const LoginHandle = async () => {
        console.log(name);
        console.log(password);        

        let result = await fetch('http://localhost:5000/login',{
            method:"POST",
            body: JSON.stringify({ name, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.log(result);
        if(result.auth){
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate('/')
        }else{
            alert("Please Enter Valid Details");
        }
    }
    return (
        <div className="login">
            <h1>Login Page</h1>
            <div className="login_form">
                <input type="text" placeholder="User Name" onChange={(e) => setName(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button className="signupBtn" type="button" onClick={LoginHandle}>Login</button>
                <div className='loginLink'> If you are not Register user Please <Link to="/signup">Signup</Link></div>
            </div>
        </div>
    )
}

export default Login;