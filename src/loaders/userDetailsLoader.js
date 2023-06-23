import { getFirestore, getDoc, doc } from "firebase/firestore";

export const userDetailsLoader = async ({ params }) => {

    let { id } = params;
    if (!id) id = JSON.parse(localStorage.getItem("user")).id;

    const db = getFirestore();
    const userDoc = await getDoc(doc(db, "users", id));
    
    return {
        id,
        ...userDoc.data(),
    };
};

export default userDetailsLoader;
