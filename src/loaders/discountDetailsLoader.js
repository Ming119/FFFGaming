import { getFirestore, doc, getDoc } from "firebase/firestore";

export const discountDetailsLoader = async ({ params }) => {
  const { id } = params;
  
  const db = getFirestore();
  const docSnap = await getDoc(doc(db, "discountCodes", id));

  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
};

export default discountDetailsLoader;