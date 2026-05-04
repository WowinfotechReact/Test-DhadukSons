import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import logo from "/assets/img/logo.png";
import { useAuth, useLoader } from "../../Context/Context";
import { GetOrderListByUser } from "../../services/OrderHistoryAPI";
import { useNavigate } from "react-router-dom";

export interface Order {
  orderKeyID: string;
  order_ID: string;
  orderDate: string; // ISO Date string
  userKeyID: string;
  status: "Pending" | "Complete" | "Cancelled" | "InProcess"; // extend if needed
  currency_code: string;
  orderAddress: string;
  subtotalAmount: string; // you may convert to number if API always sends numeric
  discountAmount: string;
  totalAmount: string;
  shippingCharges: string;
  subtotalAmountUSD: string; // you may convert to number if API always sends numeric
  discountAmountUSD: string;
  totalAmountUSD: string;
  shippingChargesUSD: string;
  productOrderList: [];

  // Order Details
  orderDetailsKeyID: string;
  productKeyID: string;
  ProductTitle: string;
  productSizeKeyID: string;
  ProductSize: string;
  productUnitName: string;
  quantity: number;
  productPrice: string;
  discount: string;
}

const order = {
  orderKeyID: "8fe5e72a-83f4-11f0-8f5c-040e3c421fd1",
  orderDate: "2025-08-28T09:51:25.000Z",
  userKeyID: "d0160d93-81ac-11f0-a465-bc2411520d0d",
  status: "Pending",
  orderAddress: "144.22 price, sdfg, wre, 654661",
  subtotalAmount: "66.00",
  discountAmount: "21.78",
  totalAmount: "144.22",
  shippingCharges: "100.00",
  orderDetailsKeyID: "8fe638d8-83f4-11f0-8f5c-040e3c421fd1",
  productKeyID: "fc0dce60-7a7f-11f0-a465-bc2411520d0d",
  ProductTitle: " Organic Kesar Mango – Freeze Dried Powder",
  productSizeKeyID: "3972aa78-8261-11f0-a465-bc2411520d0d",
  ProductSize: "30",
  productUnitName: "Liter ",
  quantity: 2,
  productPrice: "33.00",
  discount: "33.00",
};

// const orders: Order[] = [
//   {
//     id: 22,
//     title: "Office Puja",
//     status: "Complete",
//     amount: 2177,
//     image: logo, // replace with actual image path
//   },
//   {
//     id: 19,
//     title: "Office Puja",
//     status: "Complete",
//     amount: 2177,
//     image: "/images/puja.jpg",
//   },
//   {
//     id: 10,
//     title: "Office Puja",
//     status: "Pending",
//     amount: 2177,
//     image: "/images/puja.jpg",
//   },
//   {
//     id: 9,
//     title: "Office Puja",
//     status: "Complete",
//     amount: 2177,
//     image: "/images/puja.jpg",
//   },
// ];

const OrderHistoryContent: React.FC = () => {
  const [orderList, setOrderList] = useState<Order[]>([]);
  const userString = localStorage.getItem("Userlogin");
  const { setLoader } = useLoader();
  const { geoLocation } = useAuth();
  const navigate = useNavigate();
  let user: any;

  useEffect(() => {
    getAllOrdersByUser();
  }, []);

  if (userString) {
    try {
      user = JSON.parse(userString); // convert string → object
      console.log(user.responseData.data.userKeyID);
    } catch (err) {
      console.error("Error parsing user data:", err);
    }
  }

  const getAllOrdersByUser = async () => {
    // debugger;
    setLoader(true);
    try {
      const res = await GetOrderListByUser(user.responseData.data.userKeyID);
      if (res.statusCode === 200) {
        setLoader(false);
        setOrderList(res.responseData.data);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };
  return (
    <div className="container my-5">
      <Row xs={1} sm={2} md={3} lg={3} className="g-4">
        {orderList?.map((order) => (
          <Col key={order.orderKeyID}>
            <Card className="h-100 shadow-sm border-1">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  {/* If you have an image field, uncomment */}
                  {/* <img
              src={order.image}
              alt={order.ProductTitle}
              className="img-fluid rounded"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
              }}
            /> */}
                  <div className="ms-3">
                    <h5 className="mb-1">{order.ProductTitle}</h5>
                    <p className="mb-0 fw-semibold">
                      Order ID: #{order.order_ID}
                    </p>
                  </div>
                </div>

                <p className="fw-semibold mb-1">
                  Order Status:{" "}
                  <span
                    className={
                      order.status === "Complete"
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {order.status}
                  </span>
                </p>
                <p className="fw-semibold">
                  Total Amount:{" "}
                  {order.currency_code === "INR"
                    ? `₹${Number(order.totalAmount).toLocaleString()}`
                    : `$${Number(order.totalAmountUSD).toLocaleString()}`}
                  {/* {geoLocation?.currency_code === "INR"
                    ? `₹ ${Number(order.totalAmount).toLocaleString()}`
                    : `$ ${Number(order.totalAmountUSD).toLocaleString()}`} */}
                </p>
              </Card.Body>
              <Card.Footer className="bg-white border-0">
                <button
                  style={{
                    padding: "10px 30px",
                    marginLeft: "20px",

                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate("/order-details", {
                      state: {
                        ProductList: order.productOrderList,
                        currency_code: order.currency_code,
                      },
                    })
                  }
                  className=" w-100 rounded-pill"
                >
                  View Details
                </button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default OrderHistoryContent;
