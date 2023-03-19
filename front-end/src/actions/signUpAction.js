import { redirect } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

export const signUpAction = async ({ request }) => {
    const data = await request.formData();

    const email = data.get('email');
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');

    if (password !== confirmPassword)
        return { error: "Passwords do not match." };
    
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    .catch(error => {
        switch (error.code) {
        case "auth/email-already-in-use":
            return { message: "Email already in use.", variant: "danger" };

        case "auth/invalid-email":
            return { message: "Invalid email.", variant: "danger" };
        
        case "auth/weak-password":
            return { message: "Weak password.", variant: "danger" };
        
        default:
            return { message: "Unknown error.", variant: "danger" };
        }
    });
    
    if (userCredential.error) return userCredential;
    
    const db = getFirestore();
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
        createdAt: user.metadata.createdAt,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        isAdmin: false,
        isAnonymous: user.isAnonymous,
        isDisable: false,
        lastLoginAt: user.metadata.lastLoginAt,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
    });

    await sendEmailVerification(user, {
        url: `http://localhost:3000/emailVerification?id=${user.uid}`
    });

    return redirect('/');
};

export default signUpAction;