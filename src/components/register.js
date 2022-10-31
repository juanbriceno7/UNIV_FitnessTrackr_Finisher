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
            <header className="ms-5 mb-3">
                <h2>Register</h2>
            </header>
            <div className="ms-5">
                <form onSubmit={submitHandler}>
                <div className="row mb-2">
                    <label htmlFor="username" className="col-form-label">Username</label>
                    <div className="col-sm-5">
                        <input type="text" id="username" className="form-control" onChange={event => setUsername(event.target.value)} required></input>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="password" className="col-form-label">Password</label>
                    <div className="col-sm-5">
                        <input type="password" id="password" className="form-control" onChange={event => setPassword(event.target.value)} required></input>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        </>
        
    )
}

export default Register;