import { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useLoaderData } from "react-router-dom";

export const ManageOrders = () => {
	const [orders, setOrders] = useState(useLoaderData());

	const tableColumns = [
		{
			field: 'id', headerName: '訂單編號', flex: 2,
		}, {
			field: 'totalPrice', headerName: '總金額', flex: 1,
		}, {
			field: 'payType', headerName: '付款方式', flex: 1,
			valueGetter: (params) => {
				return params.row.payType === '00' ? '貨到付款' :'信用卡';
			}
		}, {
			field: 'status', headerName: '訂單狀態', flex: 1,
			valueGetter: (params) => {
				if (params.row.payType === '0') return '未發貨';
				else if (params.row.payType === '1') return '已發貨'; 
			}
		},
	];
	
	return (
		<div className="manage-orders">
			<h1>Manage Orders</h1>
			
			<DataGrid autoHeight
				rows={orders}
				columns={tableColumns}
				disableRowSelectionOnClick
			/>
				
		</div>
	);
};

export default ManageOrders;