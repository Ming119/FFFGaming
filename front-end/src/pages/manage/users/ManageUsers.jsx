import { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Link, useLoaderData } from "react-router-dom";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { Button, ButtonGroup, Row, Col } from "react-bootstrap";
import { PersonAdd, PersonCheck, PersonSlash, PersonVcard } from "react-bootstrap-icons";

export const ManageUsers = () => {
    
    const [ rowSelection, setRowSelection ] = useState([]);
    const [ users, setUsers ] = useState(useLoaderData());
    
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
            field: 'email', headerName: '電郵', flex: 1,
            valueGetter: (params) => {
                return params.row.email || '未設定';
            },
        }, {
            field: 'emailVerified', headerName: '已驗證', flex: 1,
            valueGetter: (params) => {
                return params.row.emailVerified ? '✔️' : '❌';
            },
        }, {
            field: 'isAdmin', headerName: '管理員', flex: 1,
            valueGetter: (params) => {
                return params.row.isAdmin ? '✔️' : '❌';
            },
        }, {
            field: 'isDisable', headerName: '已停用', flex: 1,
            valueGetter: (params) => {
                return params.row.isDisable ? '✔️' : '❌';
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
            await setDoc(doc(db, "users", id), {
                isDisable: false,
            }, { merge: true });
            setUsers(users.map((user) => {
                if (rowSelection.includes(user.id)) user.isDisable = false;
                return user;
            }));
        });
    };

    const onDisableButtonClick = (e) => {
        const db = getFirestore();
        rowSelection.forEach(async (id) => {
            await setDoc(doc(db, "users", id), {
                isDisable: true,
            }, { merge: true });
            setUsers(users.map((user) => {
                if (rowSelection.includes(user.id)) user.isDisable = true;
                return user;
            }));
        });
    };

    return (
    <div className="manage-users">
        <Row className="my-3">
            <Col sm={ 0 } lg={ 4 } xl={ 3 } />
            <Col sm={ 6 } lg={ 4 } xl={ 6 } className="text-center fs-1 fw-bold py-2">會員管理</Col>
            <Col sm={ 6 } lg={ 4 } xl={ 3 }>
                <ButtonGroup className="d-flex my-3">
                    <Button as={ Link } to="create"><PersonAdd /> 新增</Button>
                    <Button id="enableBtn" variant="success" onClick={ onEnableButtonClick }><PersonCheck /> 啟用</Button>
                    <Button id="disableBtn" variant="danger" onClick={ onDisableButtonClick }><PersonSlash /> 停用</Button>
                </ButtonGroup>
            </Col>
        </Row>
        <DataGrid autoHeight
            rows={ users }
            columns={ tableColumns }
            pageSize={ 5 }
            rowsPerPageOptions={ [1] }
            onRowSelectionModelChange={ (newSelection) => {
                setRowSelection(newSelection);
            } }
            checkboxSelection
        />
    </div>
    );
};

export default ManageUsers;