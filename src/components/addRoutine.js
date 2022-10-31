import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { addRoutine } from "../api";

const AddRoutine = ({token}) => {
    const [name, setName] = useState('')
    const [goal, setGoal] = useState('')
    const [isPublic, setIsPublic] = useState(false)
    let navigate = useNavigate();

    async function submitHandler(event) {
        event.preventDefault();
        try {
            const response = await addRoutine(token, name, goal, isPublic);
            if (response) {
                navigate('/myroutines');
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    if (token !== '') {
        return (
            <div className="ms-5 mb-2" >
                <header>
                    <h3>Add Routine</h3>
                </header>
                <form onSubmit={submitHandler}>
                    <div className="row mb-2">
                        <label htmlFor="name" className="col-form-label">Name:</label>
                        <div className="col-sm-5">
                            <input type="text" id="name" className="form-control" onChange={event => setName(event.target.value)} required></input>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <label htmlFor="goal" className="col-form-label">Goal:</label>
                        <div className="col-sm-5">
                            <textarea id="goal"  className="form-control" onChange={event => setGoal(event.target.value)} required></textarea>
                        </div>
                    </div>
                    <div className="form-check mb-3">
                        <input  className="form-check-input" type="checkbox" id="isPublic" 
                        onChange={event => event.target.value === 'on' ? 
                        setIsPublic(true) :
                        setIsPublic(false)}></input>
                        <label htmlFor="isPublic" className="form-check-label">Make Routine Public?</label>
                    </div>
                    <button type="submit" className="btn btn-primary me-2">Add Routine</button>
                    <button className="btn btn-danger" onClick={() => navigate('/myroutines')}>Cancel</button>
                </form>
            </div>
        )
    }
    else {
        return <h1>Unauthorized</h1>
    }
}

export default AddRoutine;