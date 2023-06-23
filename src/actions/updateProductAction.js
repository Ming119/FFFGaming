import { redirect } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadString, deleteObject, listAll } from "firebase/storage";

export const updateProductAction = async ({ request }) => {

    const data = await request.formData();

    const id = data.get('id');
    const name = data.get('productName');
    const price = data.get('price');
    const countInStock = data.get('countInStock');
    
    let attributesObject = [];
    const attributes = data.getAll('attributeName');
    attributes.forEach((attribute, index) => {
        if (!attribute) return;
        const values = data.getAll(`attributeValues_${attribute}`);
        attributesObject.push({ name: attribute, values: values.filter(value => value) });
    });

    const coverImage = sessionStorage.getItem('coverImage');
    const images = JSON.parse(sessionStorage.getItem("images"));
    const richText = sessionStorage.getItem('richText');
    
    if (!name) return { message: "Product name is required.", variant: "danger" };
    if (!price) return { message: "Price is required.", variant: "danger" };
    if (!countInStock) return { message: "Count in stock is required.", variant: "danger" };
    if (!coverImage) return { message: "Cover image is required.", variant: "danger" };

    const db = getFirestore();
    await setDoc(doc(db, "products", id), {
        name,
        price,
        richText,
        countInStock,
        attributes: attributesObject,
    }, { merge: true });

    const storage = getStorage();
    const folderRef = ref(storage, `${id}`);
    const { items } = await listAll(folderRef);
    await Promise.all(items.map(async (itemRef) => {
        await deleteObject(itemRef);
    }));
    await uploadString(ref(storage, `${id}/0.jpg`), coverImage, 'data_url');
    for (let i = 0; i < images.length; i++) {
        await uploadString(ref(storage, `${id}/${i+1}.jpg`), images[i], 'data_url');
    }

    sessionStorage.removeItem('coverImage');
    sessionStorage.removeItem('images');

    return redirect("/manage/products");
};

export default updateProductAction;