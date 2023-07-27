import { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Form, useNavigate, useLoaderData } from "react-router-dom";
import { FloatingLabel } from "../../../components/FloatingLabel";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

export const ManageDiscountDetails = () => {
  const discount = useLoaderData();
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
      setIsEditabled(!isEditabled);
    }
  };

  const deleteDiscount = async _ => await deleteDoc(doc(getFirestore(), 'discountCodes', discount.discountCode));
  const onDeleteBtnClick = _ => {
    if (window.confirm('確定要刪除嗎？'))
      deleteDiscount().then(_ => navigate('/manage/discounts'));
  };

  return (
    <Form method="POST">
      <input type="hidden" name="id" id="id" value={ discount.id } />
      
      <FloatingLabel type="text" name="discountCode" id="discountCode" label="優惠碼"
        disabled={ !isEditabled } value={ discountCode } onChange={ onDiscountCodeChange }/>

      <label htmlFor="discountPersentage" className="form-label">折扣比例</label>
      <input type="range" className="form-range" id="discountPersentage" name="discountPersentage"
        min="1" max="100" step="1" value={ discountPersentage } disabled={ !isEditabled }
        onChange={ onDiscountPersentageChange }></input>
      <div className="form-text">目前折扣比例為 <span id="discountPersentageValue">{ discountPersentage }</span>%</div>

      <div className="form-check">
        <input className="form-check-input" type="checkbox" id="isActive" name="isActive"
        onChange={ onIsActiveCheckboxChange } checked={ isActive } />
        <label className="form-check-label" htmlFor="isActive">可用</label>
      </div>

      <ButtonGroup className="mb-3">
        { isEditabled ?
          <Button type="submit" variant="success" onClick={ onEditOrSaveBtnClick }>儲存</Button> :
          <Button type="submit" variant="primary" onClick={ onEditOrSaveBtnClick }>編輯</Button>
        }
        <Button variant="danger" onClick={ onDeleteBtnClick }>刪除</Button>
      </ButtonGroup>
    </Form>
  );
};

export default ManageDiscountDetails;