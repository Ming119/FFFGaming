import { getFirestore, collection, getDocs } from "firebase/firestore";

export const discountsLoader = async ({ params }) => {
  const db = getFirestore();

  const discountsSnapshot = await getDocs(collection(db, "discountCodes"));
  return discountsSnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });
};

export default discountsLoader;
