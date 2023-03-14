import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { Table } from "../../../components/Table";

export const ManageUsers = () => {
    
    const [ selectedUsers, setSelectedUsers ] = useState([]);
    
    const users = useLoaderData();
    const tableColumns = [
        { key: '-', label: '選取' },
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
        <Table tableColumns={ tableColumns }
            tableData={ users }
            setSelected={ setSelectedUsers } />
    </div>
    );
};

export default ManageUsers;