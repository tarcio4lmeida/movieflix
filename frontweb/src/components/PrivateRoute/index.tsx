import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from 'util/auth';

type Props = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  return isAuthenticated() ? children : <Redirect to="/" />;
};

export default PrivateRoute;
