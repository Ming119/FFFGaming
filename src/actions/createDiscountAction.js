import { getFirestore, getDocs, addDoc, collection } from "firebase/firestore";
import { redirect } from "react-router-dom";

export const createDiscountAction = async ({ request }) => {
  const formData = await request.formData();
  const discountCode = formData.get('discountCode');
  const discountPersentage = formData.get('discountPersentage');

  if (!discountCode) return { message: "Discount code is required.", variant: "danger" };

  const discountCodesRef = collection(getFirestore(), "discountCodes");
  const discountCodesSnap = await getDocs(discountCodesRef);
  discountCodesSnap.forEach((doc) => {
    if (doc.id === discountCode) return { message: "Discount code already exists.", variant: "danger" };
  });

  await addDoc(discountCodesRef, {
    discountCode: discountCode,
    discountPersentage: discountPersentage,
    isActive: true,
  });
  return redirect('/manage/discounts');
};

export default createDiscountAction;
