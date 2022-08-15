import styled from 'styled-components';

export const Container = styled.header`
	padding: 1.3rem 1.5rem;
	display: grid;
	grid-template-columns: 107px 1fr 250px;
	grid-template-areas: 'logo busca signin';

	align-items: center;
	justify-content: space-between;
	border-bottom: 2px solid rgba(110, 52, 53, 0.7);

	.logo {
		grid-area: logo;
	}
	.busca {
		grid-area: busca;
	}

	.signin {
		grid-area: signin;
	}

	.ant-input-group-wrapper {
		display: block;
		max-width: 600px;
		padding: 0 3rem;
		margin: 0 auto;
	}

	@media (max-width: 700px) {
		grid-template-areas:
			'logo signin'
			'busca busca';
		grid-template-columns: 107px 1fr;
		.ant-input-group-wrapper {
			max-width: 500px;
			padding: 0 1rem;
			margin: 1rem auto 0;
		}

		.signin {
			margin-left: 1rem;
		}

		a {
			display: block;
		}
	}
`;
