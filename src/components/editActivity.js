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
        <div className="ms-5 mb-2">
            <header>
                <h3>Edit Activity</h3>
            </header>
            <form onSubmit={submitHandler}>
                <div className="row mb-2">
                    <label htmlFor="name" className="col-form-label">Name:</label>
                    <div className="col-sm-5">
                        <input type="text" id="name" className="form-control" value={newName} onChange={event => setNewName(event.target.value)} required></input>
                    </div>
                </div>
                <div className="row mb-2">
                    <label htmlFor="description" className="col-form-label">Description:</label>
                    <div className="col-sm-5">
                        <textarea id="description" className="form-control" value={newDescription} onChange={event => setNewDescription(event.target.value)} required></textarea>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary me-2">Submit</button>
                <button className="btn btn-danger" onClick={() => setIsEditMode(false)}>Cancel</button>
            </form>
        </div>
    )
}

export default EditActivity;