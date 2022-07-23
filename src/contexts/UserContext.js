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
	//const [fileData1, setFileData1] = useState<fileDataProp> {};
	//const [fileUploaded1, setFileUploaded1] = useState < RcFile > {};

	return (
		<UserContext.Provider
			value={{
				isModalVisible,
				setIsModalVisible,
				//fileData1,
				//setFileData1,
				//fileUploaded1,
				//setFileUploaded1,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
