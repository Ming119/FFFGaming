import { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Link, useLoaderData } from "react-router-dom";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { Button, ButtonGroup, Row, Col } from "react-bootstrap";
import { PersonAdd, PersonCheck, PersonSlash, PersonVcard } from "react-bootstrap-icons";

export const ManageDiscountCodes = () => {
    
    const [ rowSelection, setRowSelection ] = useState([]);
    const [ discountCodes, setDiscountCodes ] = useState(useLoaderData());
    
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
            field: 'discountCode', headerName: '折扣碼', flex: 1,
            valueGetter: (params) => {
                return params.row.discountCode || '未設定';
            },
        }, {
            field: 'discountPersentage', headerName: '折扣比例', flex: 1,
            valueGetter: (params) => {
                return params.row.discountPersentage || '未設定';
            },
        }, {
            field: 'isActive', headerName: '是否啟用', flex: 1,
            valueGetter: (params) => {
                return params.row.isActive ? '✔️' : '❌';
            },
        }, {
            field: 'id', headerName: '', flex: 1,
            renderCell: (params) => {
                return (
                    <Button as={ Link } to={`${params.row.id}`}><PersonVcard /> 詳細</Button>
                );
            }
        }
    ];

    const onEnableButtonClick = (e) => {
        const db = getFirestore();
        rowSelection.forEach(async (id) => {
            await setDoc(doc(db, "discountCodes", id), {
                isActive: true,
            }, { merge: true });
            setDiscountCodes(discountCodes.map((discountCode) => {
                if (rowSelection.includes(discountCode.id)) discountCode.isActive = true;
                return discountCode;
            }));
        });
    };

    const onDisableButtonClick = (e) => {
        const db = getFirestore();
        rowSelection.forEach(async (id) => {
            await setDoc(doc(db, "discountCodes", id), {
                isActive: false,
            }, { merge: true });
            setDiscountCodes(discountCodes.map((discountCode) => {
                if (rowSelection.includes(discountCode.id)) discountCode.isActive = false;
                return discountCode;
            }));
        });
    };

    return (
    <div className="manage-discountCodes">
        <Row className="my-3">
            <Col sm={ 0 } lg={ 4 } xl={ 3 } />
            <Col sm={ 6 } lg={ 4 } xl={ 6 } className="text-center fs-1 fw-bold py-2">折扣碼管理</Col>
            <Col sm={ 6 } lg={ 4 } xl={ 3 }>
                <ButtonGroup className="d-flex my-3">
                    <Button as={ Link } to="create"><PersonAdd /> 新增</Button>
                    <Button id="enableBtn" variant="success" onClick={ onEnableButtonClick }><PersonCheck /> 啟用</Button>
                    <Button id="disableBtn" variant="danger" onClick={ onDisableButtonClick }><PersonSlash /> 停用</Button>
                </ButtonGroup>
            </Col>
        </Row>
        <DataGrid autoHeight
            rows={ discountCodes }
            columns={ tableColumns }
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={ newSelection => {
                setRowSelection(newSelection);
            } }
        />
    </div>
    );
};

export default ManageDiscountCodes;