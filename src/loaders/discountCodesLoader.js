import { getFirestore, collection, getDocs } from "firebase/firestore";

export const discountCodesLoader = async () => {
    const db = getFirestore();
    const usersSnapshot = await getDocs(collection(db, "discountCodes"));
    return usersSnapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        };
    });
};

export default discountCodesLoader;