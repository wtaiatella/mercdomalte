import styled from 'styled-components';

export const Logout = styled.div`
	padding: 1rem 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 1rem;
	max-width: 250px;
	color: rgba(110, 52, 53, 1);
	grid-area: singin;

	.user-wrapper {
		margin-right: 1rem;

		.user-name {
			margin-bottom: 0.3rem;
		}

		.user-button {
			border: none;
			background-color: transparent;
		}

		.user-button:hover {
			color: rgba(110, 52, 53, 0.3);
		}

		span {
			margin: 0 0.5rem;
		}
	}

	svg {
		font-size: 35px;
	}
`;

export const Login = styled.a`
	padding: 1rem;
	display: flex;
	align-items: center;
	font-size: 1.1rem;
	color: rgba(110, 52, 53, 1);
	grid-area: singin;

	:hover {
		color: rgba(110, 52, 53, 0.3);
	}

	svg {
		margin-left: 1rem;
		font-size: 1.5rem;
		align-items: center;
	}
`;
