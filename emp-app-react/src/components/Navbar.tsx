import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState} from './../state/store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export interface NavbarProps {
  isLoggedIn: boolean;
}

const Navbar = () => {
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">InstaWork Employees App</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  ) ;
};

export default Navbar;
