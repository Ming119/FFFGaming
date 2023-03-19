import { Link, useLoaderData } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";

export const Profile = () => {

    const user = useLoaderData();
    
    return (
    <div className="profile"><Row className="my-5"><Col xs={3} />
        <Col xs={6}>
            <Card>
                <Card.Body>
                    <Card.Title className="text-center fw-bold">會員中心</Card.Title>
                    <Card.Text>
                        使用者名稱: { user.displayName ? user.displayName : "---" }<br />
                        電子郵箱: { user.email ? user.email : "---" }<br />
                        電話號碼: { user.phoneNumber ? user.phoneNumber : "---" }<br />
                        地址: { user.address ? user.address : "---" }<br />
                    </Card.Text>
                </Card.Body>
                
                <Button as={ Link } to="edit">更改資料</Button>
            </Card>
        </Col>
    <Col xs={3} /></Row></div>
    );
};

export default Profile;
