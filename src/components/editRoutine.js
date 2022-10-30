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
            <div>
                <header>
                    <h3>Edit Routine</h3>
                </header>
                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <div>
                            <input type="text" id="name" value={newName} onChange={event => setNewName(event.target.value)} required></input>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="goal">Goal:</label>
                        <div>
                            <textarea id="goal" value={newGoal} onChange={event => setNewGoal(event.target.value)} required></textarea>
                        </div>
                    </div>
                    <div>
                        {newIsPublic ? 
                        <input type="checkbox" id="isPublic" value={newIsPublic} checked={true}
                        onChange={event => event.target.value === 'false' ? 
                        setNewIsPublic(true) :
                        setNewIsPublic(false)}></input>
                        :
                        <input type="checkbox" id="isPublic" value={newIsPublic}
                        onChange={event => event.target.value === 'false' ? 
                        setNewIsPublic(true) :
                        setNewIsPublic(false)}></input>
                        }
                        <label htmlFor="isPublic">Make Routine Public?</label>
                    </div>
                    <button type="submit">Submit</button>
                    <button onClick={() => setIsEditMode(false)}>Cancel</button>
                </form>
            </div>
        )
    }
}

export default EditRoutine;