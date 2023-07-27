import { useEffect, useState } from "react";
import { CaretLeftFill } from 'react-bootstrap-icons';
import { FloatingLabel } from "../../../components/FloatingLabel";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { Button, ButtonGroup, Row, Col, Card } from "react-bootstrap";
import { Link, Form, useNavigate, useLoaderData, useActionData } from "react-router-dom";

export const ManageDiscountDetails = () => {
  const discount = useLoaderData();
  const actionData = useActionData();
  const navigate = useNavigate();

  const [ discountCode, setDiscountCode ] = useState(discount.discountCode);
  const [ discountPersentage, setDiscountPersentage ] = useState(discount.discountPersentage);
  const [ isActive, setIsActive ] = useState(discount.isActive);
  const [ isEditabled, setIsEditabled ] = useState(false);

  const onDiscountCodeChange = e => setDiscountCode(e.target.value);
  const onDiscountPersentageChange = e => setDiscountPersentage(e.target.value);
  const onIsActiveCheckboxChange = e => setIsActive(e.target.checked);

  const onEditOrSaveBtnClick = e => {
    if (!isEditabled) {
      e.preventDefault();
      setIsEditabled(true);
    }
  };

  const deleteDiscount = async _ => await deleteDoc(doc(getFirestore(), 'discountCodes', discount.discountCode));
  const onDeleteBtnClick = _ => {
    if (window.confirm('確定要刪除嗎？'))
      deleteDiscount().then(_ => navigate('/manage/discounts'));
  };

  useEffect(_ => {
    if (actionData && actionData.variant === 'success')
      setIsEditabled(false);
  }, [ actionData ]);

  return (
    <Form method="POST">
      <input type="hidden" name="id" id="id" value={ discount.id } />
      
      <Row className="my-3">
        <Col xs={ 2 }>
          <Button as={ Link } to=".." variant="outline-primary" size="sm" className='my-3'>
            <CaretLeftFill />返回
          </Button>
        </Col>

        <Col xs={ 8 }>
          <Card>
            <Card.Body>
              <Card.Title className="text-center fs-1 fw-bold">優惠碼詳情</Card.Title>
              <hr />

              <Row>
                <Col>
                  <FloatingLabel type="text" name="discountCode" id="discountCode" label="優惠碼"
                    disabled={ !isEditabled } value={ discountCode } onChange={ onDiscountCodeChange }/>
                </Col>
                <Col className="my-3">
                  <label htmlFor="discountPersentage" className="form-label">折扣比例 : { discountPersentage } %</label>
                  <input type="range" className="form-range" id="discountPersentage" name="discountPersentage"
                    min="1" max="100" step="1" value={ discountPersentage } disabled={ !isEditabled }
                    onChange={ onDiscountPersentageChange } />
                </Col>
              </Row>

              <Row className="mx-auto my-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="isActive" name="isActive"
                    onChange={ onIsActiveCheckboxChange } checked={ isActive } disabled={ !isEditabled } />
                  <label className="form-check-label" htmlFor="isActive">可用</label>
                </div>
              </Row>

              <Row className='mx-auto my-3'>
                <ButtonGroup className="mb-3">
                  { isEditabled ?
                    <Button type="submit" variant="success" onClick={ onEditOrSaveBtnClick }>儲存</Button> :
                    <Button type="submit" variant="primary" onClick={ onEditOrSaveBtnClick }>編輯</Button>
                  }
                  <Button variant="danger" onClick={ onDeleteBtnClick }>刪除</Button>
                </ButtonGroup>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={ 2 } />
      </Row>
    </Form>
  );
};

export default ManageDiscountDetails;
