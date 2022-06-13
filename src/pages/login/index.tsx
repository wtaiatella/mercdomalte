import styled from 'styled-components';
import { Header } from '../../components/Header';

const Title = styled.h1`
	font-size: 50px;
	color: ${({ theme }) => theme.colors.primary};
`;

export default function Login() {
	return (
		<>
			<Header />
			<Title>login</Title>
		</>
	);
}
