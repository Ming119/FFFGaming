import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLoaderData } from "react-router-dom";
import { ButtonGroup, Button, Col, Row } from "react-bootstrap";
import { getFirestore, setDoc, doc } from "firebase/firestore";

export const ManageProducts = () => {

    const [ rowSelection, setRowSelection ] = useState([]);
    const [ products, setProducts ] = useState(useLoaderData());

    useEffect(() => {
        if (rowSelection.length > 0) {
            document.querySelector('#enableBtn').disabled = false;
            document.querySelector('#disableBtn').disabled = false;
        } else {
            document.querySelector('#enableBtn').disabled = true;
            document.querySelector('#disableBtn').disabled = true;
        }
    }, [rowSelection]);

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
        }, {
            field: 'id', headerName: '', flex: 1,
            renderCell: (params) => {
                return (
                    <Button as={ Link } to={`${params.row.id}`}>詳細</Button>
                );
            }
        }
    ];

    const onEnableButtonClick = () => {
        const db = getFirestore();
        rowSelection.forEach(async (id) => {
            await setDoc(doc(db, "products", id), {
                isEnabled: true,
            }, { merge: true });
            setProducts(products.map((product) => {
                if (product.id === id) product.isEnabled = true;
                return product;
            }));
        });
    };

    const onDisableButtonClick = () => {
        const db = getFirestore();
        rowSelection.forEach(async (id) => {
            await setDoc(doc(db, "products", id), {
                isEnabled: false,
            }, { merge: true });
            setProducts(products.map((product) => {
                if (product.id === id) product.isEnabled = false;
                return product;
            }));
        });
    };

    return (
    <div className="manage-products">
        <Row className="my-3">
            <Col xs={ 3 } />
            <Col xs={ 6 } className="text-center fs-1 fw-bold">商品管理</Col>
            <Col xs={ 3 }>
                <ButtonGroup className="d-flex my-3">
                    <Button as={ Link } to="create">新增商品</Button>
                    <Button id="enableBtn" variant="success" onClick={ onEnableButtonClick }>上架</Button>
                    <Button id="disableBtn" variant="danger" onClick={ onDisableButtonClick }>下架</Button>
                </ButtonGroup>
            </Col>
        </Row>

        <DataGrid autoHeight
            rows={ products }
            columns={ tableColumns }
            checkboxSelection
            onRowSelectionModelChange={ (newSelection) => {
                setRowSelection(newSelection);
            }}
        />
    </div>
    );
};

export default ManageProducts;
