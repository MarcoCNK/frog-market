import React from 'react'
import Layout from '../Components/Layout'
import NavBar from '../Components/Navbar'
import Footer from '../Components/Footer'

const DefaultPage = () => {
  return (
    <>
    <NavBar/>
    <Layout paragraph={"We have all kinds of bogs, frogs and bugs"} title={"Welcome to Froggy Market"}></Layout>
		<Footer/>
    </>
  )
}

export default DefaultPage