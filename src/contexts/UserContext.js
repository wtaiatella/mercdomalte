import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	return (
		<UserContext.Provider value={{ isModalVisible, setIsModalVisible }}>
			{children}
		</UserContext.Provider>
	);
};
