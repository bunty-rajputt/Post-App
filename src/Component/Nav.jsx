import {Rout} from "./HandleRout";
import { NavLink } from 'react-router-dom'


const  Navbar= () => {
    return ( 
        <>
        <div className="App">
        
         <nav>
        <ul className='container d-flex justify-content-between align-items-center list-unstyled'>
          <li className='me-2'><NavLink to='/home'>Home</NavLink></li>
          <li className='me-2'><NavLink to='/about'>About</NavLink></li>
          <li className='me-2'><NavLink to='Student'>Students</NavLink></li> 
        </ul>
      </nav>
       </div>
       <Rout/></>
        
     );
}
 
export default Navbar;