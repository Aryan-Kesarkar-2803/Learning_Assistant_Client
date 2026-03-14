import React, { useState } from 'react'
import UserProfile from './UserProfile'
import { authUserAtom } from '../../store/other'
import { useAtom } from 'jotai'


const Profile = () => {
  const [authUser, setAuthUser] = useAtom(authUserAtom);

  return (
    authUser?.role == 'user' ?
    <UserProfile/> 
    :
    <div>admin</div>
    
  )
}

export default Profile
