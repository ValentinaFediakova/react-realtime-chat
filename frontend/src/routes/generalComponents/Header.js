import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import useAuth from '../../hooks/index';
import { deleteUser } from '../../redux/actions/user.action';
import { clearReduxData } from '../../redux/actions/signOut.action';

import './Header.css';

const Header = () => {
  const login = useSelector((state) => state.user.username);
  const auth = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    dispatch(deleteUser());
    dispatch(clearReduxData());
    auth.logOut();
  };

  return (
    <div className="shadow-sm p-3 mb-5 bg-white rounded">
      <Container>
        <Navbar expand="lg" variant="light" bg="white">
          <Container>
            <Link to="/" className="Header__main-link"><Navbar.Brand>{t('header.heading')}</Navbar.Brand></Link>
            { !!login && <Button variant="primary" onClick={handleSignOut}>{t('header.logOut')}</Button> }
          </Container>
        </Navbar>
      </Container>
    </div>
  );
};

export default Header;
