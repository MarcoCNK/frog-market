// import React, { useEffect } from 'react'
// import NavBar from '../Components/Navbar'

// const MyProfile = () => {
//     let myUser = {}
//     const me = sessionStorage.getItem('token')

//     const reachUser = async () => { 
//         const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/get-user/${me}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })

//         const data = await response.json()
//         console.log(data.response.payload)
//         myUser = data.response.payload
//     }

//     useEffect(() => {
//         reachUser()
//     }, [])

//     console.log(myUser)
//     return (
//     <>
//     <NavBar/>
//     {
//         myUser
//     }
//     <h2>{myUser.email}</h2>
//     </>
//   )
// }

// export default MyProfile