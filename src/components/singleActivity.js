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
            <div className='ms-5'>
                <section>
                    {isEditMode ? 
                        <EditActivity token={token} activity={activity} userInfo={userInfo} setIsEditMode={setIsEditMode}/> :
                        <>
                        <header className='d-flex'>
                            <h2 className='flex-grow-1'>{activity.name}</h2>
                            {token !== '' && (
                                <button className="btn btn-primary" onClick={() => setIsEditMode(true)}>Edit Activity</button>
                            )}
                        </header>
                        <p className="description">{activity.description}</p>
                        </>
                    }
                </section>
                <section>
                    {!isEditMode && (
                        activityRoutines.map(routine => {
                        return (
                            <div key={routine.id} className='card m-2'>
                                <div className='card-body'>
                                    <header className='d-flex'>
                                        <h3 className='flex-grow-1'><Link to={`/routines/${routine.id}`}>{routine.name}</Link></h3>
                                        <span><Link to={`/users/${routine.creatorId}`}>{routine.creatorName}</Link></span>
                                    </header>
                                    <p className="description">{routine.goal}</p>
                                </div>
                            </div>
                        )
                }))}
                </section>
            </div>
        )
    }
}

export default SingleActivity;