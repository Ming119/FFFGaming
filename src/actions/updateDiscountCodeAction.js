import { redirect } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export const updateDiscountCodeAction = async ({ request }) => {

    const data = await request.formData();

    const id = data.get('id');
    const discountPersentage = data.get('discountPersentage');

    if (!discountPersentage) return { message: "DiscountPersentage is required.", variant: "danger" };

    const db = getFirestore();
    await setDoc(doc(db, "discountCodes", id), {
        discountPersentage,
    }, { merge: true });

    return redirect("/manage/discountcodes");
};

export default updateDiscountCodeAction;