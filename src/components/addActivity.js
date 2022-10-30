import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { addActivity } from "../api";

const AddActivity = ({token, setUserInfo}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    let navigate = useNavigate();

    async function submitHandler(event) {
        event.preventDefault();
        try {
            const response = await addActivity(token, name, description);
            if (response) {
                navigate('/activities');
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    if (token !== '') {
        return (
            <div>
                <header>
                    <h3>Add Activity</h3>
                </header>
                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <div>
                            <input type="text" id="name" onChange={event => setName(event.target.value)} required></input>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <div>
                            <textarea id="description" onChange={event => setDescription(event.target.value)} required></textarea>
                        </div>
                    </div>
                    <button type="submit">Add Activity</button>
                    <button onClick={() => navigate('/activities')}>Cancel</button>
                </form>
            </div>
        )
    }
    else {
        return <h1>Unauthorized</h1>
    }
}

export default AddActivity;