import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAllActivities, fetchRoutinesByActivity } from '../api';
import { EditActivity } from './index'

const SingleActivity = ({activities, setActivities, userInfo, token}) => {
    const { activityId } = useParams();
    const [activity, setActivity] = useState(
        activities.find(correctActivity => correctActivity.id === parseInt(activityId))
        ) 
    const [activityRoutines, setActivityRoutines] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        async function fetchActivityRoutines() {
            try {
                    const results = await fetchRoutinesByActivity(activityId);
                    setActivityRoutines(results);

            } catch (err) {
                console.error(err);
            }
        }
        fetchActivityRoutines();
    }, [isEditMode, setActivityRoutines, token])

    useEffect(() => {
        async function refetch() {
            const refetchActivities = await fetchAllActivities();
            setActivities(refetchActivities);

            const refetchActivity = refetchActivities.find(correctActivity => correctActivity.id === parseInt(activityId));
            setActivity(refetchActivity)
        }
        refetch();
    }, [isEditMode, setActivity, setActivities, token])

    if (!activity) {
        return <h1>No Activities Found</h1>;
    }
    else {
        return (
            <div>
                <section>
                    {isEditMode ? 
                        <EditActivity token={token} activity={activity} userInfo={userInfo} setIsEditMode={setIsEditMode}/> :
                        <>
                        <h2>{activity.name}</h2>
                        <p>{activity.description}</p>
                        <button onClick={() => setIsEditMode(true)}>Edit Activity</button>
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