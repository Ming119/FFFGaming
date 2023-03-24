import { redirect } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadString } from "firebase/storage";

export const createProductAction = async ({ request }) => {

    const data = await request.formData();
    const name = data.get('productName');
    const price = data.get('price');
    const description = data.get('description');
    const countInStock = data.get('countInStock');
    
    if (!name) return { message: "Product name is required.", variant: "danger" };
    if (!price) return { message: "Price is required.", variant: "danger" };
    if (!countInStock) return { message: "Count in stock is required.", variant: "danger" };
    if (!description) return { message: "Description is required.", variant: "danger" };

    const db = getFirestore();
    const newProduct = await addDoc(collection(db, "products"), {
        name,
        price,
        description,
        countInStock,
        createdAt: new Date(),
        isEnabled: true,
    });

    const storage = getStorage();
    const imageLength = sessionStorage.getItem("imagesLength");

    for (let i = 0; i < imageLength; i++) {
        const imageDataURL = sessionStorage.getItem(`imageDataURL_${i}`);
        await uploadString(ref(storage, `${newProduct.id}/${i}.jpg`), imageDataURL, 'data_url');
        sessionStorage.removeItem(`imageDataURL_${i}`);
    }    
    
    return redirect("/manage/products");
};

export default createProductAction;
