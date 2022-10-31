import { useEffect } from "react";

const ActivitySearch = ({activities, searchValue, setSearchValue, setFilteredActivities}) => {
    
    useEffect(() => {
        const activityMatches = (activity) => {
            const text = (activity.name + activity.description).toLowerCase();
            return text.includes(searchValue.toLowerCase());
        }
        setFilteredActivities(activities.filter(activity => activityMatches(activity)))
    }, [searchValue, activities, setFilteredActivities])

    return (
        <div>
            <input
            type="text"
            className="search ms-3"
            placeholder="Search for an activity"
            value={searchValue}
            onChange={event => setSearchValue(event.target.value)}
            ></input>
        </div>
    )
}

export default ActivitySearch;