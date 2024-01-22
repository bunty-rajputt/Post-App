import logo from '../Images/logo.png'
import  './style.css';
import { NavLink } from 'react-router-dom';
export const Nav = () => {
    
    return (
        <>
        <section className='Navbar-section'>
        <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <img className='logo' src={logo}  />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink href="/" className="nav-link active work">
                                Work <i className="fa fa-shopping-bag" aria-hidden="true"/>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink href="/" className="nav-link">
                                    Services <i className="fa fa-coffee" aria-hidden="true"></i>

                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink  className="nav-link">
                                    About <i className="fa fa-heart" aria-hidden="true"></i>
                                </NavLink>
                            </li>

                        </ul>
                        <div className="d-flex nav-right ">
                            <h3 className='ml-5'>blog <i className="fa-solid fa-message"></i></h3>
                            <button className="btn btn-outline-success" type="submit">
                                Planner<i className="fa fa-leaf" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </section>

        </>
    );
};



