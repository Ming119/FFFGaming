import { redirect } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export const createDiscountCodeAction = async ({ request }) => {
    const data = await request.formData();

    const discountCode = data.get('discountCode');
    const discountPersentage = data.get('discountPersentage');
    const isActive = data.get('isActive');

    if (!discountCode) return { message: "DiscountCode is required.", variant: "danger" };
    if (!discountPersentage) return { message: "DiscountPersentage is required.", variant: "danger" };

    const db = getFirestore();
    await addDoc(collection(db, "discountCodes"), {
        discountCode,
        discountPersentage,
        isActive,
    });

    return redirect("/manage/discountCodes");
};

export default createDiscountCodeAction;