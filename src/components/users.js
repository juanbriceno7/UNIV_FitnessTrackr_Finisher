import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchUserById, fetchUserRoutines } from '../api';

const Users = ({routines, setRoutines}) => {
    const { userId } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        async function getUser() {
            const fetchUser = await fetchUserById(userId);
            setUser(fetchUser);
            console.log(fetchUser);

            const userRoutines = await fetchUserRoutines(fetchUser.username);
            const publicRoutines = userRoutines.filter(routine => routine.isPublic === true);
            setRoutines(publicRoutines)
        }
        getUser();
    }, [setUser, setRoutines])

    if (!user) {
        return <h1>No User Found</h1>;
    }
    else {
        return (
            <div className='ms-5'>
                <header>
                    <h1>{user.username}</h1>
                </header>
                <section>
                    {routines.length > 0 && (<h3>Routines</h3>)}
                    {routines.map(routine => {
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
                })}
                </section>
            </div>
        )
    }
}

export default Users;