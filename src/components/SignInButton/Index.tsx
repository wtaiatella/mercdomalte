import Link from 'next/link';
import { Logout, Login } from './styles';
import { AiOutlineUser } from 'react-icons/ai';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useRouter } from 'next/router';

export const SignInButton = () => {
	const { session, setSession } = useContext(UserContext);
	const [user, setUser] = useState<string>('');

	const router = useRouter();
	console.log('Entrada signin button');
	console.log(session);

	useEffect(() => {
		console.log(`signin`);
		console.log(session);
		setUser(session.name);
	}, [session]);

	const handleLogout = () => {
		const accessToken = '';
		const email = '';
		const name = '';

		setSession({
			accessToken,
			email,
			name,
		});

		localStorage.setItem('token', accessToken);
		router.push('/');
	};

	const handleLogin = () => {
		router.push('/login');
	};

	const handleMyAccount = () => {
		console.log('botão my account');
		console.log(session);
		router.push('/myaccount');
	};

	return (
		<>
			{user ? (
				<Logout className='signin'>
					<div className='user-wrapper'>
						<p className='user-name'>{user}</p>
						<div>
							<button
								onClick={handleMyAccount}
								className='user-button'
							>
								Minha conta
							</button>
							<span>|</span>
							<button
								onClick={handleLogout}
								className='user-button'
							>
								{' '}
								Sair
							</button>
						</div>
					</div>
					<AiOutlineUser />
				</Logout>
			) : (
				<Login onClick={handleLogin} className='signin'>
					Entrar
					<AiOutlineUser />
				</Login>
			)}
		</>
	);
};
