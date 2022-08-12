import Router from 'next/router';
import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import LoginForm from '../components/LoginForm';
import { UserContext } from './UserContext';

const AuthContext = createContext({});

interface IAdminAuthProvider {
	children: ReactNode;
}

export const AdminAuthProvider = ({ children }: IAdminAuthProvider) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const { session, urlBackendApi } = useContext(UserContext);

	useEffect(() => {
		(async () => {
			console.log('auth');
			//const token = localStorage.getItem('token');
			console.log(session);

			if (session.accessToken) {
				const response = await fetch(`${urlBackendApi}/auth/check`, {
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
						Authorization: `Bearer ${session.accessToken}`,
					},
				});
				const result = await response.json();
				console.log(result);
				if (result.auth) {
					setIsAuthenticated(true);
				}
			}
		})();
	}, [session]);

	return (
		<AuthContext.Provider value={{}}>
			{!isAuthenticated ? <LoginForm /> : children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
