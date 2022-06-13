import styled from 'styled-components';

export const Container = styled.a`
	padding: 1rem;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
	align-items: center;
	font-size: 1.1rem;

	.anticon {
		font-size: 2rem;
	}
`;

export const Content = styled.div`
	max-width: 1120px;
	margin: 0 auto;

	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
`;
