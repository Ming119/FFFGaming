import { doc, getDoc, getFirestore } from "firebase/firestore";

export const orderDetailsLoader = async ({ params }) => {
    const { id } = params;

    const db = getFirestore();
    const orderDetails = await getDoc(doc(db, "orders", id));   

    return orderDetails.data();
};

export default orderDetailsLoader;
