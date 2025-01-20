import React from 'react'
import Layout from '../Components/Layout'
import NavBar from '../Components/Navbar'
import Footer from '../Components/Footer'

const NotFoundPage = () => {
  return (
    <>
    <NavBar/>
    <Layout paragraph={"The page was not found"} title={"Page Not found"}></Layout>
    <Footer/>
    </>
  )
}

export default NotFoundPage
