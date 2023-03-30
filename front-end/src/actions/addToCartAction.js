import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

export const addToCartAction = async ({ request }) => {

    const data = await request.formData();
    const id = data.get('productId');
    const quantity = parseInt(data.get('quantity'));
    
    const auth = getAuth();

    if (!auth.currentUser) {
        return { message: "請先登入", variant: "warning" };
    }

    const db = getFirestore();
    const product = await getDoc(doc(db, "products", id));
    if (product.data().quantity < quantity) {
        return { message: "庫存不足", variant: "warning" };
    }

    const user = await getDoc(doc(db, "users", auth.currentUser.uid));
    let cart = user.data().cart;

    if (!cart) cart = [];

    const index = cart.findIndex((item) => item.id === id);
    if (index !== -1) cart[index].quantity += quantity;
    else cart.push({ id, quantity, price: product.data().price, name: product.data().name });

    await setDoc(doc(db, "users", auth.currentUser.uid), {
        cart,
    }, { merge: true });

    return { message: "已加入購物車", variant: "success" };
};

export default addToCartAction;