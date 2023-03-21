import { Link, useLoaderData } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";

export const ManageProducts = () => {

    const products = useLoaderData();
    const tableColumns = [
        {
            field: 'name', headerName: '名稱', flex: 1,
            valueGetter: (params) => {
                return params.row.name || '未設定';
            },
        }, {
            field: 'price', headerName: '價格', flex: 1,
            valueGetter: (params) => {
                return params.row.price || '未設定';
            },
        }, {
            field: 'countInStock', headerName: '庫存', flex: 1,
            valueGetter: (params) => {
                return params.row.countInStock || '未設定';
            },
        }, {
            field: 'isEnabled', headerName: '已上架', flex: 1,
            valueGetter: (params) => {
                return params.row.isEnabled ? '✔️' : '❌';
            },
        },
    ];

    return (
    <div className="manage-products">
        <Row className="my-3">
            <Col xs={2} />
            <Col xs={8} className="text-center fs-1 fw-bold">商品管理</Col>
            <Col xs={2}><Button as={ Link } to="add">新增商品</Button></Col>
        </Row>

        <DataGrid autoHeight
            rows={ products }
            columns={ tableColumns }
            pageSize={5}
            rowsPerPageOptions={[1]}
            checkboxSelection
        />
    </div>
    );
};

export default ManageProducts;
