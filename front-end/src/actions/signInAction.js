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
                return { message: "Invalid email.", variant: "danger" };
            
            case 'auth/user-disabled':
                return { message: "User disabled.", variant: "danger" };

            case 'auth/user-not-found':
                return { message: "User not found.", variant: "danger" };
            
            case 'auth/wrong-password':
                return { message: "Wrong password.", variant: "danger" };
            
            default:
                return { message: "Unknown error.", variant: "danger" };
        }
    });

    if (userCredential.error) return userCredential;
    
    return redirect('/');
};

export default signInAction;