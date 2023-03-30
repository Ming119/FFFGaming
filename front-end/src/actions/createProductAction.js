import { redirect } from "react-router-dom";
import { getStorage, ref, uploadString } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export const createProductAction = async ({ request }) => {

    const data = await request.formData();
    
    const name = data.get('productName');
    const price = data.get('price');
    const countInStock = data.get('countInStock');
    
    const coverImage = sessionStorage.getItem('coverImage');
    const images = JSON.parse(sessionStorage.getItem("images"));
    const richText = sessionStorage.getItem('richText');

    if (!name) return { message: "Product name is required.", variant: "danger" };
    if (!price) return { message: "Price is required.", variant: "danger" };
    if (!countInStock) return { message: "Count in stock is required.", variant: "danger" };
    if (!coverImage) return { message: "Cover image is required.", variant: "danger" };

    const db = getFirestore();
    const newProduct = await addDoc(collection(db, "products"), {
        name,
        price,
        countInStock,
        richText,
        createdAt: new Date(),
        isEnabled: true,
    });

    const storage = getStorage();
    await uploadString(ref(storage, `${newProduct.id}/0.jpg`), coverImage, 'data_url');
    for (let i = 0; i < images.length; i++) {
        await uploadString(ref(storage, `${newProduct.id}/${i+1}.jpg`), images[i], 'data_url');
    }

    sessionStorage.removeItem('coverImage');
    sessionStorage.removeItem('images');
    
    return redirect("/manage/products");
};

export default createProductAction;
