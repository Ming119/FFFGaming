import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";

export const productDetailsLoader = async ({ params }) => {
    const { id } = params;

    const db = getFirestore();
    const storage = getStorage();

    const productSnapshot = await getDoc(doc(db, "products", id));
    const folderRef = ref(storage, `${id}`);
    
    const { items } = await listAll(folderRef);
    const images = await Promise.all(items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return url;
    }));

    return {
        id,
        images,
        ...productSnapshot.data(),
    };

    
};

export default productDetailsLoader;
