import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

export const EmailVerification = () => {

    const navigate = useNavigate();
    const useQuery = new URLSearchParams(useLocation().search);
    const id = useQuery.get('id');

    const db = getFirestore();
    updateDoc(doc(db, 'users', id), {
        emailVerified: true
    }, { merge: true });

    return navigate('/');
};

export default EmailVerification;