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
            <header>
                <h1>Activities</h1>
                {token !== '' && (
                    <button type="button" onClick={() => navigate('/addactivity')}>Add Activity</button>
                )}
            </header>
            <section>
                <ActivitySearch activities={activities} searchValue={searchValue} setSearchValue={setSearchValue} setFilteredActivities={setFilteredActivities}/>
            </section>
            {searchValue === '' ? 
            <section>
            {activities.map(activity => {
                return (
                    <div key={activity.id}>
                        <h3><Link to={`/activities/${activity.id}`}>{activity.name}</Link></h3>
                        <p>{activity.description}</p>
                    </div>
                )
            })}
            </section> :
            <section>
            {filteredActivites.map(activity => {
                return (
                    <div key={activity.id}>
                        <h3><Link to={`/activities/${activity.id}`}>{activity.name}</Link></h3>
                        <p>{activity.description}</p>
                    </div>
                )
            })}
            </section>}
        </div>
    )
}

export default Activities;