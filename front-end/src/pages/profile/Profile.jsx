import { Link, useLoaderData } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";


export const Profile = () => {

    const user = useLoaderData();
    
    return (
    <div className="profile"><Row className="my-5"><Col xs={3} />
        <Col xs={6}>
            <Card>
                <Card.Body>
                    <Card.Title className="text-center"><b>會員中心</b></Card.Title>
                    <Card.Text>

                        <p>使用者名稱: { user.displayName ? user.displayName : "---" }</p>
                        <p>電子郵箱: { user.email ? user.email : "---" }</p>
                        <p>電話號碼: { user.phoneNumber ? user.phoneNumber : "---" }</p>
                    </Card.Text>
                </Card.Body>
                
                <Button as={ Link } to="edit">更改資料</Button>
            </Card>
        </Col>
    <Col xs={3} /></Row></div>
    );
};

export default Profile;
