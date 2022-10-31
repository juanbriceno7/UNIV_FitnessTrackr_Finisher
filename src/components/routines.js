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
            <header className='m-3 d-flex'>
                <h1 className='flex-grow-1'>Routines</h1>
            </header>
            <section>
                <RoutineSearch routines={routines} searchValue={searchValue} setSearchValue={setSearchValue} setFilteredRoutines={setFilteredRoutines}/>
            </section>
            {searchValue === '' ? 
            <section>
            {routines.map(routine => {
                return (
                    <div key={routine.id} className='card m-2'>
                        <div className='card-body'>
                            <header className='d-flex'>
                                <h3 className='flex-grow-1'><Link to={`/routines/${routine.id}`}>{routine.name}</Link></h3>
                                <span><Link to={`/users/${routine.creatorId}`}>{routine.creatorName}</Link></span>
                            </header>
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
            </section> :
            <section>
            {filteredRoutines.map(routine => {
                return (
                    <div key={routine.id} className='card m-2'>
                        <div className='card-body'>
                            <h3><Link to={`/routines/${routine.id}`}>{routine.name}</Link></h3>
                            <span><Link to={`/users/${routine.creatorId}`}>{routine.creatorName}</Link></span>
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
            </section>}
        </div>
    )
}

export default Routines;