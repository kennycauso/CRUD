import React from 'react'
import axios from 'axios'
import { FaTrash } from "react-icons/fa"
import { FaPencilAlt } from 'react-icons/fa';
import {FaBirthdayCake} from "react-icons/fa"

const UsersList = ({ user, currentUsers, setUpdateUser, setIsOpenForm }) => {

    const deleteUser = () =>{
        const URL = `https://users-crud1.herokuapp.com/users/${user.id}`
        axios.delete(URL)
        .then(res => {
            console.log(res.data)
            currentUsers()
            })
        .catch(err => console.log(err))
    }

    const updateUser = () => {
        setUpdateUser(user)
        setIsOpenForm(true)
    }

    return (
    <div className='container-user'>
        <ul className='container-user__info'>
            <li className='user__name'>{user.first_name} {user.last_name}</li>
            <li className='user__email'>{user.email}</li>
            <li className='user__birthday'><FaBirthdayCake className='user__iconBirthday'/> {user.birthday}</li>
        </ul>
        <div className="icons">
            <FaTrash onClick={deleteUser} className='icons__trash'/>
            <FaPencilAlt onClick={updateUser} className='icons__pen'/>
        </div>
    </div>    
    )
}

export default UsersList
