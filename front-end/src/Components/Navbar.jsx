import { Link, NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboard, faPhone, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';


export const NavBar = () => {
    return (
        <>
            <nav >
                <Link to="/home">
                    <img src='' alt="logo" />
                </Link>
                <button>
                    <span className="navbar-toggler-icon">
                        Brand Dropdown
                    </span>
                </button>
                <ul >
                    <li className="nav-item home rounded mx-auto d-block align-self-center container-flui-lg" >
                        <NavLink to="/" className='nav-link anchor rounded mx-auto d-block'><FontAwesomeIcon icon={faHome} />Home</NavLink>
                    </li>
                    <li className="nav-item category contact align-self-center ">
                        <NavLink to='/contact' className='nav-link anchor rounded mx-auto d-block'><FontAwesomeIcon icon={faPhone} />Contactarse  </NavLink>
                    </li>
                    <form className="d-flex search rounded mx-auto d-block align-self-center" role="search">
                        <input type="search" placeholder="Search" />
                        <button className="btn btn-outline-primary --bs-primary-bg-subtle" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    </form>
                    <label htmlFor="category">
                        <li className="nav-item anchor dropdown dropp drop-link rounded mx-auto d-block align-self-center   align-content" >
                            <a className="nav-link dropdown-toggle  anchor  rounded mx-auto d-block" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Nuestros productos
                            </a>

                            <ul id="category" className="dropdown-menu z-3">
                                <img className='loguito' src='' />
                                <NavLink to='productos' value='air' className="droping fs-6 anchor2" data-bs-toggle="dropdown" aria-expanded="false">Repuesto para aires acondicionados</NavLink>
                                <li><hr className="dropdown-divider" /></li>
                                <img className='loguito' src='' /><NavLink to='productos' value='fridge' className="droping fs-6 anchor2" data-bs-toggle="dropdown" aria-expanded="false">Repuesto para heladeras</NavLink>
                                <li><hr className="dropdown-divider" /></li>
                                <li><FontAwesomeIcon icon={faClipboard} /><NavLink to='productos' className=" droping anchor2 fs-6">Más productos</NavLink></li>
                            </ul>
                        </li>
                    </label>

                    <li className="login-link align-self-center login float-end align-content">
                        <NavLink className=" align-self-center droping anchor2 fs-6" href="#"><FontAwesomeIcon icon={faUser} />Login</NavLink></li>
                    <NavLink to='/carrito' className='align-self-center carrito float-end rounded mx-auto d-block align-self-center'>

                        {/* <Badge badgeContent={listaCompras.length} color="secondary">
                            <ShoppingCart color="action" />
                        </Badge> */}
                    </NavLink>
                </ul>
            </nav>
        </>
    )
}

export default NavBar
