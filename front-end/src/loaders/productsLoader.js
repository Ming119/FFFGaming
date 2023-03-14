import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const productsLoader = async () => {
    const db = getFirestore();
    const storage = getStorage();

    const productsSnapshot = await getDocs(collection(db, "products"));
    const products = productsSnapshot.docs.map(async (doc) => {
        const imageRef = ref(storage, `${doc.id}/0.jpg`);
        const imageUrl = await getDownloadURL(imageRef);
        return {
            ...doc.data(),
            id: doc.id,
            image: imageUrl,
        };
    });

    return Promise.all(products);
}

export default productsLoader;