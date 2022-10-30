import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api";

const Register = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const setToken = props.setToken;
    let navigate = useNavigate();

    async function submitHandler(event) {
        event.preventDefault();
            try {
                const response = await register(username, password);
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
                <h2>Register</h2>
            </header>
            <div>
                <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="username">Username</label>
                    <div>
                        <input type="text" id="username" onChange={event => setUsername(event.target.value)} required></input>
                    </div>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <div className="col-sm-5">
                        <input type="password" id="password" onChange={event => setPassword(event.target.value)} required></input>
                    </div>
                </div>
                <button type="submit">Sign Up</button>
                </form>
            </div>
        </>
        
    )
}

export default Register;