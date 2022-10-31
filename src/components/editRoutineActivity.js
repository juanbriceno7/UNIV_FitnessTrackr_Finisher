import { useState } from "react"
import { editRoutineActivity } from "../api";

const EditRoutineActivity = ({token, routineActivity, setIsRAEditMode}) => {
    const [newCount, setNewCount] = useState(routineActivity.count)
    const [newDuration, setNewDuration] = useState(routineActivity.duration)

    async function submitHandler(event) {
        event.preventDefault();
        try {
            const response = await editRoutineActivity(token, routineActivity.id, newCount, newDuration)
            if (response) {
                setIsRAEditMode(false);
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="ms-5 mb-2">
            <header>
                <h3>Edit Routine Activity</h3>
            </header>
            <form onSubmit={submitHandler}>
                <div className="row mb-2">
                    <label htmlFor="duration" className="col-form-label">Duration:</label>
                    <div className="col-sm-5">
                        <input id="duration" className="form-control" value={newDuration} onChange={event => setNewDuration(event.target.value)} required></input>
                    </div>
                </div>
                <div className="row mb-2">
                    <label htmlFor="count" className="col-form-label">Count:</label>
                    <div className="col-sm-5">
                        <input type="text" id="count" className="form-control" value={newCount} onChange={event => setNewCount(event.target.value)} required></input>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary me-2">Submit</button>
                <button className="btn btn-danger" onClick={() => setIsRAEditMode(false)}>Cancel</button>
            </form>
        </div>
    )
}

export default EditRoutineActivity;