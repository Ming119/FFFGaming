import { redirect } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const signInAction = async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    .catch(error => {
        switch (error.code) {
            case 'auth/invalid-email':
                return { error: "Invalid email.", variant: "danger" };
            
            case 'auth/user-disabled':
                return { error: "User disabled.", variant: "danger" };

            case 'auth/user-not-found':
                return { error: "User not found.", variant: "danger" };
            
            case 'auth/wrong-password':
                return { error: "Wrong password.", variant: "danger" };
            
            default:
                return { error: "Unknown error.", variant: "danger" };
        }
    });

    if (userCredential.error) return userCredential;
    
    return redirect('/');
};

export default signInAction;