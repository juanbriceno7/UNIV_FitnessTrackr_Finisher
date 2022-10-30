import { useState } from "react"
import { editActivity } from "../api";

const EditActivity = ({token, activity, setIsEditMode}) => {
    const [newName, setNewName] = useState(activity.name)
    const [newDescription, setNewDescription] = useState(activity.description)
    const oldName = activity.name;

    async function submitHandler(event) {
        event.preventDefault();
        try {
            const response = await editActivity(token, activity.id, oldName, newName, newDescription);
            if (response) {
                setIsEditMode(false);
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <div>
            <header>
                <h3>Edit Activity</h3>
            </header>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <div>
                        <input type="text" id="name" value={newName} onChange={event => setNewName(event.target.value)} required></input>
                    </div>
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <div>
                        <textarea id="description" value={newDescription} onChange={event => setNewDescription(event.target.value)} required></textarea>
                    </div>
                </div>
                <button type="submit">Submit</button>
                <button onClick={() => setIsEditMode(false)}>Cancel</button>
            </form>
        </div>
    )
}

export default EditActivity;