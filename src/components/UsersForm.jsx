import React, { useEffect } from 'react'
import axios from 'axios'
import { FaUser } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { AiTwotoneLock } from "react-icons/ai"
import { FaBirthdayCake } from "react-icons/fa"
import {TiDelete} from "react-icons/ti"
import { useForm } from 'react-hook-form'

const defaultValue ={
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    birthday: ""
}

const UsersForm = ({currentUsers, updateUser, setUpdateUser, setIsOpenForm}) => {

    useEffect(() => {
        if(updateUser){
            reset(updateUser)
        }
    },[updateUser])

    const {register, handleSubmit, reset} = useForm()

    const newUser = data =>{
        const URL = `https://users-crud1.herokuapp.com/users/`
        axios.post(URL, data)
        .then(res => {
            console.log(res.data)
            currentUsers()
        })
        .catch(err => console.log(err))
    }

    const updateInfoUser = data => {
        const URL = `https://users-crud1.herokuapp.com/users/${updateUser.id}/`
        axios.patch(URL, data)
        .then(res => {
            console.log(res.data)
            currentUsers()
        })
        .catch(err => console.log(err))
    }

    const submit = data =>{
        if(updateUser){
            updateInfoUser(data)
            setUpdateUser()
        }else{
            newUser(data)
        }
        setIsOpenForm(false)
        reset(defaultValue)
    }

    const handleCloseForm = () => {
        setIsOpenForm(false)
        reset(defaultValue)
        currentUsers()
    }

    return (
        <form className='form' onSubmit={handleSubmit(submit)}>
            <div className="icon-x" onClick={handleCloseForm}><TiDelete className='x'/></div>
            <h2 className='form__title'>{updateUser ? "Edit User" : "New User"}</h2>
            <div className='form__name'>
                <FaUser className='form__icon user_icon'/>
                <input {...register("first_name")} className="input-name" type="text" placeholder='first name' />
                <input {...register("last_name")} type="text" placeholder='last name' />
            </div>
            <div className='form__email'>
                <MdEmail className='form__icon'/>
                <input {...register("email")} type="email" placeholder='email' />
            </div>
            <div className="form__pass">
                <AiTwotoneLock className='form__icon'/>
                <input {...register("password")} type="password" placeholder='password' />
            </div>
            <div className="form__birthday">
                <FaBirthdayCake className='form__icon'/>
                <input {...register("birthday")} type="date" placeholder='birthday' />
            </div>
            <button className='form__btn'>{updateUser ? "Save Edit" : "Upload"}</button>
        </form>
    )
}

export default UsersForm
