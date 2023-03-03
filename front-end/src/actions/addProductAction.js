import { redirect } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, uploadString, ref } from "firebase/storage";

export const addProductAction = async ({ request }) => {

    const data = await request.formData();
    const name = data.get('productName');
    const price = data.get('price');
    const description = data.get('description');
    const countInStock = data.get('countInStock');
    const image = data.get('image');
    const imageDataURL = sessionStorage.getItem("imageDataURL");

    if (!name) return { message: "Product name is required.", variant: "danger" };
    if (!price) return { message: "Price is required.", variant: "danger" };
    if (!countInStock) return { message: "Count in stock is required.", variant: "danger" };
    if (!description) return { message: "Description is required.", variant: "danger" };
    if (!image) return { message: "Image is required.", variant: "danger" };
    if (!imageDataURL) return { message: "Image is required.", variant: "danger" };

    const db = getFirestore();
    const docRef = await addDoc(collection(db, "products"), {
        name,
        price,
        description,
        countInStock,
        createdAt: new Date(),
        enabled: true,
    });
    
    const storage = getStorage();
    await uploadString(ref(storage, `products/${docRef.id}.jpg`), imageDataURL, "data_url");

    return redirect("/manage/products");
};

export default addProductAction;