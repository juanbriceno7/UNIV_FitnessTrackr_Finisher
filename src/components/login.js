import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api";

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const setToken = props.setToken;
    let navigate = useNavigate();

    async function submitHandler(event) {
        event.preventDefault();
        try {
            const response = await login(username, password);
            if (response.token) {
                setToken(response.token);
                navigate('/routines');
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <>
            <header>
                <h3>Log In</h3>
            </header>
            <div>
                <form onSubmit={submitHandler}>
                    <div>
                        <input type="text" placeholder='Username' onChange={event => setUsername(event.target.value)} required></input>
                    </div>
                    <div>
                        <input type="password" placeholder='Password' onChange={event => setPassword(event.target.value)} required></input>
                    </div>
                    <button type="submit">Log In</button>
                </form>
                <Link to='/register'>Sign Up</Link>
            </div>
        </>
        
    )
}

export default Login;