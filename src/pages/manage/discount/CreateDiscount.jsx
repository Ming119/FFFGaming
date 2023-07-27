import { useState } from 'react';
import { Form, Link } from 'react-router-dom'
import { CaretLeftFill } from 'react-bootstrap-icons';
import { Button, Row, Col, Card } from 'react-bootstrap';
import { FloatingLabel } from '../../../components/FloatingLabel';

export const CreateDiscount = () => {
  const [discountPersentage, setDiscountPersentage] = useState(100);

  const onDiscountPersentageChange = e => setDiscountPersentage(e.target.value);

  return (
    <Form method="POST">
      <Row className="my-3">
        <Col xs={ 2 }>
          <Button as={ Link } to=".." variant="outline-primary" size="sm" className='my-3'>
            <CaretLeftFill />返回
          </Button>
        </Col>

        <Col xs={ 8 }>
          <Card>
            <Card.Body>
              <Card.Title className="text-center fs-1 fw-bold">新增優惠碼</Card.Title>
              <hr />
              
              <Row>
                <Col><FloatingLabel type="text" name="discountCode" id="discountCode" label="優惠碼" /></Col>
                <Col className='my-3'>
                <label htmlFor="discountPersentage" className="form-label">折扣比例 : { discountPersentage } %</label>
                <input type="range" className="form-range" id="discountPersentage" name="discountPersentage"
                  min="1" max="100" step="1" value={ discountPersentage }
                  onChange={ onDiscountPersentageChange } />
                </Col>
              </Row>

              <Row className='mx-auto my-3'><Button variant="success" type="submit">送出</Button></Row>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={ 2 } />
      </Row>
    </Form>
  );
};

export default CreateDiscount;
