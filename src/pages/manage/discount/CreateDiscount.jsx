import { useState } from 'react';
import { Form } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { FloatingLabel } from '../../../components/FloatingLabel';

export const CreateDiscount = () => {
  const [discountPersentage, setDiscountPersentage] = useState(100);

  const onDiscountPersentageChange = e => setDiscountPersentage(e.target.value);

  return (
    <div>
      <Form method="POST">
        <FloatingLabel type="text" name="discountCode" id="discountCode" label="優惠碼" />
        
        <label htmlFor="discountPersentage" className="form-label">折扣比例</label>
        <input type="range" className="form-range" id="discountPersentage" name="discountPersentage"
          min="1" max="100" step="1" value={ discountPersentage }
          onChange={ onDiscountPersentageChange }></input>
        <div className="form-text">目前折扣比例為 <span id="discountPersentageValue">{ discountPersentage }</span>%</div>

        <Button variant="success" type="submit">送出</Button>
      </Form>
    </div>
  );
};

export default CreateDiscount;
