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
                const filteredResults = []
                for (let i = 0; i < results.length; i++) {
                    for (let j = 0; j < exclusions.length; j++) {
                        if (results[i].id !== exclusions[j].id) {
                            filteredResults.push(results[i]);
                        }
                    }
                }
                setActivityList(filteredResults);
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
            <div>
                <header>
                    <h3>Add Activity to Routine</h3>
                </header>
                <form onSubmit={submitHandler}>
                <div>
                        <label htmlFor="activity-list">Activity Name</label>
                        <select 
                            name="activityList"
                            id="activity-list"
                            value={activityId} 
                            onChange={event => setActivityId(event.target.value)}>
                            {activityList.map(activity => <option key = {activity.id} value={activity.id}>{activity.name}</option>)}
                        </select>
                </div>
                    <div>
                        <label htmlFor="count">Count:</label>
                        <div>
                            <input type="text" id="count" onChange={event => setCount(event.target.value)} required></input>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="duration">Duration:</label>
                        <div>
                            <input id="duration" onChange={event => setDuration(event.target.value)} required></input>
                        </div>
                    </div>
                    <button type="submit">Add Activity to Routine</button>
                    <button onClick={() => setIsAddMode(false)}>Cancel</button>
                </form>
            </div>
        )
    }
}

export default AddActivityToRoutine;