import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import PaginationComponent from "../../components/Pagination";
import { useAuth, useLoader } from "../../Context/Context";
import ConfirmationPopUP from "../../components/ConfirmationPopUP";
import SuccessPopUP from "../../components/SuccessPopUp";
import { useLocation, useNavigate } from "react-router-dom";
import {
  changeOrderStatus,
  getOrderDetailsByKeyID,
  getOrderList,
} from "../../APIServices/OrderApi/OrderApi";
import Select from "react-select";
import { Modal, Button, Table } from "react-bootstrap";
import { Tooltip } from "@mui/material";
import { Order } from "../../pages/OrderHistory/OrderHistoryContent";

interface User {
  orderKeyID: string;
  order_ID: string;
  orderDate: string;
  userKeyID: string;
  status: string;
  currency_code: string;
  orderAddress: string;
  FirstName: string;
  LastName: string;
  subtotalAmount: string;
  quantity: string;
  productPrice: string;
  discountAmount: string;
  productPriceUSD: string;
  discountAmountUSD: string;
}

interface ModalRequestData {
  Action: string | null;
  orderKeyID: string | null;
}

const orderStatusOptions = [
  { value: "Pending", label: "Pending" },
  { value: "InProcess", label: "In Process" },
  { value: "Completed", label: "Completed" },
];

