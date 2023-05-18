import { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { FloatingLabel } from "../components/FloatingLabel";
import sha1 from "js-sha1";

export const Checkout = () => {
  const location = useLocation();

  const checkoutItems = location.state && location.state.checkoutItems;
  
  const [ receiverID, setReceiverID ] = useState("");
  const [ passCode, setPassCode ] = useState("");
  
  const generateOrderNo = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const itemsId = checkoutItems.map(item => item.id).join("");
    return sha1(user.id + itemsId);
  };
  const orderNo = generateOrderNo();
  const webNo = "A980016741";
  const totalPrice = checkoutItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  const onFormChange = (e) => {
    setPassCode(sha1(webNo + orderNo + totalPrice + "Xraypad520"));
  };

  return (
    <div className='checkout'>
      <Row className="my-3">
        <Col className="text-center fs-1 fw-bold">Checkout</Col>
      </Row>

      <hr />

      {/* TODO :  */}
      <h2>訂單明細</h2>
      <table>
        <thead>
          <tr>
            <th>商品名稱</th>
            <th>商品價格</th>
            <th>商品數量</th>
            <th>商品小計</th>
          </tr>
        </thead>
        <tbody>
          {checkoutItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />
      
      <h2>付款方式</h2>
      <Form action='https://test.paynow.com.tw/service/etopm.aspx' method="POST" onChange={ onFormChange } >
        <input type="hidden" name="WebNo" value={ webNo } />
        <input type="hidden" name="ECPlatform" value="FFFGaming" />
        <input type="hidden" name="EPT" value="01" />
        <input type="hidden" name="OrderNo" value={ orderNo } />
        <input type="hidden" name="TotalPrice" value={ totalPrice } />
        <input type="hidden" name="PassCode" value={ passCode } />
        <input type="hidden" name="OrderInfo" value={ orderNo } />

        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="PayType" id="payType_creditCard" value="01" defaultChecked />
          <label className="form-check-label" htmlFor="payType_creditCard">信用卡</label>
        </div>

        {/* <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="PayType" id="payType_store" />
          <label className="form-check-label" htmlFor="payType_store">超商</label>
        </div> */}
        
        <FloatingLabel name="ReceiverName" label="收件人姓名" type="text" placeholder="請輸入收件人姓名" />
        <FloatingLabel name="ReceiverID" label="收件人身分證字號" type="text" placeholder="請輸入收件人身分證字號"
          onChange={ e => setReceiverID(e.target.value) } value={ receiverID } />
        <FloatingLabel name="ReceiverTel" label="收件人電話" type="tel" placeholder="請輸入收件人電話" />
        <FloatingLabel name="ReceiverEmail" label="收件人電子信箱" type="email" placeholder="請輸入收件人電子信箱" />

        <Row className='my-3'>
          <Button variant="primary" type='submit'>送出</Button>
        </Row>
      </Form>
    </div>
  );
};

export default Checkout;
