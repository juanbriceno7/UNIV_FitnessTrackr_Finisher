import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { addActivity } from "../api";

const AddActivity = ({token}) => {
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
            <div className="ms-5 mb-2">
                <header>
                    <h3>Add Activity</h3>
                </header>
                <form onSubmit={submitHandler}>
                    <div className="row mb-2">
                        <label htmlFor="name" className="col-form-label">Name:</label>
                        <div className="col-sm-5">
                            <input type="text" id="name" className="form-control" onChange={event => setName(event.target.value)} required></input>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <label htmlFor="description" className="col-form-label">Description:</label>
                        <div className="col-sm-5">
                            <textarea id="description" className="form-control" onChange={event => setDescription(event.target.value)} required></textarea>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary me-2">Add Activity</button>
                    <button className="btn btn-danger" onClick={() => navigate('/activities')}>Cancel</button>
                </form>
            </div>
        )
    }
    else {
        return <h1>Unauthorized</h1>
    }
}

export default AddActivity;