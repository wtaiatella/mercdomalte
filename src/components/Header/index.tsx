import Image from 'next/image';
import Link from 'next/link';
import { Container } from './styles';
import { SignInButton } from '../SignInButton/Index';
import { Input } from 'antd';

const { Search } = Input;

export function Header() {
	const onSearch = (value) => console.log(value);

	return (
		<Container>
			<Link href='/' className='logo'>
				<Image
					src='/images/logo.png'
					alt='logo Mercado do Malte'
					width='107'
					height='87'
				/>
			</Link>

			<Search
				className='busca'
				placeholder='Procure seu arquivo'
				allowClear
				onChange={onSearch}
			/>
			<div className='signin'>
				<SignInButton />
			</div>
		</Container>
	);
}
