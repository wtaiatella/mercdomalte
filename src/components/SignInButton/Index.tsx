import Link from 'next/link';
import { Logout, Login } from './styles';
import { AiOutlineUser } from 'react-icons/ai';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useRouter } from 'next/router';

export function SignInButton() {
	const { session, setSession } = useContext(UserContext);
	const [user, setUser] = useState<string>('');

	const router = useRouter();

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

	return (
		<>
			{user ? (
				<Logout>
					<div>
						{user}
						<div>
							<a href='/myaccount'>Minha conta |</a>

							<button onClick={handleLogout}> Logout</button>
						</div>
					</div>
					<AiOutlineUser />
				</Logout>
			) : (
				<Login onClick={handleLogin}>
					Entrar
					<AiOutlineUser />
				</Login>
			)}
		</>
	);
}
