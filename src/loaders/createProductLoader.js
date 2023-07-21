import { getFirestore, collection, getDocs } from "firebase/firestore";

export const createProductsLoader = async () => {
    const db = getFirestore();

    const categoriesSnapshot = await getDocs(collection(db, "category"));
    const categories = categoriesSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));

    return categories;
}

export default createProductsLoader;