import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { googleLogout } from '@react-oauth/google';

const randomImage = 'https://source.unsplash.com/1600x900/?animals,mountains,sky'
const UserProfile = () => {
  const [user, setUser] = useState(null)

  const [pins, setPins] = useState(null)
  const [text, setText] = useState('created') //'created' or 'saved'
  const [activeBtn, setActiveBtn] = useState('created')
  const navigate = useNavigate()
  const { userId } = useParams()
  const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none'
  const notActiveBtnStyle = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none'

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query)
      .then((data) => {
        setUser(data[0])
      })
  }, [userId])

  useEffect(() => {
    if (text === 'created') {
      const createdPinsQuery = userCreatedPinsQuery(userId)

      client.fetch(createdPinsQuery)
        .then((data) => {
          setPins(data);
        })
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId)

      client.fetch(savedPinsQuery)
        .then((data) => {
          setPins(data);
        })
    }

  }, [text, userId])


  const logout = () => {
    googleLogout()
    localStorage.clear()
    navigate('/login')
  }


  if (!user) {
    return <Spinner message={"Loading profile..."} />
  }
  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img src={randomImage}
              className='w-full h-370 2xl:h-510 shadow-lg object-cover' alt='banner' />
            <img src={user.image} alt="user-pp" className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover " />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.userName}
            </h1>
            <div className='absolute top-0 z-1 right-0 p-2'>
              {userId === user._id && (

                <button onClick={logout} type='button' className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md">
                  <AiOutlineLogout color='red' fontSize={21} />
                </button>
              )}
            </div>
          </div>
          <div className="text-center mb-7 ">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.value)
                setActiveBtn('created')
              }}
              className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyle}`}
            >Created</button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.value)
                setActiveBtn('saved')
              }}
              className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyle}`}
            >Saved</button>
            <div className="px-2">
              <MasonryLayout pins={pins} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default UserProfile