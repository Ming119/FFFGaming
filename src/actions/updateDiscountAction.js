import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

export const updateDiscountAction = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const discountCode = formData.get('discountCode');
  const discountPersentage = formData.get('discountPersentage');
  const isActive = formData.get('isActive');

  if (!discountCode) return { message: "Discount code is required.", variant: "danger" };

  const docRef = doc(getFirestore(), "discountCodes", id);
  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) return { message: "Discount code does not exist.", variant: "danger" };

  await setDoc(docRef, {
    discountCode: discountCode,
    discountPersentage: discountPersentage,
    isActive: isActive === "on" ? true : false,
  });

  return { message: "Discount code updated successfully.", variant: "success" };
};

export default updateDiscountAction;
