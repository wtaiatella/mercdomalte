import { Title } from '../../components/Common/Title';
import { TextBlock } from '../../components/Common/TextBlock';
import LoginForm from '../../components/LoginForm';

export default function Form() {
	return (
		<>
			<div
				style={{
					width: '500px',
					margin: '0 auto',
					padding: '0 1rem',
				}}
			>
				<Title>Identificação do usuário</Title>
				<TextBlock>
					Faça o seu login e tenha acesso a todos os documentos do
					site.
				</TextBlock>
				<LoginForm />
			</div>
		</>
	);
}
