import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import { CaretLeftFill } from 'react-bootstrap-icons';

export const ManageUserLayout = () => {
    
    const location = useLocation();

    return (
    <div className="manage-users-layout">
        <Row className="my-3">
            <Col xs={2}>
                { location.pathname.split("/").length > 3 && 
                    <Button as={ Link } to={ location.pathname.split("/").slice(0, -1).join("/") } variant="outline-primary" size="sm">
                        <CaretLeftFill />返回
                    </Button> }
            </Col>
            <Col xs={8} className="text-center fs-1 fw-bold">會員管理</Col>
            <Col xs={2} />
        </Row>

        <Outlet />
    </div>
    );
};

export default ManageUserLayout;