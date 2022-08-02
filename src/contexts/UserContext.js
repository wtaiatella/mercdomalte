import { stringify } from 'querystring';
import { createContext, useState } from 'react';

// interface sessionProps {
// 	accesToken: string;
// 	email: string;
// 	name: string;
// }

// interface AppContextInterface {
// 	isModalVisible: boolean;
// 	setIsModalVisible: () => {};
// 	urlBackendApi: string;
// 	setUrlBackendApi: () => {};
// 	session: sessionProps;
// 	setSession: () => {};
// }

export const UserContext = createContext(null);

export const UserStorage = ({ children }) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [urlBackendApi, setUrlBackendApi] = useState('');
	const [session, setSession] = useState({
		accesToken: '',
		email: '',
		name: '',
		code: 0,
	});

	return (
		<UserContext.Provider
			value={{
				isModalVisible,
				setIsModalVisible,
				urlBackendApi,
				setUrlBackendApi,
				session,
				setSession,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
