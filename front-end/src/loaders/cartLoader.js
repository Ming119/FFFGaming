import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getBlob } from 'firebase/storage';

export const cartLoader = async () => {
    const auth = getAuth();
    const storage = getStorage();

    if (!auth.currentUser) {
        return [];
    }
    
    const userId = auth.currentUser.uid;

    const db = getFirestore();
    const user = await getDoc(doc(db, "users", userId));
    const cart = user.data().cart;

    if (!cart || cart.length === 0)return [];

    const data = cart.map(async (item) => {

        const imageRef = ref(storage, `${item.productId}/0.jpg`);
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
            ...item,
            image: imageUrl,
        };
    });
    
    return Promise.all(data);
};

export default cartLoader;
