import React, { useState, useRef, useEffect } from 'react'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom'

import { Sidebar, UserProfile } from '../components'
import { client } from '../client'
import logo from '../assets/logo.png'
import Pins from './Pins'
import { userQuery } from '../utils/data'
import { fetchUser } from '../utils/fetchUser';


const Home = () => {

  //a use state stores the state of a functional component.
  // it is represented as an array where the first item 
  // is the variable and the second item is a function to
  //update the variable 
  const [toggleSidebar, setToggleSidebar] = useState(false); //this is a hook for the useState which sets the initial value/state of the variable 
  const [user, setUser] = useState();
  const scrollRef = useRef(null);

  const userInfo = fetchUser();
  
  //useEffect notes in compponents/Feed.jsx
  useEffect(() => {
    const query = userQuery(userInfo?.sub);

    //uses setUser usestate to assign data from localStorage to user
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
    //because there is an empty array as the dependencies,
    // this useEffect only runs once in the intial rendering
  }, []);

  //this useEffect runs after every rendering
  //because theres no dependencies argument
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        {/* && is a form of if statement. "a>b && doSomething" means if a<b then do something */}
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)} />
          <Link to='/'>
            <img src={logo} alt="logo" className='w-28' />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="user-pic" className='w-28' />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2 ">
              <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user&&user} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home