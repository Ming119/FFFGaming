import { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router';
import { FloatingLabel } from "../../components/FloatingLabel";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import sha1 from "js-sha1";

export const Checkout = () => {
  const webNo = "A980016741";
  const navigate = useNavigate();
  const location = useLocation();
  const time = location.state && location.state.time;
  const totalPrice = location.state && location.state.totalPrice;
  const rowSelection = location.state && location.state.rowSelection;
  const user = JSON.parse(localStorage.getItem('user'));
  const orderNo = sha1(user.id + time);
  const [ passCode, setPassCode ] = useState("");
  const [ payType, setPayType ] = useState("00");
  const [ receiverID, setReceiverID ] = useState("");
  const [ receiverTel, setReceiverTel ] = useState("");
  const [ receiverName, setReceiverName ] = useState("");
  const [ receiverNote, setReceiverNote ] = useState("");
  const [ receiverEmail, setReceiverEmail ] = useState("");
  const [ receiverAddress, setReceiverAddress ] = useState("");

  const onFormChange = () => {
    setPassCode(sha1(webNo + orderNo + totalPrice + "Xraypad520"));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log(e.target);
    const db = getFirestore();
    const auth = getAuth();
    const orderRef = doc(db, "orders", orderNo);
    const order = {
      user: auth.currentUser.uid,
      orderNo: orderNo,
      time: time,
      state: "0",
      payType: payType,
      totalPrice: totalPrice,
      OrderInfo: rowSelection,
      receiverID: receiverID,
      receiverTel: receiverTel,
      receiverNote: receiverNote,
      receiverName: receiverName,
      receiverEmail: receiverEmail,
      receiverAddress: receiverAddress,
    };
    setDoc(orderRef, order);

    if (payType == "00") navigate("/checkout/success");
    else e.currentTarget.submit();
  }

  return (
    <div className='checkout'>
      <Row className="my-3">
        <Col className="text-center fs-1 fw-bold">Checkout</Col>
      </Row>

      <hr />

      <h2>付款方式</h2>
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="PayType" id="payType_COD" defaultChecked 
          onClick={ _ => setPayType("00") }/>
        <label className="form-check-label" htmlFor="payType_COD">貨到付款</label>
      </div>
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="PayType" id="payType_creditCard"
          onClick={ _ => setPayType("01") }/>
        <label className="form-check-label" htmlFor="payType_creditCard">信用卡</label>
      </div>

      <hr />

      <Form action={ payType === "01" ? 'https://test.paynow.com.tw/service/etopm.aspx' : '' }
        method="POST" onChange={ onFormChange } onSubmit={ e => onFormSubmit(e) }>
        <input type="hidden" name="WebNo" value={ webNo } />
        <input type="hidden" name="ECPlatform" value="FFFGaming" />
        <input type="hidden" name="EPT" value="01" />
        <input type="hidden" name="OrderNo" value={ orderNo } />
        <input type="hidden" name="TotalPrice" value={ totalPrice } />
        <input type="hidden" name="PassCode" value={ passCode } />
        <input type="hidden" name="OrderInfo" value={ rowSelection } />
        <input type="hidden" name="PayType" value={ payType } />

        <h2>送貨資訊</h2>
        <FloatingLabel name="ReceiverName" label="收件人姓名" type="text" placeholder="請輸入收件人姓名"
          onChange={ e => setReceiverName(e.target.value) } value={ receiverName } />
        <FloatingLabel name="ReceiverAddress" label="收件人地址" type="text" placeholder="請輸入收件人地址"
          onChange={ e => setReceiverAddress(e.target.value) } value={ receiverAddress } />
        <FloatingLabel name="ReceiverID" label="收件人身分證字號" type="text" placeholder="請輸入收件人身分證字號"
          onChange={ e => setReceiverID(e.target.value) } value={ receiverID } />
        <FloatingLabel name="ReceiverTel" label="收件人電話" type="tel" placeholder="請輸入收件人電話"
          onChange={ e => setReceiverTel(e.target.value) } value={ receiverTel } />
        <FloatingLabel name="ReceiverEmail" label="收件人電子信箱" type="email" placeholder="請輸入收件人電子信箱"
          onChange={ e => setReceiverEmail(e.target.value) } value={ receiverEmail } />

        <hr />
        <h2>備註</h2>
        <FloatingLabel name="Note1" label="備註" type="text" placeholder="請輸入備註"
          onChange={ e => setReceiverNote(e.target.value) } value={ receiverNote } />
        
        <Row className='my-3'>
          <Button variant="primary" type='submit'>送出</Button>
        </Row>
      </Form>
    </div>
  );
};

export default Checkout;
