const BASE_URL = 'https://safe-spire-41463.herokuapp.com/api/'

export async function login(username, password) {
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        const result = await response.json();
        if (result.token) {
            return result;
        }
        else {
            alert(result.message);
            return false;
        }
    } catch (err) {
        throw err;
    }
}

export async function register(username, password) {
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        const result = await response.json();
        if (result.token) {
            return result;
        }
        else {
            alert(result.message);
            return false;
        }
    } catch (err) {
        throw err;
    }
}

export async function fetchUserInfo(token) {
    try {
        const response = await fetch(`${BASE_URL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await response.json();
        if (result.id) {
            return result;
        }
        else {
            alert(result.message);
            return false;
        }
    } catch (err) {
        throw err;
    }
}

export async function fetchUserRoutines(username) {
    try {
        const response = await fetch(`${BASE_URL}/users/${username}/routines`);
        const result = await response.json();
        if (result.error) {
            alert(result.message);
            return false;
        }
        else {
            return result;
        }
    } catch (err) {
        throw err;
    }
}

export async function fetchUserById(userId) {
    try {
        const response = await fetch(`${BASE_URL}/users/${userId}`);
        const result = await response.json();
        if (result.error) {
            alert(result.message);
            return false;
        }
        else {
            return result;
        }
    } catch (err) {
        throw err;
    }
}

export async function fetchAllRoutines() {
    try {
        const response = await fetch(`${BASE_URL}/routines`);
        const result = await response.json();
        if (result.error) {
            alert(result.message);
            return false;
        }
        else {
            return result;
        }
    } catch (err) {
        throw err;
    }
}

export async function addRoutine(token, name, goal, isPublic) {
    try {
        const response = await fetch(`${BASE_URL}/routines`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                goal,
                isPublic
            })
        });
        const result = await response.json();
        if (result.error) {
            alert(result.message);
            return false;
        }
        else {
            return true;
        }
    } catch (err) {
        throw err;
    }
}

export async function editRoutine(token, routineId, name, goal, isPublic) {
    try {
        const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                goal,
                isPublic
            })
        });
        const result = await response.json();
        if (result.error) {
            alert(result.message);
            return false;
        }
        else {
            return true;
        }
    } 
    catch (err) {
        console.error(err)
    }
}

export async function deleteRoutine(routineId, token) {
    try {
        const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await response.json();
        if (result.error) {
            alert(result.message);
            return false;
        }
        else {
            return true;
        }
    } 
    catch (err) {
        console.error(err)
    }
}

export async function addActivityToRoutine(token, routineId, activityId, count, duration) {
    try {
        const response = await fetch(`${BASE_URL}/routines/${routineId}/activities`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                activityId,
                count,
                duration
            })
        });
        const result = await response.json();
        if (result.error) {
            alert(result.message);
            return false;
        }
        else {
            return true;
        }
    } catch (err) {
        throw err;
    }
}

export async function fetchRoutinesByActivity(activityId) {
    try {
        const response = await fetch(`${BASE_URL}/activities/${activityId}/routines`);
        const result = await response.json();
        if (result.error) {
            alert(result.message);
            return false;
        }
        else {
            return result;
        }
    } catch (err) {
        throw err;
    }
}

export async function fetchAllActivities() {
    try {
        const response = await fetch(`${BASE_URL}/activities`);
        const result = await response.json();
        if (result.error) {
            alert(result.message);
            return false;
        }
        else {
            return result;
        }
    } catch (err) {
        throw err;
    }
}

export async function addActivity(token, name, description) {
    try {
        const response = await fetch(`${BASE_URL}/activities`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                description
            })
        });
        const result = await response.json();
        if (result.error) {
            alert(result.message);
            return false;
        }
        else {
            return true;
        }
    } catch (err) {
        throw err;
    }
}

export async function editActivity(token, activityId, oldName, name, description) {
    try {
        const response = await fetch(`${BASE_URL}/activities/${activityId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                oldName,
                name,
                description
            })
        });
        const result = await response.json();
        if (result.error) {
            alert(result.message);
            return false;
        }
        else {
            return true;
        }
    } 
    catch (err) {
        console.error(err)
    }
}

export async function fetchRoutineActivitiesByRoutine(routineId) {
    try {
        const response = await fetch(`${BASE_URL}/routine_activities/${routineId}`);
        const result = await response.json();
        if (result.error) {
            alert(result.message);
            return false;
        }
        else {
            return result;
        }
    } catch (err) {
        throw err;
    }
}


export async function editRoutineActivity(token, routineActivityId, count, duration) {
    //might not need token
    try {
        const response = await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                duration,
                count
            })
        });
        const result = await response.json();
        if (result.error) {
            alert(result.message);
            return false;
        }
        else {
            return true;
        }
    } 
    catch (err) {
        console.error(err)
    }
}

export async function deleteRoutineActivity(routineActivityId, token) {
    //might not need token
    try {
        const response = await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await response.json();
        if (result.error) {
            alert(result.message);
            return false;
        }
        else {
            return true;
        }
    } 
    catch (err) {
        console.error(err)
    }
}