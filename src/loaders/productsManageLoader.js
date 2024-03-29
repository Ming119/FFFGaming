import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getBlob } from "firebase/storage";

export const productsManageLoader = async () => {
    const db = getFirestore();
    const storage = getStorage();

    const productsSnapshot = await getDocs(collection(db, "products"));
    const products = productsSnapshot.docs.map(async (doc) => {

        const imageRef = ref(storage, `${doc.id}/0.jpg`);
        const blob = await getBlob(imageRef);
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        
        const imageUrl = await new Promise((resolve) => {
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
            };
        });
      
        return {
            ...doc.data(),
            id: doc.id,
            image: imageUrl,
        };
    });

    return Promise.all(products)
}

export default productsManageLoader;
