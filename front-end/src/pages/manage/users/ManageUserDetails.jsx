import { Link, useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { ButtonGroup, Button, Card, Col, Row } from 'react-bootstrap';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

export const ManageUserDetails = () => {

    const { id } = useParams();
    const user = useLoaderData();
    const navagate = useNavigate();

    const handleButtonClick = async () => {
        const db = getFirestore();
        await setDoc(doc(db, "users", id), {
            isDisable: !user.isDisable,
        }, { merge: true });
        navagate('/manage/users');
    };

    return (
    <div className="manage-user-details">
        <Row className="my-3"><Col xs={3} />
        <Col xs={6}>
            <Card>
                <Card.Body>
                    <Card.Text>
                        使用者 ID: { user.id }<br />
                        使用者名稱: { user.displayName ? user.displayName : "---" }<br />
                        電子郵箱: { user.email ? user.email : "---" }<br />
                        電話號碼: { user.phoneNumber ? user.phoneNumber : "---" }<br />
                        地址: { user.address ? user.address : "---" }<br />
                    </Card.Text>

                    <ButtonGroup className='w-100'>
                        <Button as={ Link } to={ `edit/${id}` } variant="primary">編輯</Button>
                        { user.isDisable ?
                            <Button variant="success" onClick={ handleButtonClick }>啟用</Button> :
                            <Button variant="danger" onClick={ handleButtonClick }>停用</Button> }
                    </ButtonGroup>
                </Card.Body>
            </Card>
        </Col>
    <Col xs={3} /></Row>
    </div>
    );
};

export default ManageUserDetails;
