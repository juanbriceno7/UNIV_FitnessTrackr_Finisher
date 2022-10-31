import { useState } from "react"
import { editRoutine } from "../api";

const EditRoutine = ({token, routine, userInfo, setIsEditMode}) => {
    const [newName, setNewName] = useState(routine.name)
    const [newGoal, setNewGoal] = useState(routine.goal)
    const [newIsPublic, setNewIsPublic] = useState(routine.isPublic)

    async function submitHandler(event) {
        event.preventDefault();
        try {
            const response = await editRoutine(token, routine.id, newName, newGoal, newIsPublic);
            if (response) {
                setIsEditMode(false);
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    if (routine.creatorId === userInfo.id) {
        return (
            <div className="ms-5 mb-2">
                <header>
                    <h3>Edit Routine</h3>
                </header>
                <form onSubmit={submitHandler}>
                    <div className="row mb-2">
                        <label htmlFor="name" className="col-form-label">Name:</label>
                        <div className="col-sm-5">
                            <input type="text" id="name" className="form-control" value={newName} onChange={event => setNewName(event.target.value)} required></input>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <label htmlFor="goal" className="col-form-label">Goal:</label>
                        <div className="col-sm-5">
                            <textarea id="goal" className="form-control" value={newGoal} onChange={event => setNewGoal(event.target.value)} required></textarea>
                        </div>
                    </div>
                    <div className="form-check mb-3">
                        {newIsPublic ? 
                        <input type="checkbox" id="isPublic" className="form-check-input" value={newIsPublic} checked={true}
                        onChange={event => event.target.value === 'false' ? 
                        setNewIsPublic(true) :
                        setNewIsPublic(false)}></input>
                        :
                        <input type="checkbox" id="isPublic" className="form-check-input" value={newIsPublic}
                        onChange={event => event.target.value === 'false' ? 
                        setNewIsPublic(true) :
                        setNewIsPublic(false)}></input>
                        }
                        <label htmlFor="isPublic" className="form-check-label">Make Routine Public?</label>
                    </div>
                    <button type="submit" className="btn btn-primary me-2">Submit</button>
                    <button className="btn btn-danger" onClick={() => setIsEditMode(false)}>Cancel</button>
                </form>
            </div>
        )
    }
}

export default EditRoutine;