import { Link, useLoaderData } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';

export const ManageDiscount = () => {
  const discounts = useLoaderData();
  
  const tableColumns = [
		{
			field: 'discountCode', headerName: '優惠碼', flex: 2,
		}, {
			field: 'discountPersentage', headerName: '折扣', flex: 2,
			valueGetter: (params) => {
				return `${params.row.discountPersentage}%`
			}
		}, {
			field: 'isActive', headerName: '可用', flex: 2,
			valueGetter: (params) => {
				return params.row.isActive ? '✔️' : '❌';
			}
		},{
			field: '', headerName: '操作', flex: 1,
			renderCell: (params) => {
				return <Button as={ Link } to={`${params.row.id}`}>詳細</Button>
			}
		}
	];

  return (
    <div>
      <div className='d-flex justify-content-around'>
        <div></div>
        <div className="text-center fs-1 fw-bold">優惠碼管理</div>
        <Button className='my-3' as={ Link } to="create" variant="success">新增</Button>
      </div>
      
      <DataGrid autoHeight
				rows={ discounts }
				columns={ tableColumns }
				disableRowSelectionOnClick
			/>
    </div>
  );
};

export default ManageDiscount;