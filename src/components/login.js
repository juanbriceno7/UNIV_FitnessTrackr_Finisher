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
            <header className="ms-5 mb-3">
                <h3>Log In</h3>
            </header>
            <div className="ms-5">
                <form onSubmit={submitHandler}>
                    <div className="mb-3 col-sm-5">
                        <input type="text" className="form-control" placeholder='Username' onChange={event => setUsername(event.target.value)} required></input>
                    </div>
                    <div className="mb-3 col-sm-5">
                        <input type="password" className="form-control" placeholder='Password' onChange={event => setPassword(event.target.value)} required></input>
                    </div>
                    <button type="submit" className="btn btn-primary mb-3">Log In</button>
                </form>
                <Link to='/register'>Sign Up</Link>
            </div>
        </>
        
    )
}

export default Login;