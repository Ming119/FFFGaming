import { redirect } from "react-router-dom";
import { getStorage, ref, uploadString } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export const createProductAction = async ({ request }) => {

    const data = await request.formData();
    
    const name = data.get('productName');
    const price = data.get('price');
    const category = data.get('category');
    const correspondingImage = data.get('correspondingImage');

    let attributesCount = 0;

    let attributesObject = [];
    const attributes = data.getAll('attributeName');
    attributes.forEach((attribute, index) => {
        if (!attribute) return;
        const values = data.getAll(`attributeValues_${attribute}`);
        if (correspondingImage && correspondingImage === attribute) attributesCount = values.filter(value => value).length;
        attributesObject.push({ name: attribute, values: values.filter(value => value) });
    });

    const coverImage = sessionStorage.getItem('coverImage');
    const images = JSON.parse(sessionStorage.getItem("images"));
    const richText = sessionStorage.getItem('richText');

    if (!name) return { message: "Product name is required.", variant: "danger" };
    if (!price) return { message: "Price is required.", variant: "danger" };
    if (!category) return { message: "Category is required.", variant: "danger" };
    if (!coverImage) return { message: "Cover image is required.", variant: "danger" };
    if (correspondingImage && attributesCount !== images.length+1) return { message: "Number of images must be equal to number of values for corresponding attribute.", variant: "danger" };

    const db = getFirestore();
    const newProduct = await addDoc(collection(db, "products"), {
        name,
        price,
        category,
        richText,
        createdAt: new Date(),
        isEnabled: true,
        attributes: attributesObject,
        correspondingImage,
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
