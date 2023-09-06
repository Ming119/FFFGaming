import { getFirestore, doc, getDoc } from "firebase/firestore";

export const discountCodeDetailsLoader = async ({ params }) => {
    const { id } = params;

    const db = getFirestore();

    const productSnapshot = await getDoc(doc(db, "discountCodes", id));

    return {
        id,
        ...productSnapshot.data(),
    };
};

export default discountCodeDetailsLoader;
