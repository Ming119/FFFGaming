import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Button, Image, Row, Col, InputGroup, Form } from "react-bootstrap";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const Cart = () => {

    const navigate = useNavigate();
    const [ totalPrice, setTotalPrice ] = useState(0);
    const [ cartItems, setCartItems ] = useState(useLoaderData());
    const [ rowSelection, setRowSelection ] = useState([]);
    const [ discountCodeField, setDiscountCodeField ] = useState('');
    const [ dcFieldEnabled, setDCFieldEnabled ] = useState(false);
    const [ oriTotalPrice, setOriTotalPrice ] = useState(0);

    const commitCartItems = async () => {
        const auth = getAuth();
        const db = getFirestore();

        const cart = cartItems.map((item) => {
            return {
                id: item.id,
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                options: item.options,
            };
        });

        await setDoc(doc(db, "users", auth.currentUser.uid), {
            cart,
        }, { merge: true });
    };

    const onAddButtonClick = (id) => {
        setCartItems(cartItems.map((item) => {
            if (item.id === id) item.quantity++;
            return item;
        }));
    };

    const onMinusButtonClick = (id) => {
        setCartItems(cartItems.map((item) => {
            if (item.id === id) 
            if (item.quantity > 0) item.quantity--;
            return item;
        }));
    };

    const onDeleteButtonClick = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const onCheckoutButtonClick = () => {
        if (rowSelection.length === 0) return;
        navigate('/checkout', { state: { time: Date.now(), totalPrice: totalPrice, products: cartItems.filter((item) => rowSelection.includes(item.id)) }});
    };

    useEffect(() => {
        setTotalPrice(rowSelection.reduce((acc, cur) => {
            const item = cartItems.find((item) => item.id === cur);
            return acc + item.price * item.quantity;
        }, 0));
    }, [rowSelection, cartItems]);

    useEffect(() => {
        commitCartItems();
    }, [cartItems]);


    const useDiscountCode = () => {
        setOriTotalPrice(totalPrice);
        getDiscount();
    }

    const getDiscount = async () => {
        const auth = getAuth();
        const db = getFirestore();

        const docRef = doc(db, "discountCodes", discountCodeField);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log();
            if (docSnap.data().allowed.includes(auth.currentUser.uid) || docSnap.data().allowed.includes("all")) {
                    console.log("Query data:", docSnap.data());
                    setTotalPrice(totalPrice * docSnap.data().discount);
                    setDCFieldEnabled(true);
                } else {
                    console.log("Don't have allow");
                }
        } else {
            console.log("No such document!");
        }
    }

    const tableColumns = [
        {
            field: 'image', headerName: '圖片', flex: 1,
            renderCell: (params) => {
                return (
                    <Image src={ params.row.image } className="h-100"/>
                )
            },
        }, {
            field: 'name', headerName: '名稱', flex: 1,
            renderCell: (params) => {
                return (
                    <Link to={ `/products/${params.row.id}` }>{ params.row.name }</Link>
                )
            },
        }, {
           field: 'options', headerName: '選項', flex: 1,
           renderCell: (params) => {
                return (
                    <div className="options">
                        { Object.keys(params.row.options).map((key, index) => (
                            <div key={index}>
                                <span className="fw-bold">{ key }</span>
                                <span className="px-1">{ params.row.options[key] }</span>
                            </div>
                        )) }
                    </div>
                );
              } 
        }, {
            field: 'price', headerName: '價格', flex: 1,
        }, {
            field: 'quantity', headerName: '數量', flex: 1,
            renderCell: (params) => {
                return (
                    <div className="quantity">
                        <Button className="btn btn-light" onClick={ () => { onMinusButtonClick(params.row.id) }}>-</Button>
                        <span className="px-1">{ params.row.quantity }</span>
                        <Button className="btn btn-light" onClick={ () => { onAddButtonClick(params.row.id) }}>+</Button>
                    </div>
                );
            },
        }, {
            field: 'totalPrice', headerName: '小計', flex: 1,
            valueGetter: (params) => {
                return params.row.price * params.row.quantity;
            },
        }, {
            field: 'delete', headerName: '刪除', flex: 1,
            renderCell: (params) => {
                return (
                    <Button className="btn btn-danger" onClick={ (e) => onDeleteButtonClick(params.row.id) }>刪除</Button>
                );
            }
        }
    ];

    return (
        <div className="cart">
            <h1>Cart</h1>
            
            <DataGrid autoHeight
                rows={ cartItems }
                columns={ tableColumns }
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={ (newSelection) => {
                    setRowSelection(newSelection);
                }}
            />

            <div className="total-price">
                <Row className="my-3" xs={2} md={4} lg={6}>
                    <Col xs="auto" md="auto" lg="auto">
                        <h3>折扣碼：</h3>
                    </Col>
                    <Col xs="auto" md={3} lg={3}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                aria-label="折扣碼"
                                aria-describedby="basic-addon2"
                                id="discountCode"
                                value={discountCodeField}
                                onChange={(e) => {
                                        setDiscountCodeField(e.target.value);
                                        setDCFieldEnabled(false);
                                        if (dcFieldEnabled) {
                                            setTotalPrice(oriTotalPrice);
                                        }
                                    }
                                }
                            />
                            <Button variant="outline-primary" id="button-addon2" onClick={ useDiscountCode } disabled={ dcFieldEnabled }>使用折扣碼</Button>
                        </InputGroup>
                    </Col>
                </Row>

                <h3>總計：{ totalPrice }</h3>

                <Button className="btn btn-primary" onClick={ onCheckoutButtonClick }>結帳</Button>

            </div>
        </div>
    );
};

export default Cart;