import Link from 'next/link';
import { Container } from './styles';
import { AiOutlineUser } from 'react-icons/ai';

export function SignInButton() {
	return (
		<Link href='/login'>
			<Container>
				Login
				<AiOutlineUser />
			</Container>
		</Link>
	);
}
