import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table, Tag, Popconfirm } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/lib/table';
import type { FilterConfirmProps } from 'antd/lib/table/interface';
import React, {
	useRef,
	useState,
	ReactNode,
	useEffect,
	useContext,
} from 'react';
import Highlighter from 'react-highlight-words';
import { UserContext } from '../../contexts/UserContext';
import { s3getDownloadeSignedUrl } from '../../services/awsService';
import { Container } from './styles';

interface DataType {
	key: string;
	icon: ReactNode;
	title: string;
	name: string;
	size: number;
}

type DataIndex = keyof DataType;

export function Dashboard({ files }) {
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef<InputRef>(null);
	const { urlBackendApi } = useContext(UserContext);

	console.log('dentro do dashboard');
	console.log(files);

	const [data, setData] = useState<DataType[]>([]);

	useEffect(() => {
		const fileList = files.map((file) => {
			return {
				key: file.id,
				icon: <SearchOutlined />,
				title: file.title,
				name: file.name,
				size: file.size / 1000,
			};
		});
		setData(fileList);
	}, [files]);

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

	const handleDownload = async (key: React.Key) => {
		const downloadfile = data.filter((item) => item.key === key);
		console.log(downloadfile[0].name);
		const url = await s3getDownloadeSignedUrl(
			downloadfile[0].name,
			urlBackendApi
		);
		open(url.slice(1, -1), '_blank');
		console.log(url);
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
			width: '30%',
			...getColumnSearchProps('title'),
		},

		{
			title: 'Nome do Arquivo',
			dataIndex: 'name',
			key: 'name',
			width: '30%',
			...getColumnSearchProps('name'),
		},

		{
			title: 'Tamanho',
			dataIndex: 'size',
			key: 'size',
			width: '15%',
			sorter: (a, b) => a.size - b.size,
			sortDirections: ['descend', 'ascend'],
			render: (_, { size }) => <>{size} kb</>,
		},

		{
			title: 'Action',
			key: 'operation',
			fixed: 'right',
			width: 100,
			render: (_, record: { key: React.Key; title: string }) => {
				if (data.length >= 1) {
					console.log('Inicio dos dados da linha');
					console.log(data);
					console.log(record);
					console.log(record.key);
					console.log(record.title);

					return (
						<Button
							title='Download de arquivo'
							onClick={() => handleDownload(record.key)}
						>
							Download
						</Button>
					);
				} else {
					return null;
				}
			},
		},
	];

	return (
		<Container>
			<Table className='tableData' columns={columns} dataSource={data} />
		</Container>
	);
}
