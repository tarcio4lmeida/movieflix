import './styles.css';
import '@popperjs/core';
import 'bootstrap/js/dist/collapse';
import { useEffect } from 'react';
import history from 'util/history';
import { useContext } from 'react';
import { AuthContext } from 'AuthContext';
import { getTokenData, isAuthenticated } from 'util/auth';
import { removeAuthData } from 'util/storage';

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);
  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <nav className="navbar navbar-expand-md custom-toggler.navbar-toggler bg-primary main-nav">
      <div className="container-fluid">
        <h4>MovieFlix</h4>
        {authContextData.authenticated && (
          <div className="nav-login-logout">
            <>
              <a href="#logout" onClick={handleLogoutClick}>
                SAIR
              </a>
            </>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
