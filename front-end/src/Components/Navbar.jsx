import { Link, NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaClipboard, FaPhone, FaUser, FaReact } from 'react-icons/fa';
import { useEffect, useRef, useState } from "react";
import { IoIosLogOut, IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import frogLogo from "/public/frogLogo.png";

export const NavBar = () => {
    // SCROLL

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollPosition, setLastScrollPosition] = useState(0);

    const handleScroll = () => {
        const currentScrollPosition = window.pageYOffset;

        if (currentScrollPosition > lastScrollPosition) {
            // Scrolling down
            setIsVisible(false);
        } else {
            // Scrolling up
            setIsVisible(true);
        }

        setLastScrollPosition(currentScrollPosition);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollPosition]); // Dependency to track scroll position

    
    // DROPDOWN
    const [dropdownState, setDropdownState] = useState(false)
    const dropdownRef = useRef(null)

    const toggleDropdown = () => {
        setDropdownState((prevState) => !prevState)
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownState(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <nav className={`bg-gray-800 text-white p-4 fixed top-0 w-full transition-transform duration-300 z-50 ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <span>
                        <NavLink to="/home">

                            <img src={frogLogo} className="w-12 h-12 rounded-full" alt="Froggy market logo" />
                        </NavLink>


                    </span>
                    <NavLink to="/home">

                        <span>Store</span>

                    </NavLink>
                </div>
                <ul className="flex space-x-6 items-center">
                    {/* Carrito */}
                    <NavLink to='/carrito' className='nav-link flex items-center space-x-2'>
                        <CiShoppingCart />
                        <span>SuperCart</span>
                        {/* <Badge badgeContent={listaCompras.length} color="secondary">
                            <ShoppingCart color="action" />
                        </Badge> */}
                    </NavLink>
                    <li ref={dropdownRef}>
                        <div className="container mx-auto flex justify-between items-center">
                        <span>

                                <FaUser />
                        </span>
                        <span>
                            <button
                                id="menu-toggle"
                                type="button"
                                data-target="#mobile-menu"
                                aria-controls="mobile-menu"
                                aria-expanded={dropdownState}
                                className="bg-blue-500 text-white p-2 rounded"
                                onClick={toggleDropdown}
                            >

                                {dropdownState
                                    ? <IoMdArrowDropdown />
                                    : <IoMdArrowDropup />
                                }
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </button>
                        </span>
                        </div>


                    </li>
                    <li>
                       
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
                        <NavLink to="/profile" className="block px-4 py-2 hover:bg-gray-100 hover:text-black">
                            <span>

                                Profile
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
