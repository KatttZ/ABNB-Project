import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../img/homelogo.jpeg'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav>
    <ul className='nav_ul'>
       <li id="logo">
     {/* <NavLink to="/">Home</NavLink> */}
         <NavLink to="/"><img src={logo} alt="Logo" />VBnb</NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
    </nav>
  );
}

export default Navigation;