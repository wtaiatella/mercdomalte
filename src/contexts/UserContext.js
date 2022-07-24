import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
	/*
	interface fileDataProp {
		name: string;
		slug?: string;
		size: number;
		type: string;
		icon: string;
	}
	*/

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [urlBackendApi, setUrlBackendApi] = useState('');

	return (
		<UserContext.Provider
			value={{
				isModalVisible,
				setIsModalVisible,
				urlBackendApi,
				setUrlBackendApi,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
