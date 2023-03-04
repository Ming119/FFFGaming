import { redirect } from "react-router-dom";
import { getFirestore, setDoc, doc } from "firebase/firestore";

export const updateProductAction = async ({ request }) => {

    const data = await request.formData();
    const id = data.get('id');
    const name = data.get('productName');
    const price = data.get('price');
    const description = data.get('description');
    const countInStock = data.get('countInStock');
    const imageDataURL = sessionStorage.getItem("imageDataURL");
    
    if (!name) return { message: "Product name is required.", variant: "danger" };
    if (!price) return { message: "Price is required.", variant: "danger" };
    if (!countInStock) return { message: "Count in stock is required.", variant: "danger" };
    if (!description) return { message: "Description is required.", variant: "danger" };
    if (!imageDataURL) return { message: "Image is required.", variant: "danger" };

    const db = getFirestore();
    await setDoc(doc(db, "products", id), {
        name,
        price,
        description,
        countInStock,
        image: imageDataURL,
    }, { merge: true });

    return redirect("/manage/products");
};

export default updateProductAction;