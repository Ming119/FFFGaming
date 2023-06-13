import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { redirect } from 'react-router-dom';

export const checkOutAction = async ({ request }) => {
    const data = await request.formData();
    const orderNo = data.get('orderNo');
    const totalPrice = data.get('totalPrice');
    const products = data.getAll('products');
    const discountCode = data.get('discountCode');
    const payType = data.get('PayType');
    const pickupType = data.get('PickupType');
    const receiverTel = data.get('receiverTel');
    const receiverName = data.get('receiverName');
    const receiverEmail = data.get('receiverEmail');
    const receiverNote = data.get('receiverNote');
    const receiveStore = data.get('receiveStore');

    const p = products.map(item => {
        return JSON.parse(item);
    });

    console.log(p);

    const auth = getAuth();
    const db = getFirestore();
    setDoc(doc(db, "orders", orderNo), {
        orderNo: orderNo,
        totalPrice: totalPrice,
        products: p,
        discountCode: discountCode,
        payType: payType,
        pickupType: pickupType,
        receiverTel: receiverTel,
        receiverName: receiverName,
        receiverEmail: receiverEmail,
        receiverNote: receiverNote,
        receiveStore: receiveStore,
        status: '未出貨',
        orderDate: new Date()
    }).then(async () => {
        const user = await getDoc(doc(db, "users", auth.currentUser.uid));
        let cart = user.data().cart;
        cart = cart.filter(item => {
            return !products.includes(JSON.stringify(item));
        });
        await setDoc(doc(db, "users", auth.currentUser.uid), {
            cart: cart
        }, { merge: true });
    })

    return redirect('/checkout/success')
};

export default checkOutAction;