import React, { useState, useEffect } from "react";
import { FaImage, FaPencilAlt, FaTrash } from "react-icons/fa";
import PaginationComponent from "../../components/Pagination";
import { FormControlLabel, FormGroup, Tooltip } from "@mui/material";
import Android12Switch from "../../components/Android12Switch";
import { useLoader } from "../../Context/Context";
import {
  changeProductStatus,
  deleteProduct,
  getAllProducts,
} from "../../APIServices/ProductApi/ProductApi";
import ConfirmationPopUP from "../../components/ConfirmationPopUP";
import SuccessPopUP from "../../components/SuccessPopUp";
import { useNavigate } from "react-router-dom";
import AddUpdateProduct from "../ProductList/AddUpdateProduct";
import {
  changeProductSizeStatus,
  getAllProductSizes,
} from "../../APIServices/ProducrSizeApi/ProductSizeApi";
import AddUpdateproductSize from "./AddUpdateproductSize";
import { useLocation } from "react-router-dom";

interface User {
  ProductSizeID: number;
  ProductSizeKeyID: string; //Changed to capital for Get modal size for not visible.
  ProductKeyID: string;
  ProductUnitKeyID: string;
  ProductUnitName: string;
  ProductSize: string; //Changed to capital for product size for not visible.
  productPrice: string;
  productDiscount: string;
  productPriceUSD: string;
  productDiscountUSD: string;
  SizeLabel: string;
  Status: string;
  CreatedAt: string;
}

interface ModalRequestData {
  Action: string | null;
  productSizeKeyID: string | null;
  productKeyID?: string | null; // Optional, if needed for the modal
}

const ProductSizeList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productKeyID } = location.state || {};

  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [addUpdateProductModal, setAddUpdateproductModal] = useState(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
  const [showConfirmationPopUp, setShowConfirmationPopUp] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [successMessage, setSuccessMessage] = useState("");

  const [addUpdateActionDone, setAddUpdateActionDone] = useState(false);
  const [modalRequestData, setModalRequestData] = useState<ModalRequestData>({
    Action: null,
    productSizeKeyID: null,
  });
  const [search, setSearch] = useState("");
  const { setLoader } = useLoader();

  // New state for confirmation action
  const [modelAction, setModelAction] = useState<"Delete" | "Status" | null>(
    null
  );

  useEffect(() => {
    getAllProductsList(pageNo, pageSize, null);
  }, []);

  useEffect(() => {
    if (productKeyID) {
      getAllProductsList(pageNo, pageSize, null);
    }
  }, [productKeyID, pageNo, pageSize]);

  useEffect(() => {
    if (addUpdateActionDone) {
      getAllProductsList(pageNo, pageSize, null);
      setAddUpdateActionDone(false);
    }
  }, [addUpdateActionDone]);

  const getAllProductsList = async (
    pageNo: number,
    pageSize: number,
    searchKeyword: string | null
  ) => {
    setLoader(true);
    try {
      const res = await getAllProductSizes({
        pageNo,
        pageSize,
        searchKeyWord: searchKeyword || null,
        productKeyID: productKeyID, // ✅ pass value properly
      });

      if (res.statusCode === 200) {
        setUsers(res.responseData?.data || []);
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
    user.SizeLabel?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddProduct = () => {
    setModalRequestData({
      Action: null,
      productSizeKeyID: null,
      productKeyID: productKeyID,
    });
    setAddUpdateproductModal(true);
  };
  const handleUpdateProduct = (value: User) => {
    // debugger;
    setModalRequestData({
      Action: "Update",
      productSizeKeyID: value.ProductSizeKeyID,
      productKeyID: value.ProductKeyID, // Pass the productKeyID here
    });
    setAddUpdateproductModal(true);
  };

  const handleDeleteProduct = (productSizeKeyID: string) => {
    setModalRequestData({ Action: "Delete", productSizeKeyID });
    setModelAction("Delete");
    setShowConfirmationPopUp(true);
  };

  const confirmChangeStatus = (user: User) => {
    setModalRequestData({
      Action: "Status",
      productSizeKeyID: user.ProductSizeKeyID,
    });
    setModelAction("Status");
    setShowConfirmationPopUp(true);
  };

  const handleConfirmBtn = async () => {
    if (!modelAction || !modalRequestData.productSizeKeyID) return;
    setLoader(true);

    try {
      let data;
      // if (modelAction === "Delete") {
      //   data = await deleteProduct(modalRequestData.productSizeKeyID);
      // }
      if (modelAction === "Status") {
        data = await changeProductSizeStatus(modalRequestData.productSizeKeyID);
      }

      if (data?.statusCode === 200) {
        // Set success message dynamically
        setSuccessMessage(
          modelAction === "Delete"
            ? "Product deleted successfully!"
            : "Product status updated successfully!"
        );

        setShowConfirmationPopUp(false);
        setShowSuccessPopUp(true);
        getAllProductsList(pageNo, pageSize, search);
      }
    } catch (error) {
      console.log(error);
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

        <Tooltip title="Add Product Size">
          <button
            className="fw-semibold px-4 py-2"
            style={{
              backgroundColor: "#2e7d32",
              color: "white",
              borderRadius: "0.375rem",
              whiteSpace: "nowrap",
            }}
            onClick={handleAddProduct}
          >
            + Add Product Size
          </button>
        </Tooltip>
      </div>

      <div
        className="table-responsive"
        style={{
          maxHeight: "64vh",
          overflowY: "auto",
          overflowX: "auto",
        }}
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
              <th className="text-success">Sr no</th>
              <th className="text-success">Product Unit Name</th>
              <th className="text-success">Product Size</th>
              <th className="text-success">Product Price</th>
              <th className="text-success">Product Discount</th>
              <th className="text-success">Product Price ($) </th>
              <th className="text-success">Product Discount ($) </th>
              <th className="text-success">Status</th>
              <th className="text-success">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.ProductSizeKeyID}>
                  <td>{(currentPage - 1) * pageSize + (index + 1)}</td>
                  <td>{user.ProductUnitName}</td>
                  <td>{user.ProductSize}</td>
                  <td>{user.productPrice}</td>
                  <td>{user.productDiscount}</td>
                  <td>{user.productPriceUSD}</td>
                  <td>{user.productDiscountUSD}</td>

                  {/* Status Switch */}
                  <td className="d-flex align-items-center">
                    <Tooltip title="Change Status">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Android12Switch
                              onClick={() => confirmChangeStatus(user)}
                              checked={user.Status === "Active"}
                            />
                          }
                          label=""
                        />
                      </FormGroup>
                    </Tooltip>
                  </td>

                  {/* Actions */}
                  <td>
                    <Tooltip title="Update Product Size">
                      <span
                        style={{ cursor: "pointer", marginRight: "10px" }}
                        onClick={() => handleUpdateProduct(user)}
                      >
                        <FaPencilAlt size={20} color="#2e7d32" />
                      </span>
                    </Tooltip>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center text-muted py-3">
                  No product size found.
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
        onConfirm={handleConfirmBtn}
      />

      <AddUpdateproductSize
        show={addUpdateProductModal}
        onHide={() => setAddUpdateproductModal(false)}
        modalRequestData={modalRequestData}
        setAddUpdateActionDone={setAddUpdateActionDone}
      />
    </div>
  );
};

export default ProductSizeList;
