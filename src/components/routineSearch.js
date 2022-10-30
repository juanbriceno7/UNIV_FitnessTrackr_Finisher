import { useEffect } from "react";

const RoutineSearch = ({routines, searchValue, setSearchValue, setFilteredRoutines}) => {
    
    useEffect(() => {
        const routineMatches = (routine) => {
            const text = (routine.name + routine.goal).toLowerCase();
            return text.includes(searchValue.toLowerCase());
        }
        setFilteredRoutines(routines.filter(routine => routineMatches(routine)))
    }, [searchValue, routines, setFilteredRoutines])

    return (
        <div>
            <input
            type="text"
            placeholder="Search for a routine"
            value={searchValue}
            onChange={event => setSearchValue(event.target.value)}
            ></input>
        </div>
    )
}

export default RoutineSearch;