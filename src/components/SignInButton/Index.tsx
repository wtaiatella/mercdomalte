import { Container } from './styles';
import { AiOutlineUser } from 'react-icons/ai';

export function SignInButton() {
	return (
		<Container href='/login'>
			Login
			<AiOutlineUser />
		</Container>
	);
}
