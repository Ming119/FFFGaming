import { useState, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Form, useLocation } from 'react-router-dom';
import { FloatingLabel } from "../../components/FloatingLabel";
import sha1 from "js-sha1";

const _711data = require("../../storeData/7-11_store.json");
const _familydata = require("../../storeData/family_store.json");

export const Checkout = () => {
  const location = useLocation();
  const time = location.state && location.state.time;
  const totalPrice = location.state && location.state.totalPrice;
  const products = location.state && location.state.products;
  const discountCode = location.state && location.state.discountCode;
  const user = JSON.parse(localStorage.getItem('user'));
  const orderNo = sha1(user.id + time);

  const [ payType, setPayType ] = useState("00");
  const [ pickupType, setPickupType ] = useState("711");

  const [ storeData, setStoreData ] = useState(_711data);
  const [ city, setCity ] = useState("縣市");
  const [ district, setDistrict ] = useState("行政區");
  const [ districtList, setDistrictList ] = useState([]);
  const [ store, setStore ] = useState("門市");
  const [ storeList, setStoreList ] = useState([]);

  const onCitySelect = e => {
    setCity(e.target.value);
    setDistrictList(Object.keys(storeData[e.target.value]));
  }

  const onDistrictSelect = e => {
    setDistrict(e.target.value);
    setStoreList(storeData[city][e.target.value]);
  }

  const onStoreSelect = e => { setStore(e.target.value); }

  const StoreSelection = () => {
    const cityList = Object.keys(storeData);

    return (
      <div>
        <h2>取貨門市</h2>
        <Row className='my-3'>
          <Col>
            <select className="form-select" onChange={ onCitySelect } value={ city }>
              <option disabled>縣市</option>
              { cityList.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              )) }
            </select>
          </Col>
          <Col>
            { city !== "縣市" &&
              <select className="form-select" onChange={ onDistrictSelect } value={ district }>
                <option disabled>行政區</option>
                { districtList.map((district, index) => (
                  <option key={index} value={district}>{district}</option>
                )) }
              </select> }
          </Col>
        </Row>
        
        { city !== "縣市" && district !== "行政區" &&
          <select name="receiveStore" className="form-select" onChange={ onStoreSelect } value={ store }>
            <option disabled>門市</option>
            { storeList.map((store, index) => (
              <option key={index} value={store.店號}>{store.店號} {store.店名} {store.地址}</option>
            )) }
          </select> }
      </div>
    );
  }

  useEffect(() => {
    setCity("縣市");
    setDistrict("行政區");
    setStore("門市");
    setDistrictList([]);
    setStoreList([]);

    if (pickupType === "711")
      setStoreData(_711data);
    else if (pickupType === "family")
      setStoreData(_familydata);
  }, [pickupType]);

  return (
    <div className='checkout'>
      <Row className="my-3">
        <Col className="text-center fs-1 fw-bold">Checkout</Col>
      </Row>

      <hr />

      <Row>
        <Col>
        <h2>付款方式</h2>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="payType" id="payType_COD"
              onClick={ _ => setPayType("00") } defaultChecked/>
            <label className="form-check-label" htmlFor="payType_COD">貨到付款</label>
          </div>
          {/* <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="payType" id="payType_creditCard"
              onClick={ _ => setPayType("01") } value="01" />
            <label className="form-check-label" htmlFor="payType_creditCard">信用卡</label>
          </div> */}
        </Col>
        <Col>
          <h2>取貨方式</h2>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="pickupType" id="pickupType_store711"
              onClick={ _ => setPickupType("711") } defaultChecked/>
            <label className="form-check-label" htmlFor="pickupType_store">7-11超商取貨</label>
          </div>
          <div className='form-check form-check-inline'>
            <input className="form-check-input" type="radio" name="pickupType" id="pickupType_storeFamily"
              onClick={ _ => setPickupType("family") } />
            <label className="form-check-label" htmlFor="pickupType_store">全家超商取貨</label>
          </div>
          {/* <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="pickupType" id="pickupType_home" />
            <label className="form-check-label" htmlFor="pickupType_home">宅配</label>
          </div> */}
        </Col>
      </Row>

      <hr />

      <Form method="POST">
        <input type="hidden" name="orderNo" value={ orderNo } />
        <input type="hidden" name="totalPrice" value={ totalPrice } />
        <input type="hidden" name="discountCode" value={ discountCode } />
        <input type="hidden" name="PayType" value={ payType } />
        <input type="hidden" name="PickupType" value={ pickupType } />
        { products.map((item, index) => (
          <input key={index} type="hidden" name="products" value={ JSON.stringify(item) } />
        )) }

        <StoreSelection />

        <Row className='my-3'>
          <Col xs={6}>
            <FloatingLabel name="receiverName" label="取件人姓名" type="text" placeholder="請輸入取件人姓名" />
          </Col>
          <Col xs={6}>
            <FloatingLabel name="receiverTel" label="取件人手機" type="tel" placeholder="請輸入取件人手機" />
          </Col>
          <Col xs={6}>
            <FloatingLabel name="receiverEmail" label="取件人Email" type="tel" placeholder="請輸入取件人Email" />
          </Col>
          <Col xs={6}>
            <FloatingLabel name="receiverNote" label="備註" type="text" placeholder="請輸入備註" />
          </Col>
        </Row>
        
        <Row className='my-3'>
          <Button variant="primary" type='submit'>送出</Button>
        </Row>
      </Form>
    </div>
  );
};

export default Checkout;
