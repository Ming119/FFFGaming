import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { Table } from "../../../components/Table";

export const ManageProducts = () => {
    
    const [ selectedProducts, setSelectedProducts ] = useState([]);

    const products = useLoaderData();
    const tableColumns = [
        { key: '-', label: '選取' },
        { key: 'name', label: '名稱' },
        { key: 'price', label: '價格' },
        { key: 'countInStock', label: '庫存' },
        { key: 'isEnabled', label: '已上架' },
        { key: '/', label: ''},
    ];

    return (
    <div className="manage-products">
        <Row className="my-3">
            <Col xs={2} />
            <Col xs={8} className="text-center fs-1 fw-bold">商品管理</Col>
            <Col xs={2}><Button as={ Link } to="add">新增商品</Button></Col>
        </Row>

        <Table tableColumns={ tableColumns }
            tableData={ products }
            setSelected={ setSelectedProducts } />
    </div>
    );
};

export default ManageProducts;
