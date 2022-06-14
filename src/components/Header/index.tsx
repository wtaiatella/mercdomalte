import Image from 'next/image';
import { Container, Content } from './styles';
import { SignInButton } from '../SignInButton/Index';
import { Input } from 'antd';

const { Search } = Input;

export function Header() {
	const onSearch = (value) => console.log(value);

	return (
		<Container>
			<Content>
				<a href='./'>
					<Image
						src='/images/logo.png'
						alt='logo Mercado do Malte'
						width='107'
						height='87'
					/>
				</a>

				<Search
					className='busca'
					placeholder='Procure seu arquivo'
					allowClear
					onChange={onSearch}
					style={{
						width: 600,
					}}
				/>
				<SignInButton />
			</Content>
		</Container>
	);
}
