import { redirect } from "react-router-dom";
import { SignUpWithEmailPassword, createUser } from "../firebase";

export const signUpAction = async ({ request }) => {
    const data = await request.formData();

    const email = data.get('email');
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');

    if (password !== confirmPassword)
        return { error: "Passwords do not match." };
    
    const userCredential = await SignUpWithEmailPassword(email, password)
    .catch(error => {
        switch (error.code) {
        case "auth/email-already-in-use":
            return { error: "Email already in use." };

        case "auth/invalid-email":
            return { error: "Invalid email." };
        
        case "auth/weak-password":
            return { error: "Weak password." };
        
        default:
            return { error: "Unknown error." };
        }
    });
    
    if (userCredential.error) return userCredential;
    
    const user = userCredential.user;
    await createUser(user.uid, {
        createdAt: user.metadata.creationTime,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        lastLoginAt: user.metadata.lastSignInTime,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        role: 'user',
    });

    return redirect('/');
};

export default signUpAction;