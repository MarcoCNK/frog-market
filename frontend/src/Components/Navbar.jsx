import { Link, NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaPhone, FaUser, FaShoppingCart } from 'react-icons/fa'
import { useContext, useEffect,  useState } from "react"
import { IoIosLogOut, IoIosArrowDropdownCircle, IoIosArrowDropup } from "react-icons/io"
import frogLogo from "/frogLogo.png"
import { AuthContext } from "../Context/AuthContenxt"


const DropdownIcon = ({ dropdownState }) => {
    return dropdownState ? <IoIosArrowDropdownCircle /> : <IoIosArrowDropup/>;
}



export const NavBar = ({cartList}) => {
    const {isLoged} = useContext(AuthContext)

    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollPosition, setLastScrollPosition] = useState(0)

    const handleScroll = () => {
        const currentScrollPosition = window.pageYOffset
        if (currentScrollPosition > lastScrollPosition) {
            setIsVisible(false)
        } else {
            setIsVisible(true)
        }

        setLastScrollPosition(currentScrollPosition)
    }

    

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrollPosition])


    // DROPDOWN

    const [dropdownState, setDropdownState] = useState(false)

    const toggleDropdown = () => {
		setDropdownState((prevState) => !prevState);
	};

    return (
        <nav className={`bg-transparent text-white p-4 fixed top-0 w-full transition-transform duration-300 z-50 ${isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <span>
                        <NavLink to="/home">

                            <img src={frogLogo} className="w-18 h-14 rounded-full" alt="Froggy market logo" />
                        </NavLink>


                    </span>
                    <NavLink to="/home">

                        <span>Store</span>

                    </NavLink>
                </div>
                <ul className="flex space-x-6 items-center">
                    {
                    isLoged &&
                    <NavLink to='/supercart' className='nav-link flex items-center space-x-2'>
                        { cartList ? 
                        <Badge badgeContent={listaCompras.length} color="secondary">
                            <FaShoppingCart />
                        </Badge> 
                        : <FaShoppingCart />  
                    }
                        <span>SuperCart</span>
                    </NavLink>

                    }

                    <li  >
                        <div className="container mx-auto flex justify-between items-center">
                            <span>

                                <FaUser />
                            </span>

                            <span className="mobile-menu" >
                                <button

                                    id="menu-toggle"
                                    type="button"
                                    data-target="#mobile-menu"
                                    aria-controls="mobile-menu"
                                    className="bg-transparent border-0 text-white"
                                    onClick={toggleDropdown}
                                >
                                    <DropdownIcon dropdownState={dropdownState} />
                                </button>
                            </span>
                        </div>


                    </li>
                </ul>
            </div>

            {/* Dropdown */}
            <div className={`absolute bg-black right-0 mt-2 w-48 shadow-lg rounded-lg ${dropdownState ? '' : 'hidden'}`}>
                <ul className="p-2">
                    <li>
                        <NavLink to="/login" className="block px-4 py-2 hover:bg-gray-100 hover:text-black">
                            <span>
                                Login

                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/logout" className="flex justify-between items-center block px-4 py-2 hover:bg-gray-100 hover:text-black">


                            <span>

                                Logout
                            </span>
                            <span>

                                <IoIosLogOut />
                            </span>
                        </NavLink>
                    </li>
                </ul>
            </div>

        </nav>
    )
}

export default NavBar

