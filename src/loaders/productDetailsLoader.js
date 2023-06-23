import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getBlob, listAll } from "firebase/storage";

export const productDetailsLoader = async ({ params }) => {
    const { id } = params;

    const db = getFirestore();
    const storage = getStorage();

    const productSnapshot = await getDoc(doc(db, "products", id));
    const folderRef = ref(storage, `${id}`);
    
    const { items } = await listAll(folderRef);
    const images = await Promise.all(items.map(async (itemRef) => {
        const blob = await getBlob(itemRef);
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise((resolve) => {
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
            };
        });
    }));

    return {
        id,
        images,
        ...productSnapshot.data(),
    };
};

export default productDetailsLoader;
