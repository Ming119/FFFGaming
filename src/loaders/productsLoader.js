import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getBlob } from "firebase/storage";

export const productsLoader = async () => {
    const db = getFirestore();
    const storage = getStorage();

    const categoriesSnapshot = await getDocs(collection(db, "category"));
    const categories = categoriesSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));

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

    return {
        categories,
        products: await Promise.all(products),
    };
}

export default productsLoader;