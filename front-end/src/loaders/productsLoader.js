import { getFirestore, collection, getDocs } from "firebase/firestore";

export const productsLoader = async () => {
    const db = getFirestore();
    const productsSnapshot = await getDocs(collection(db, "products"));
    return productsSnapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        };
    });
}

export default productsLoader;