import { Link, useParams, useLoaderData } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';

export const ManageUserDetails = () => {

    const { id } = useParams();
    const user = useLoaderData();

    return (
    <div className="manage-user-details">
        <Row className="my-3"><Col xs={3} />
        <Col xs={6}>
            <Card>
                <Card.Body>
                    <Card.Text>
                        <p>使用者 ID: { user.id }</p>
                        <p>使用者名稱: { user.displayName ? user.displayName : "---" }</p>
                        <p>電子郵箱: { user.email ? user.email : "---" }</p>
                        <p>電話號碼: { user.phoneNumber ? user.phoneNumber : "---" }</p>
                    </Card.Text>
                </Card.Body>
                
                <Button as={ Link } to="edit">更改資料</Button>
            </Card>
        </Col>
    <Col xs={3} /></Row>
    </div>
    );
};

export default ManageUserDetails;