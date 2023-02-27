import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { Table } from "../../../components/Table";

export const ManageUsers = () => {
    
    const [ selectedUsers, setSelectedUsers ] = useState([]);
    
    const users = useLoaderData();
    const tableColumns = [
        { key: '-', label: '' },
        { key: 'email', label: '電郵' },
        { key: 'phoneNumber', label: '電話' },
        { key: 'emailVerified', label: '已驗證' },
        { key: 'isAdmin', label: '管理員' },
        { key: 'isDisable', label: '已停用' },
        { key: '/', label: '' ,}
        // { key: 'actions', label: '操作' },
    ];

    useEffect(() => {
        if (selectedUsers.length > 0) {
            
        }
    }, [selectedUsers]);

    return (
        <div className="manage-users">
            <Row className="my-3">
                <Col xs={ 2 } />
                <Col className="text-center"><h1><b>會員管理</b></h1></Col>
                <Col xs={ 2 } />
            </Row>

            <Table tableColumns={ tableColumns }
                tableData={ users }
                setSelected={ setSelectedUsers }
            />
        </div>
    );
};

export default ManageUsers;