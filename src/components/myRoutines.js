import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { fetchUserRoutines } from "../api"

const MyRoutines = ({userInfo, routines, setRoutines}) => {
    if (Object.keys(userInfo).length !== 0) {
        let navigate = useNavigate();

        useEffect(() => {
            async function getUserRoutines(username) {
                const result = await fetchUserRoutines(username);
                setRoutines(result);
            }
            getUserRoutines(userInfo.username)
        }, [setRoutines, userInfo])
        
        return (
            <>
        <div>
            <header className='m-3 d-flex'>
                <h2 className='flex-grow-1'>My Routines: </h2>
                <button type="button" className="btn btn-primary" onClick={() => navigate('/addroutine')}>Add Routine</button>
            </header>
            <div>
                {routines.length !== 0 ? 
                routines.map(routine => {
                    return (
                        <div key={routine.id} className='card m-2'>
                            <div className='card-body'>
                                <h3><Link to={`/routines/${routine.id}`}>{routine.name}</Link></h3>
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
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                }) : 
                <span>No Routines Found</span>
            }     
            </div>
        </div>
        </>
        )
    }
    else {
        return <h1>Unauthorized</h1>
    }
}

export default MyRoutines;