import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLoaderData } from "react-router-dom";
import { Button, Image } from "react-bootstrap";

export const Cart = () => {

    const [ totalPrice, setTotalPrice ] = useState(0);
    const [ cartItems, setCartItems ] = useState(useLoaderData());
    const [ rowSelection, setRowSelection ] = useState([]);

    const onAddButtonClick = (id) => {
        setCartItems(cartItems.map((item) => {
            if (item.id === id) item.quantity++;
            return item;
        }));
    };

    const onMinusButtonClick = (id) => {
        setCartItems(cartItems.map((item) => {
            if (item.id === id) item.quantity--;
            return item;
        }));
    };

    useEffect(() => {
        setTotalPrice(rowSelection.reduce((acc, cur) => {
            const item = cartItems.find((item) => item.id === cur);
            return acc + item.price * item.quantity;
        }, 0));
    }, [rowSelection, cartItems]);

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
                <h3>總計：{ totalPrice }</h3>

                <Button className="btn btn-primary">結帳</Button>

            </div>
        </div>
    );
};

export default Cart;