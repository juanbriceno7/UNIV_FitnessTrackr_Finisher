import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllRoutines, fetchUserRoutines } from '../api';
import { RoutineSearch } from './index'

const Routines = ({routines, setRoutines, userInfo, token}) => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredRoutines, setFilteredRoutines] = useState([]);
    
    useEffect(() => {
        async function fetchRoutines() {
            try {
                if (token !== '') {
                    const publicRoutines = await fetchAllRoutines();
                    const userRoutines = await fetchUserRoutines(userInfo.username);
                    const privateRoutines = userRoutines.filter(routine => routine.isPublic === false);
                    setRoutines(publicRoutines.concat(privateRoutines));

                }
                else {
                    const routines = await fetchAllRoutines();
                    setRoutines(routines);
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchRoutines();
    }, [setRoutines, token])

    return (
        <div>
            <header>
                <h1>Routines</h1>
            </header>
            <section>
                <RoutineSearch routines={routines} searchValue={searchValue} setSearchValue={setSearchValue} setFilteredRoutines={setFilteredRoutines}/>
            </section>
            {searchValue === '' ? 
            <section>
            {routines.map(routine => {
                return (
                    <div key={routine.id}>
                        <h3><Link to={`/routines/${routine.id}`}>{routine.name}</Link></h3>
                        <span>{routine.creatorName}</span>
                        <p>{routine.goal}</p>
                        <h4>Activities</h4>
                        {routine.activities.map(activity => {
                            return(
                                <div key={activity.id}>
                                    <p>{activity.name}</p>
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
            })}
            </section> :
            <section>
            {filteredRoutines.map(routine => {
                return (
                    <div key={routine.id}>
                        <h3><Link to={`/routines/${routine.id}`}>{routine.name}</Link></h3>
                        <p>{routine.creatorName}</p>
                        <p>{routine.goal}</p>
                        <h4>Activities</h4>
                        {routine.activities.map(activity => {
                            return(
                                <div key={activity.id}>
                                    <p>{activity.name}</p>
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
            })}
            </section>}
        </div>
    )
}

export default Routines;