import { getFirestore, setDoc, doc } from "firebase/firestore";

export const updateUserAction = async ({ request }) => {
    const data = await request.formData();
    
    const id = data.get('id');
    const email = data.get('email');
    const displayName = data.get('name');
    const phoneNumber = data.get('phoneNumber');
    const address = data.get('address');

    if (!id) return { message: 'Unknown error, please refresh and try later.', variant: 'danger' };
    if (!email) return { message: 'Email is required', variant: 'danger' };

    const db = getFirestore();
    await setDoc(doc(db, "users", id), {
        email,
        displayName,
        phoneNumber,
        address
    }, { merge: true });

    return { message: 'User updated successfully', variant: 'success' };
};

export default updateUserAction;