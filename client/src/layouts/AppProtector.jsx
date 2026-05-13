// src/components/layout/AppProtector.jsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOut, selectCurrentToken } from '../../store/features/auth/authSlice';
import { jwtDecode } from 'jwt-decode'; // npm install jwt-decode

const AppProtector = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // If token is expired, log them out immediately
      if (decoded.exp < currentTime) {
        dispatch(logOut());
      }
    }
  }, [token, dispatch]);

  return children;
};

export default AppProtector;