import styled from 'styled-components';

export const Logout = styled.div`
	padding: 1rem 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 1rem;
	min-width: 240px;
	color: rgba(110, 52, 53, 1);

	p {
		margin-bottom: 0.3rem;
	}

	button {
		border: none;
	}

	button:hover {
		color: rgba(110, 52, 53, 0.3);
	}

	span {
		margin: 0 0.5rem;
	}
	svg {
		margin-left: 1rem;
		font-size: 30px;
	}
`;

export const Login = styled.a`
	padding: 1rem;
	display: flex;
	align-items: center;
	font-size: 1.1rem;

	svg {
		margin-left: 1rem;
		font-size: 1.5rem;
	}
`;
