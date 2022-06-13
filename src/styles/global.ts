import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

:root {
	
	--red: #e52e4d;
	--blue: #5429cc;
	--green: #33cc95;

	--blue-light: #6933ff;

	--text-title: #363f5f;
	--text-body: #969cb3;

	--background: #f8f2f5;	
	--shape: #fff;
}


*{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

// font-size standard: 16px for desktops
html{
	@media (max-width: 1080px) {
		//16 pix * 0,9375 = 15px
		font-size: 93.75%;
	}
	
	@media (max-width: 720px) {
		//16 pix * 0,875 = 15px
		font-size: 87.5%;
	}

}

body{
	-webkit-font-smoothing: antialiased;
}

body, input, textarea, select, button {
	font-family: 'Poppins', sans-serif;
	font-weight: 400;
}

h1, h2, h3, h4, h5, h6, strong {
	font-weight: 600;
}

a {
	color: inherit;
	text-decoration: none;
}

button {
	cursor: pointer;
}

[disabled]{
	opacity: 0.6;
	cursor: not-allowed;
}

.react-modal-overlay {
background: rgba(0, 0, 0, 0.5);
position: fixed;
top: 0;
bottom: 0;
right: 0;
left: 0;
display: flex;
align-items: center;
justify-content: center;
}


.react-modal-content {
	width: 100%;
	max-width: 576px;
	background: var(--background);
	padding: 3rem;
	position: relative;
	border-radius: 0.24rem;

}

.react-modal-close {
	position: absolute;
	right: 1.5rem;
	top: 1.5rem;
	border: 0;
	background: transparent;

	transition: filter 0.2s;

	&:hover {
		filter: brightness(0.8)
	}
}

`;
