import { redirect } from "react-router-dom";
import { handleSignInWithEmailAndPassword } from "../firebase";

export const signInAction = async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    const userCredential = await handleSignInWithEmailAndPassword(email, password)
    .catch(error => {
        switch (error.code) {
            case 'auth/invalid-email':
                return { error: "Invalid email." };
            
            case 'auth/user-disabled':
                return { error: "User disabled." };

            case 'auth/user-not-found':
                return { error: "User not found." };
            
            case 'auth/wrong-password':
                return { error: "Wrong password." };
            
            default:
                return { error: "Unknown error." };
        }
    });

    if (userCredential.error) return userCredential;
    
    return redirect('/');
};

export default signInAction;