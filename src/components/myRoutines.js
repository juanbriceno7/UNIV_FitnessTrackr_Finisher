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
            <header>
                <h2>My Routines: </h2>
            </header>
            <div>
                {routines.length !== 0 ? 
                routines.map(routine => {
                    return (
                        <div key={routine.id}>
                            <h3><Link to={`/routines/${routine.id}`}>{routine.name}</Link></h3>
                            <p>{routine.goal}</p>
                            <h4>Activities</h4>
                            {routine.activities.map(activity => {
                                return(
                                    <div key={activity.id}>
                                        <p><Link to={`/activities/${activity.id}`}>{activity.name}</Link></p>
                                        <p>{activity.description}</p>
                                        {activity.duration && (
                                            <p>Duration: {activity.duration}</p>
                                        )}
                                        {activity.count && (
                                            <p>Count: {activity.count}</p>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    )
                }) : 
                <span>No Routines Found</span>
            }     
            </div>
        <button type="button" onClick={() => navigate('/addroutine')}>Add Routine</button>
        </div>
        </>
        )
    }
    else {
        return <h1>Unauthorized</h1>
    }
}

export default MyRoutines;