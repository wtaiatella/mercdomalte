import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table, Tag, Popconfirm, Modal } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/lib/table';
import type { FilterConfirmProps } from 'antd/lib/table/interface';
import React, { useRef, useState, ReactNode, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import { Container } from './styles';

interface DataType {
	key: string;
	icon: ReactNode;
	title: string;
	size: number;
	categories: string[];
}

type DataIndex = keyof DataType;

export function Dashboard({ medias }) {
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef<InputRef>(null);

	console.log('dentro do dashboard');
	console.log(medias);

	const [data, setData] = useState<DataType[]>([]);

	useEffect(() => {
		const mediaList = medias.map((media) => {
			return {
				key: media.id,
				icon: <SearchOutlined />,
				title: media.title,
				size: 32,
				categories: ['Insumos'],
			};
		});
		setData(mediaList);
	}, [medias]);

	const handleSearch = (
		selectedKeys: string[],
		confirm: (param?: FilterConfirmProps) => void,
		dataIndex: DataIndex
	) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = async (clearFilters: () => void) => {
		clearFilters();
		setSearchText('');
	};

	const handleDownload = (key: React.Key) => {
		const downloadData = data.filter((item) => item.key === key);
		console.log(downloadData[0].title);
		<Popconfirm title='Download de arquivo' onConfirm={() => {}}>
			<a>Sim</a>
		</Popconfirm>;
	};

	const getColumnSearchProps = (
		dataIndex: DataIndex
	): ColumnType<DataType> => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={searchInput}
					placeholder={`Buscar ${dataIndex}`}
					value={selectedKeys[0]}
					allowClear
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(
							selectedKeys as string[],
							confirm,
							dataIndex
						)
					}
					//style={{ marginBottom: 8, display: 'block' }}
					style={{
						marginBottom: 8,
						display: 'block',
						width: '300',
						padding: '10px',
					}}
				/>
				<Space>
					<Button
						type='primary'
						onClick={() =>
							handleSearch(
								selectedKeys as string[],
								confirm,
								dataIndex
							)
						}
						icon={<SearchOutlined />}
						size='small'
						style={{ width: 90 }}
					>
						Buscar
					</Button>
					<Button
						onClick={async () => {
							clearFilters && (await handleReset(clearFilters));
							confirm({ closeDropdown: true });
							setSearchedColumn(dataIndex);
						}}
						size='small'
						style={{ width: 90 }}
					>
						Reset
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined
				style={{ color: filtered ? '#1890ff' : undefined }}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),

		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	});

	const columns: ColumnsType<DataType> = [
		{
			title: 'Tipo',
			dataIndex: 'icon',
			key: 'icon',
			width: '5%',
			align: 'center',
		},
		{
			title: 'Titulo',
			dataIndex: 'title',
			key: 'title',
			width: '48%',
			...getColumnSearchProps('title'),
		},

		{
			title: 'Size',
			dataIndex: 'size',
			key: 'size',
			width: '10%',
			sorter: (a, b) => a.categories.length - b.categories.length,
			sortDirections: ['descend', 'ascend'],
			render: (_, { size }) => <>{size} kb</>,
		},
		{
			title: 'Categoria',
			dataIndex: 'categories',
			key: 'categories',
			...getColumnSearchProps('categories'),

			render: (_, { categories }) => (
				<>
					{categories.map((category) => {
						return <Tag key={category}>{category}</Tag>;
					})}
				</>
			),
		},
		{
			title: 'Action',
			key: 'operation',
			fixed: 'right',
			width: 100,
			render: (_, record: { key: React.Key }) =>
				data.length >= 1 ? (
					<Button
						type='link'
						size='small'
						onClick={() => {
							handleDownload(record.key);
						}}
					>
						Download
					</Button>
				) : null,
		},
	];

	return (
		<Container>
			<Table className='tableData' columns={columns} dataSource={data} />
		</Container>
	);
}
