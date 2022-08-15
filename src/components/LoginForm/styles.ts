import styled from 'styled-components';

export const Container = styled.div`
	max-width: 650px;
	margin: 0 auto;
	padding: 0 1.5rem;

	.ant-form {
		margin-top: 2rem;
		max-width: 100%;
	}
	.ant-form-item-control {
		max-width: 100%;
	}

	.ant-form-item-control-input-content {
		display: flex;
		justify-content: left;
		align-items: center;
	}

	.form-register-now {
		margin-left: 1.5rem;
	}

	@media (max-width: 575px) {
		.ant-col-offset-5 {
			margin-left: 0;
		}
		.ant-btn {
			height: auto;
			width: 100px;
			word-wrap: break-word;
			white-space: break-spaces;
		}
	}
`;
