import { getFirestore, doc, getDoc } from "firebase/firestore";

export const productDetailsLoader = async ({ params }) => {
    const { id } = params;

    const db = getFirestore();
    const productSnapshot = await getDoc(doc(db, "products", id));
    return {
        id,
        ...productSnapshot.data(),
    };
};

export default productDetailsLoader;
