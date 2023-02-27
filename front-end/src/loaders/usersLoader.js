import { getFirestore, collection, getDocs } from "firebase/firestore";

export const usersLoader = async () => {
    const db = getFirestore();
    const usersSnapshot = await getDocs(collection(db, "users"));
    return usersSnapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        };
    });
};

export default usersLoader;