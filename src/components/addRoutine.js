import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { addRoutine } from "../api";

const AddRoutine = ({token, setUserInfo}) => {
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
            <div>
                <header>
                    <h3>Add Routine</h3>
                </header>
                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <div>
                            <input type="text" id="name" onChange={event => setName(event.target.value)} required></input>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="goal">Goal:</label>
                        <div>
                            <textarea id="goal" onChange={event => setGoal(event.target.value)} required></textarea>
                        </div>
                    </div>
                    <div>
                        <input type="checkbox" id="isPublic" 
                        onChange={event => event.target.value === 'on' ? 
                        setIsPublic(true) :
                        setIsPublic(false)}></input>
                        <label htmlFor="isPublic">Make Routine Public?</label>
                    </div>
                    <button type="submit">Add Routine</button>
                    <button onClick={() => navigate('/myroutines')}>Cancel</button>
                </form>
            </div>
        )
    }
    else {
        return <h1>Unauthorized</h1>
    }
}

export default AddRoutine;