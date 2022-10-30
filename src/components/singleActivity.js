import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRoutinesByActivity } from '../api';
import { EditActivity } from './index'

const SingleActivity = ({activities, userInfo, token}) => {
    const { activityId } = useParams();
    const activity = activities.find(correctActivity => correctActivity.id === parseInt(activityId));
    const [activityRoutines, setActivityRoutines] = useState([]);
    const [isEditmode, setIsEditMode] = useState(false);

    useEffect(() => {
        async function fetchRoutines() {
            try {
                    const results = await fetchRoutinesByActivity(activityId);
                    setActivityRoutines(results);

            } catch (err) {
                console.error(err);
            }
        }
        fetchRoutines();
    }, [isEditmode, setActivityRoutines, token])

    if (!activity) {
        return <h1>No Activities Found</h1>;
    }
    else {
        return (
            <div>
                <section>
                    {isEditmode ? 
                        <EditActivity token={token} activity={activity} userInfo={userInfo} setIsEditMode={setIsEditMode}/> :
                        <>
                        <h2>{activity.name}</h2>
                        <p>{activity.description}</p>
                        <button onClick={() => setIsEditMode(true)}>Edit</button>
                        </>
                    }
                </section>
                <section>
                    {activityRoutines.map(routine => {
                    return (
                        <div key={routine.id}>
                            <h3><Link to={`/routines/${routine.id}`}>{routine.name}</Link></h3>
                            <span>{routine.creatorName}</span>
                            <p>{routine.goal}</p>
                        </div>
                    )
                })}
                </section>
            </div>
        )
    }
}

export default SingleActivity;