const OrderList: React.FC = () => {
  const navigate = useNavigate();
  const { setLoader } = useLoader();

  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
  const [showConfirmationPopUp, setShowConfirmationPopUp] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [subtotal, setSubtotal] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();
  const [modalRequestData, setModalRequestData] = useState<ModalRequestData>({
    Action: null,
    orderKeyID: null,
  });
  const [search, setSearch] = useState("");
  const [modelAction, setModelAction] = useState<"Delete" | "Status" | null>(
    null
  );

  // console.log(location);

  // For Order Details Modal
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [totalDiscount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [orderDetails, setOrderDetails] = useState<any[]>([]);
  const [selectedOrderInfo, setSelectedOrderInfo] = useState<User | null>(null);
  const { geoLocation } = useAuth();
  const [orderStatus, setOrderStatus] = useState();

  useEffect(() => {
    setOrderStatus(location?.state?.orderStatus);
  }, [location.state]);

  useEffect(() => {
    getAllProductsList(pageNo, pageSize, null);
  }, []);

  const getAllProductsList = async (
    pageNo: number,
    pageSize: number,
    searchKeyword: string | null
  ) => {
    setLoader(true);
    try {
      const res = await getOrderList({
        pageNo,
        pageSize,
        searchKeyWord: searchKeyword || null,
      });

      if (res.statusCode === 200) {
        const OrderData: User[] = res.responseData?.data || [];
        if (location?.state?.orderStatus) {
          const filteredList = OrderData.filter(
            (item) => item.status === location.state.orderStatus
          );
          setUsers(filteredList || []);
        } else setUsers(OrderData || []);
        setTotalCount(res.totalCount);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handlePageChange = (newPageNo: number) => {
    setPageNo(newPageNo);
    setCurrentPage(newPageNo);
    getAllProductsList(newPageNo, pageSize, null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearch(input);
    getAllProductsList(1, pageSize, input);
  };

  const filteredUsers = users.filter((user) =>
    (user.FirstName || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusChange = async (orderKeyID: string, newStatus: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.orderKeyID === orderKeyID ? { ...user, status: newStatus } : user
      )
    );

    setLoader(true);
    try {
      await changeOrderStatus(orderKeyID, newStatus);
      setSuccessMessage(`Order status updated to "${newStatus}" successfully!`);
      setShowSuccessPopUp(true);

      await getAllProductsList(pageNo, pageSize, search);
    } catch (error) {
      console.error("Error updating status:", error);
      await getAllProductsList(pageNo, pageSize, search);
    } finally {
      setLoader(false);
    }
  };

  const handleViewOrder = async (user: User) => {
    setLoader(true);
    try {
      const res = await getOrderDetailsByKeyID(user.orderKeyID);
      if (res.statusCode === 200) {
        setOrderDetails(res.responseData?.data || []);
        setSelectedOrderInfo(user);
        const totalShipping = res.responseData?.data.reduce(
          (sum: number, order: { shippingCharges?: number }) =>
            sum + Number(order.shippingCharges || 0),
          0
        );
        const totalQuantity = res.responseData?.data.reduce(
          (sum: number, order: User) => sum + Number(order.quantity || 0),
          0
        );
        const totalPrice = res.responseData?.data.reduce(
          (sum: number, order: User) =>
            sum +
            (user?.currency_code === "INR"
              ? Number(order.quantity || 0) * Number(order.productPrice || 0)
              : Number(order.quantity || 0) *
                Number(order.productPriceUSD || 0)),
          0
        );

        const totalDiscount = res.responseData?.data.reduce(
          (sum: number, order: User) => sum + Number(order.discountAmount || 0),
          0
        );
        setSubtotal(totalShipping);
        setTotalQuantity(totalQuantity);
        setTotalPrice(totalPrice);
        setDiscount(
          user?.currency_code === "INR"
            ? Number(res.responseData?.data[0].discountAmount)
            : Number(res.responseData?.data[0].discountAmountUSD)
        );
        setShipping(
          user?.currency_code === "INR"
            ? Number(res.responseData?.data[0].shippingCharges)
            : Number(res.responseData?.data[0].shippingChargesUSD)
        );
        setGrandTotal(
          user?.currency_code === "INR"
            ? Number(res.responseData?.data[0].totalAmount)
            : Number(res.responseData?.data[0].totalAmountUSD)
        );
        setShowOrderDetails(true);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
        <input
          type="text"
          className="form-control w-25 w-md-50"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <div
        className="table-responsive"
        style={{ maxHeight: "64vh", overflowY: "auto", overflowX: "auto" }}
      >
        <table
          className="table table-bordered table-hover mb-0"
          style={{ minWidth: "600px" }}
        >
          <thead
            style={{
              backgroundColor: "#e8f5e9",
              position: "sticky",
              top: 0,
              zIndex: 2,
            }}
          >
            <tr>
              <th className="text-success">Order ID</th>
              <th className="text-success">Customer Name</th>
              <th className="text-success">Order Address</th>
              <th className="text-success">Status</th>
              <th className="text-success">Order Date</th>
              <th className="text-success text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.orderKeyID}>
                  {/* <td>{(currentPage - 1) * pageSize + (index + 1)}</td> */}
                  <td>{user.order_ID}</td>
                  <td>
                    {user.FirstName} {user.LastName}
                  </td>
                  <td>
                    {user.orderAddress.length > 30 ? (
                      <Tooltip title={user.orderAddress}>
                        <span>
                          {user.orderAddress.substring(0, 30) + "...."}
                        </span>
                      </Tooltip>
                    ) : (
                      user.orderAddress
                    )}
                  </td>

                  <td>
                    <Select
                      options={orderStatusOptions}
                      value={orderStatusOptions.find(
                        (opt) => opt.value === user.status
                      )}
                      onChange={(selectedOption) =>
                        handleStatusChange(
                          user.orderKeyID,
                          selectedOption!.value
                        )
                      }
                      isSearchable={false}
                      menuPortalTarget={document.body} // <-- render dropdown in body
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }), // make sure it appears above table
                      }}
                    />
                  </td>
                  <td>{new Date(user.orderDate).toLocaleDateString()}</td>
                  <td className="text-center">
                    <FaEye
                      className="text-success me-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleViewOrder(user)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-muted py-3">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pageSize < totalCount && (
        <div className="d-flex justify-content-end">
          <PaginationComponent
            pageNo={pageNo}
            pageSize={pageSize}
            totalCount={totalCount}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      <SuccessPopUP
        show={showSuccessPopUp}
        onHide={() => setShowSuccessPopUp(false)}
        message={successMessage}
      />

      <ConfirmationPopUP
        show={showConfirmationPopUp}
        onHide={() => setShowConfirmationPopUp(false)}
        message={
          modelAction === "Delete"
            ? "Are you sure you want to delete this product?"
            : "Are you sure you want to change the status?"
        }
        onConfirm={() => {}}
      />

      <Modal
        show={showOrderDetails}
        onHide={() => setShowOrderDetails(false)}
        size="xl"
        centered
      >
        <Modal.Header>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrderInfo && (
            <div className="d-flex flex-wrap gap-3 mb-4">
              {/* Order Details */}
              <div
                className="flex-fill p-3 border rounded shadow-sm bg-light"
                style={{ minWidth: "300px" }}
              >
                {/* <h6 className="mb-3 text-primary">Order Details</h6> */}

                <div className="mb-2 d-flex justify-content-between">
                  <span className="fw-semibold">Customer Name:</span>
                  <span className="text-truncate" style={{ maxWidth: "60%" }}>
                    {selectedOrderInfo.FirstName} {selectedOrderInfo.LastName}
                  </span>
                </div>

                <div className="mb-2 d-flex justify-content-between">
                  <span className="fw-semibold">Order Address:</span>
                  <span className="text-truncate" style={{ maxWidth: "60%" }}>
                    {selectedOrderInfo.orderAddress}
                  </span>
                </div>

                <div className="mb-2 d-flex justify-content-between">
                  <span className="fw-semibold">Status:</span>
                  <span
                    className={
                      selectedOrderInfo.status.toLowerCase() === "pending"
                        ? "text-warning"
                        : selectedOrderInfo.status.toLowerCase() === "completed"
                        ? "text-success"
                        : "text-secondary"
                    }
                  >
                    {selectedOrderInfo.status}
                  </span>
                </div>

                <div className="d-flex justify-content-between">
                  <span className="fw-semibold">Order Date:</span>
                  <span>
                    {new Date(selectedOrderInfo.orderDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
              </div>

              {/* Pricing Details */}
              <div
                className="flex-fill p-3 border rounded shadow-sm bg-light"
                style={{ minWidth: "400px" }}
              >
                {/* <h6 className="mb-3 text-primary">Pricing Details</h6> */}

                <div className="mb-2 d-flex justify-content-between">
                  <span className="fw-semibold">Total Quantity:</span>
                  <span>{totalQuantity}</span>
                </div>
                <div className="mb-2 d-flex justify-content-between">
                  <span className="fw-semibold">Price:</span>
                  <span>
                    {selectedOrderInfo?.currency_code === "INR"
                      ? `₹${totalPrice.toFixed(2)}`
                      : `$${totalPrice.toFixed(2)}`}
                  </span>
                </div>
                <div className="mb-2 d-flex justify-content-between">
                  <span className="fw-semibold">Discount:</span>
                  <span>
                    {selectedOrderInfo?.currency_code === "INR" ? "-₹" : "-$"}
                    {totalDiscount > 0 ? `${totalDiscount.toFixed(2)}` : 0}
                  </span>
                </div>
                <div className="mb-2 d-flex justify-content-between">
                  <span className="fw-semibold">Subtotal:</span>
                  <span>
                    {" "}
                    {selectedOrderInfo?.currency_code === "INR" ? "₹" : "$"}
                    {totalPrice - totalDiscount}
                  </span>
                </div>

                <div className="mb-2 d-flex justify-content-between">
                  <span className="fw-semibold">Shipping Charges:</span>
                  <span>
                    {selectedOrderInfo?.currency_code === "INR" ? "₹" : "$"}{" "}
                    {totalPrice - totalDiscount < 2000 ? shipping : 0}
                  </span>
                </div>

                <div className="d-flex justify-content-between">
                  <span className="fw-semibold">Grand Total:</span>
                  <span>
                    {" "}
                    {selectedOrderInfo?.currency_code === "INR"
                      ? "₹"
                      : "$"}{" "}
                    {grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {orderDetails.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Product Name</th>
                  <th>Size</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total Price</th>
                  <th>Discount</th>
                  <th>Subtotal</th>
                  {/* <th>Shipping Charges</th>
                  <th>Grand Total</th> */}
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((item, index) => (
                  <tr key={item.orderDetailsKeyID}>
                    <td>{(currentPage - 1) * pageSize + (index + 1)}</td>
                    <td>{item.ProductTitle || "-"}</td>
                    <td>{item.ProductSize || "-"}</td>
                    <td>{item.productUnitName || "-"}</td>
                    <td>
                      {selectedOrderInfo?.currency_code === "INR"
                        ? `₹${item.productPrice}`
                        : `$${item.productPriceUSD}`}
                    </td>
                    <td>{item.quantity}</td>
                    <td>
                      {" "}
                      {selectedOrderInfo?.currency_code === "INR"
                        ? `₹${item.productPrice * item.quantity}`
                        : `$${item.productPriceUSD * item.quantity}`}
                    </td>
                    <td>
                      {selectedOrderInfo?.currency_code === "INR"
                        ? `₹${
                            (item.productPrice *
                              item.quantity *
                              item.discount) /
                            100
                          }`
                        : `$${
                            (item.productPriceUSD *
                              item.quantity *
                              item.discountUSD) /
                            100
                          }`}
                    </td>
                    <td>
                      {selectedOrderInfo?.currency_code === "INR"
                        ? `₹${
                            item.productPrice * item.quantity -
                            (item.productPrice *
                              item.quantity *
                              item.discount) /
                              100
                          }`
                        : `$${
                            item.productPriceUSD * item.quantity -
                            (item.productPriceUSD *
                              item.quantity *
                              item.discountUSD) /
                              100
                          }`}
                    </td>
                    {/* <td>
                      {Number(item.productPrice) -
                        Number(item.discount) +
                        Number(item.shippingCharges)}
                    </td> */}
                    {/* <td>
                      {Number(item.productPrice) -
                        Number(item.discount) +
                        item.shippingCharges}
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-muted">No order details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            style={{
              backgroundColor: "#2e7d32",
              color: "white",
              borderRadius: "0.375rem",
              padding: "10px 30px",
              whiteSpace: "nowrap",
            }}
            onClick={() => setShowOrderDetails(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderList;
