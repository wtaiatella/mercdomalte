import styled from 'styled-components';

export const Container = styled.div`
	padding: 0rem 1rem;

	.ant-table {
		background-color: rgba(0, 0, 0, 0) !important;

		table {
			thead {
				tr {
					th {
						background-color: rgba(0, 0, 0, 0) !important;
						border-bottom: 2px solid rgba(110, 52, 53, 0.7);
						.ant-table-cell:before {
							width: 30px;
						}
						.ant-table-filter-trigger {
							color: rgba(110, 52, 53, 1);
							font-size: 1rem;
						}
						.ant-table-column-sorter {
							color: rgba(110, 52, 53, 0.3);
						}
						.ant-table-column-sorter-up.active {
							color: rgba(110, 52, 53, 0.7);
						}
						.ant-table-column-sorter-down.active {
							color: rgba(110, 52, 53, 0.7);
						}
					}
					th:before {
						width: 2px !important;
						background-color: rgba(110, 52, 53, 0.7) !important;
					}
					th:hover::before {
						background-color: rgba(110, 52, 53, 0.7) !important;
					}
				}
			}
			tbody {
				tr {
					td {
						background-color: rgba(0, 0, 0, 0) !important;
						border-bottom: 1px solid rgba(110, 52, 53, 0.7);
					}
				}
			}
		}
	}
`;
