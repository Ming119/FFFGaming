import { getFirestore, collection, getDocs } from "firebase/firestore";

export const ordersLoader = async () => {
    const db = getFirestore();

    const ordersSnapshot = await getDocs(collection(db, "orders"));
    return ordersSnapshot.docs.map((doc) => {
        return {
            ...doc.data(),
            id: doc.data().orderNo,
        };
    });
};

export default ordersLoader;
