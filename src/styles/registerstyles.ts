import styled from 'styled-components';

export const Container = styled.div`
	width: 500px;
	margin: 0 auto;
	padding: 0 1rem;

	h1 {
		padding: 2rem 0 0 0;
	}

	form {
		margin-top: 2rem;
	}
	.ant-form-item-control {
		max-width: 100%;
	}

	.ant-form-item-control-input-content {
		display: flex;
		justify-content: space-between;
	}
`;
