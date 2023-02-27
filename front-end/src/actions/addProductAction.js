import { redirect } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, uploadBytes, ref } from "firebase/storage";

export const addProductAction = async ({ request }) => {

    const data = await request.formData();
    const name = data.get('name');
    const price = data.get('price');
    const description = data.get('description');
    const countInStock = data.get('countInStock');
    const image = data.get('image');

    // if (!name) return { message: "Name is required.", variant: "danger" };
    // if (!price) return { message: "Price is required.", variant: "danger" };
    // if (!description) return { message: "Description is required.", variant: "danger" };

    // const db = getFirestore();
    // const docRef = await addDoc(collection(db, "products"), {
    //     name,
    //     price,
    //     description,
    //     countInStock,
    // });
    
    // if (image) {
    //     const storage = getStorage();
    //     const storageRef = ref(storage, `products/${image}`);
    // }

    return redirect("/manage/products");
};

export default addProductAction;