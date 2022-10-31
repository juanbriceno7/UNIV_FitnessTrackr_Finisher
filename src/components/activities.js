import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAllActivities } from '../api';
import { ActivitySearch } from './index'

const Activities = ({activities, setActivities, token}) => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredActivites, setFilteredActivities] = useState([]);
    let navigate = useNavigate();
    
    useEffect(() => {
        async function fetchActivities() {
            try {
                const results = await fetchAllActivities();
                setActivities(results);
            } catch (err) {
                console.error(err);
            }
        }
        fetchActivities();
    }, [setActivities, token])

    return (
        <div>
            <header className='m-3 d-flex'>
                <h1 className='flex-grow-1'>Activities</h1>
                {token !== '' && (
                    <button type="button" className="btn btn-primary" onClick={() => navigate('/addactivity')}>Add Activity</button>
                )}
            </header>
            <section>
                <ActivitySearch activities={activities} searchValue={searchValue} setSearchValue={setSearchValue} setFilteredActivities={setFilteredActivities}/>
            </section>
            {searchValue === '' ? 
            <section>
            {activities.map(activity => {
                return (
                    <div key={activity.id} className='card m-2'>
                        <div className='card-body'>
                            <h3><Link to={`/activities/${activity.id}`}>{activity.name}</Link></h3>
                            <p className='description'>{activity.description}</p>
                        </div>
                    </div>
                )
            })}
            </section> :
            <section>
            {filteredActivites.map(activity => {
                return (
                    <div key={activity.id} className='card m-2'>
                        <div className='card-body'>
                            <h3><Link to={`/activities/${activity.id}`}>{activity.name}</Link></h3>
                            <p className='description'>{activity.description}</p>
                        </div>
                    </div>
                )
            })}
            </section>}
        </div>
    )
}

export default Activities;