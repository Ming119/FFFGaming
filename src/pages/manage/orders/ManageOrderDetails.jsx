import { useLoaderData } from "react-router-dom";
import { Button } from "react-bootstrap";

export const ManageOrderDetails = () => {

    const orderDetails = useLoaderData();
    const timestamp = new Date(orderDetails.orderDate.seconds * 1000);
    console.log(orderDetails);

    return (
        <div className="manageOrderdetails">
            <h1>訂單詳細資料</h1>
            訂單編號： {orderDetails.orderNo}<br />
            訂單狀態： {orderDetails.status}<br />
            訂單金額： {orderDetails.totalPrice}<br />
            訂單日期： {timestamp.toLocaleString()}<br />
            付款方式： {orderDetails.payType}<br />
            取貨方式： {orderDetails.pickupType}<br />
            取貨門市： {orderDetails.receiveStore}<br />
            取貨人姓名： {orderDetails.receiverName}<br />
            取貨人電話： {orderDetails.receiverTel}<br />
            取貨人Email： {orderDetails.receiverEmail}<br />
            取貨人備註： {orderDetails.receiverNote}<br />
            折扣碼： {orderDetails.discountCode}<br />
            <hr />

            <h2>訂單明細</h2>
            <table className="w-100">
                <thead>
                    <tr>
                        <th>商品名稱</th>
                        <th>商品選項</th>
                        <th>商品價格</th>
                        <th>商品數量</th>
                        <th>小計</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetails.products.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{ Object.keys(item.options).map((key, index) => (
                                <div key={index}>{key}: {item.options[key]}</div>
                            )) }</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{parseInt(item.quantity, 10) * parseInt(item.price, 10)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <hr />

            <Button>出貨</Button>
        </div>
    );
};

export default ManageOrderDetails;