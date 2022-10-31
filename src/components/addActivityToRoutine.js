import { useState, useEffect } from "react";
import { addActivityToRoutine, fetchAllActivities } from "../api";

const AddActivityToRoutine = ({token, routine, setIsAddMode}) => {
    const [activityList, setActivityList] = useState([]);
    const [activityId, setActivityId] = useState('');
    const [count, setCount] = useState('');
    const [duration, setDuration] = useState('');

    useEffect(() => {
        async function fetchActivities() {
            try {
                const results = await fetchAllActivities();
                const exclusions = routine.activities;
                if (exclusions.length === 0) {
                    setActivityList(results);
                }
                else {
                    const filteredResults = []
                    for (let i = 0; i < results.length; i++) {
                        for (let j = 0; j < exclusions.length; j++) {
                            if (results[i].id !== exclusions[j].id) {
                                filteredResults.push(results[i]);
                            }
                        }
                    }
                    setActivityList(filteredResults);
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchActivities();
    }, [setActivityList, token])

    async function submitHandler(event) {
        event.preventDefault();
        try {
            if (activityId) {
                const response = await addActivityToRoutine(token, routine.id, activityId, count, duration)
                if (response) {
                    setIsAddMode(false);
                }
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
                    <h3>Add Activity to Routine</h3>
                </header>
                <form onSubmit={submitHandler}>
                <div className="row mb-2">
                    <label htmlFor="activity-list" className="col-form-label">Activity Name</label>
                    <select 
                        name="activityList"
                        id="activity-list"
                        className="form-select w-auto ms-2"
                        value={activityId} 
                        onChange={event => setActivityId(event.target.value)}>
                        {activityList.map(activity => <option key = {activity.id} value={activity.id}>{activity.name}</option>)}
                    </select>
                </div>
                    <div className="row mb-2">
                        <label htmlFor="duration" className="col-form-label">Duration:</label>
                        <div className="col-sm-5">
                            <input id="duration" className="form-control" onChange={event => setDuration(event.target.value)} required></input>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <label htmlFor="count" className="col-form-label">Count:</label>
                        <div className="col-sm-5">
                            <input type="text" id="count" className="form-control" onChange={event => setCount(event.target.value)} required></input>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary me-2">Add Activity to Routine</button>
                    <button className="btn btn-danger" onClick={() => setIsAddMode(false)}>Cancel</button>
                </form>
            </div>
        )
    }
}

export default AddActivityToRoutine;