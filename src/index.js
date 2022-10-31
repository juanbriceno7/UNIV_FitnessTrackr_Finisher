import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Link, Routes, Route} from 'react-router-dom';
import { fetchUserInfo } from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Home,
    Login,
    Register,
    Routines,
    AddRoutine,
    SingleRoutine,
    MyRoutines,
    Activities,
    AddActivity,
    SingleActivity,
    Users
} from './components';

const App = () => {
    const [token, setToken] = useState(
        window.localStorage.getItem("token") || "")
    const [routines, setRoutines] = useState([]);
    const [activities, setActivities] = useState([]);
    const [userInfo, setUserInfo] = useState({});

    function logOut() {
        setToken('');
        setUserInfo({});
    }
    
    function makeHeaders() {
        if (token !== '') {
            return (
                <>
                <Link to='/myroutines' className='m-2 text-white'>My Routines</Link>
                <Link to='/routines' className='m-2 text-white' onClick={logOut}>Log Out</Link>
                </>
            )
        }
        else {
            return <Link to='/login' className='m-2 text-white'>Sign In/Sign Up</Link>
        }
    }

    useEffect(() => {
        async function fetchUserData(token) {
            const result = await fetchUserInfo(token);
            setUserInfo(result);
        }
        if (token !== '') {
            fetchUserData(token);
        }
    }, [token])

    useEffect(() => {
        window.localStorage.setItem("token", token);
    }, [token]);

    return (
        <div className="App">
            <header className='bg-secondary text-white mb-2 pb-1'>
                <div className='d-flex ms-3 pt-2'>
                    <h3 className='flex-grow-1'>Fitness Trac.kr</h3>
                    <div className='align-self-end'>
                    <Link to='/' className='m-2 text-white'>Home</Link>
                    <Link to='/routines' className='m-2 text-white'>Routines</Link>
                    <Link to='/activities' className='m-2 text-white'>Activities</Link>
                    {makeHeaders()}
                    </div>
                </div>
            </header>
            <main>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/login' element={<Login setToken={setToken}/>}></Route>
                    <Route path='/register' element={<Register setToken={setToken}/>}></Route>
                    <Route path='/routines' element={<Routines routines={routines} setRoutines={setRoutines} userInfo={userInfo} token={token}/>}></Route>
                    <Route path='/routines/:routineId' element={<SingleRoutine routines={routines} setRoutines={setRoutines} userInfo={userInfo} token={token}/>}></Route>
                    <Route path='/addroutine' element={<AddRoutine token={token} setUserInfo={setUserInfo}/>}></Route>
                    <Route path='/myroutines' element={<MyRoutines routines={routines} setRoutines={setRoutines} userInfo={userInfo}/>}></Route>
                    <Route path='/activities' element={<Activities activities={activities} setActivities={setActivities} token={token}/>}></Route>
                    <Route path='/activities/:activityId' element={<SingleActivity activities={activities} setActivities={setActivities} userInfo={userInfo} token={token}/>}></Route>
                    <Route path='/addactivity' element={<AddActivity token={token} setUserInfo={setUserInfo}/>}></Route>
                    <Route path='/users/:userId' element={<Users routines={routines} setRoutines={setRoutines}/>}></Route>
                </Routes>
            </main>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);