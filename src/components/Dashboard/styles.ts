import styled from 'styled-components';

export const Container = styled.div`
	.ant-table {
		background-color: rgba(1, 1, 1, 0) !important;
	}

	table {
		thead {
			tr {
				th {
					background-color: rgba(0, 0, 0, 0) !important;
					border-bottom: 2px solid #857b7b;
					.ant-table-cell:before {
						width: 3px;
					}
				}
				th:before {
					width: 3px !important;
					background-color: #857b7b !important;
				}
			}
		}
		tbody {
			tr {
				td {
					background-color: rgba(0, 0, 0, 0) !important;
					border-bottom: 1px solid #857b7b;
				}
			}
		}
	}
