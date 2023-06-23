import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const resetPasswordAction = async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
    
    const auth = getAuth();

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
};

export default resetPasswordAction;