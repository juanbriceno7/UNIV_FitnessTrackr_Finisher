import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams} from 'react-router-dom';
import { deleteRoutine, deleteRoutineActivity, fetchAllRoutines, fetchRoutineActivitiesByRoutine, fetchUserRoutines } from '../api';
import { EditRoutine, AddActivityToRoutine, EditRoutineActivity } from './index'

const SingleRoutine = ({routines, setRoutines, userInfo, token}) => {
    const { routineId } = useParams();
    const [routine, setRoutine] = useState(routines.find(correctRoutine => correctRoutine.id === parseInt(routineId)));
    const [routineActivities, setRoutineActivities] = useState([]);
    const [routineActivity, setRoutineActivity] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [isAddMode, setIsAddMode] = useState(false);
    const [isRAEditMode, setIsRAEditMode] = useState(false);
    let navigate = useNavigate();
    
    useEffect(() => {
        async function fetchRoutineActivities() {
            try {
                const getRoutineActivities = await fetchRoutineActivitiesByRoutine(routine.id);
                setRoutineActivities(getRoutineActivities);

            } catch (err) {
                console.error(err);
            }
        }
        fetchRoutineActivities();
    }, [isEditMode, isAddMode, setRoutineActivities, token])

    useEffect(() => {
        async function refetch() {
            if (token !== '') {
                const publicRoutines = await fetchAllRoutines();
                const userRoutines = await fetchUserRoutines(userInfo.username);
                const privateRoutines = userRoutines.filter(routine => routine.isPublic === false);
                setRoutines(publicRoutines.concat(privateRoutines));

                const refetchRoutine = publicRoutines.concat(privateRoutines).find(correctRoutine => correctRoutine.id === parseInt(routineId));
                setRoutine(refetchRoutine);
            }
            else {
                const refetchRoutines = await fetchAllRoutines();
                setRoutines(refetchRoutines);

                const refetchRoutine = refetchRoutines.find(correctRoutine => correctRoutine.id === parseInt(routineId));
                setRoutine(refetchRoutine);
            }

        }
        refetch();
    }, [isEditMode, isAddMode, isRAEditMode, setRoutine, setRoutines, token])

    async function editHelper(activityId) {
        const getroutineActivity = routineActivities.find(routineActivity => routineActivity.activityId = activityId);
        setRoutineActivity(getroutineActivity);
        setIsRAEditMode(true);
    }

    async function deleteHelper(activityId) {
        const routineActivity = routineActivities.find(routineActivity => routineActivity.activityId = activityId);
        const deleteSuccess = await deleteRoutineActivity(routineActivity.id, token);
        if (deleteSuccess) {
            navigate(`/myroutines`);
        }
    }

    if (!routine) {
        return <h1>No Routines Found</h1>;
    }
    else {
        return (
            <div className='ms-5'>
                {isEditMode ? 
                    <EditRoutine token={token} routine={routine} userInfo={userInfo} setIsEditMode={setIsEditMode}/> :
                isAddMode ? 
                    <AddActivityToRoutine token={token} routine={routine} setIsAddMode={setIsAddMode}/> :
                isRAEditMode ?
                    <EditRoutineActivity token={token} routineActivity={routineActivity} setIsRAEditMode={setIsRAEditMode}/> :

                    <>
                    <h2>{routine.name}</h2>
                    <p className="description">{routine.goal}</p>
                    {routine.activities.length > 0 && (<h4>Activities</h4>)}
                    {routine.activities.map(activity => {
                                return(
                                    <div key={activity.id} className='card m-2'>
                                        <div className='card-body'>
                                            <p><Link to={`/activities/${activity.id}`}>{activity.name}</Link></p>
                                            <p className="description">{activity.description}</p>
                                            {activity.duration && (
                                                <p>Duration: {activity.duration}</p>
                                            )}
                                            {activity.count && (
                                                <p>Count: {activity.count}</p>
                                            )}
                                            {token !== '' && (
                                                <>
                                                <button className="btn btn-primary me-2" onClick={() => {editHelper(activity.id)}}>Edit Activity</button>
                                                <button className="btn btn-danger" onClick={() => {deleteHelper(activity.id)}}>Remove Activity</button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                    {routine.creatorId === userInfo.id && (
                        <>
                        <button className="btn btn-primary me-2" onClick={() => setIsAddMode(true)}>Add Activity</button>
                        <button className="btn btn-primary me-2" onClick={() => setIsEditMode(true)}>Edit Routine</button>
                        <button className="btn btn-danger" onClick={async () => {
                            const success = await deleteRoutine(routine.id, token);
                            if (success) {
                                navigate('/myroutines');
                            }
                            }}>Delete Routine</button>
                        </> 
                    )}
                    </>
                }
            </div>
        )
    }
}

export default SingleRoutine;