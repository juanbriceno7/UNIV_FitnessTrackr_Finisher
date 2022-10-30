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
        <div>
            <header>
                <h3>Edit Routine Activity</h3>
            </header>
            <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="count">Count:</label>
                    <div>
                        <input type="text" id="count" value={newCount} onChange={event => setNewCount(event.target.value)} required></input>
                    </div>
                </div>
                <div>
                    <label htmlFor="duration">Duration:</label>
                    <div>
                        <input id="duration" value={newDuration} onChange={event => setNewDuration(event.target.value)} required></input>
                    </div>
                </div>
                <button type="submit">Submit</button>
                <button onClick={() => setIsRAEditMode(false)}>Cancel</button>
            </form>
        </div>
    )
}

export default EditRoutineActivity;