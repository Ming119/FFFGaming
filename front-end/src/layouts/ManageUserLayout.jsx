import { Outlet } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

export const ManageUserLayout = () => {
    
    return (
    <div className="manage-users-layout">
        <Row className="my-3">
            <Col xs={2} />
            <Col xs={8} className="text-center fs-1 fw-bold">會員管理</Col>
            <Col xs={2} />
        </Row>

        <Outlet />
    </div>
    );
};

export default ManageUserLayout;