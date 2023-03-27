import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

export const updateProfileAction = async ({ request }) => {
    const data = await request.formData();
    
    const id = data.get("id");

    if (!id) return { message: 'Unknown error, please refresh and try later.', variant: 'danger' };

    if (!data.has("email")) {
        const auth = getAuth();
        const email = auth.currentUser.email;

        const respone = sendPasswordResetEmail(auth, email, {url: "http://localhost:3000"})
        .then(() => {
            return { message: `密碼重置電子郵件已發送至${email}`, variant: "success" }
        }).catch(error => {
            switch (error.code) {
                case 'auth/invalid-email':
                    return { message: "Invalid email.", variant: "danger" };
                
                case 'auth/user-not-found':
                    return { message: "User not found.", variant: "danger" };
                
                default:
                    return { message: "Unknown error.", variant: "danger" };
            }
        });

        return respone;
    }

    const email = data.get('email');
    const displayName = data.get('name');
    const phoneNumber = data.get('phoneNumber');
    const address = data.get('address');

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

export default updateProfileAction;
