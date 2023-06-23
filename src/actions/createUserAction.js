import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

export const createUserAction = async ({ request }) => {
    const data = await request.formData();

    const email = data.get('email');
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');
    const name = data.get('name');
    const phone = data.get('phone');
    const address = data.get('address');

    if (!email) return { message: "Email is required.", variant: "danger" };
    if (!password) return { message: "Password is required.", variant: "danger" };
    if (!confirmPassword) return { message: "Confirm password is required.", variant: "danger" };
    if (password !== confirmPassword) return { message: "Passwords do not match.", variant: "danger" };

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

    if (userCredential.message) return userCredential;

    const db = getFirestore();
    const user = userCredential.user;
    console.log(user);
    await setDoc(doc(db, "users", user.uid), {
        isAdmin: false,
        isDisable: false,
        address: address,
        email: user.email,
        photoURL: user.photoURL,
        isAnonymous: user.isAnonymous,
        emailVerified: user.emailVerified,
        createdAt: user.metadata.createdAt,
        displayName: name || user.displayName,
        lastLoginAt: user.metadata.lastLoginAt,
        phoneNumber: phone || user.phoneNumber,
    });

    return { message: "User created successfully.", variant: "success" };
};

export default createUserAction;