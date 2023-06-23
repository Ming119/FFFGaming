import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import _ from "lodash";

export const addToCartAction = async ({ request }) => {

    const data = await request.formData();
    const productId = data.get('productId');
    const quantity = parseInt(data.get('quantity'));

    let optionsObject = {};
    const options = data.getAll('options');
    options.forEach((option) => {
        const selected = data.get(`options_${option}`);
        if (selected) optionsObject[option] = selected;
    });

    const auth = getAuth();

    if (!auth.currentUser) {
        return { message: "請先登入", variant: "warning" };
    }

    const db = getFirestore();
    const product = await getDoc(doc(db, "products", productId));
    if (product.data().quantity < quantity) {
        return { message: "庫存不足", variant: "warning" };
    }

    const user = await getDoc(doc(db, "users", auth.currentUser.uid));
    let cart = user.data().cart;

    if (!cart) cart = [];

    const index = _.findIndex(cart, { productId, options: optionsObject });

    if (index !== -1) {
        cart[index].quantity += quantity;
    }
    else cart.push({ id: (Date.now() * Math.floor(Math.random() * 10000)).toString(36) + (Date.now() + Math.floor(Math.random() * 1000000000000)).toString(36),
        productId, quantity, price: product.data().price, name: product.data().name, options: optionsObject });

    await setDoc(doc(db, "users", auth.currentUser.uid), {
        cart,
    }, { merge: true });

    return { message: "已加入購物車", variant: "success" };
};

export default addToCartAction;