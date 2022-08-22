import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'

function App() {
  const [users, setUsers] = useState()
  const [updateUser, setUpdateUser] = useState()
  const [isOpenForm, setIsOpenForm] = useState(false)

  const currentUsers = () => {
    const URL = `https://users-crud1.herokuapp.com/users/`
    axios.get(URL)
      .then(res => {
        setUsers(res.data)
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    currentUsers()
  }, [])

  const handleOpenForm = () => {
    setUpdateUser()
    setIsOpenForm(true)
  }

  return (
    <div className="App">
      <div className={isOpenForm ? "container-form" : "form-none"}>
        <UsersForm
          currentUsers={currentUsers}
          updateUser={updateUser}
          setUpdateUser={setUpdateUser}
          setIsOpenForm={setIsOpenForm}
        />
      </div>
      <div className="container-usersList">
        <div className='header'>
          <h1 className='header__title'>Users</h1>
          <button className='header__btn' onClick={handleOpenForm}>+ New User</button>
        </div>
        <div className='container-list'>
          {
            users?.map(user => (
              <UsersList
                key={user.id}
                user={user}
                currentUsers={currentUsers}
                setUpdateUser={setUpdateUser}
                setIsOpenForm={setIsOpenForm}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App
