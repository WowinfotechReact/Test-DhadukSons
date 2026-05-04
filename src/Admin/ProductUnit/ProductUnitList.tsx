import React, { useState, useEffect } from "react";
import { FaImage, FaPencilAlt, FaTrash } from "react-icons/fa";
import PaginationComponent from "../../components/Pagination";
import { FormControlLabel, FormGroup, Tooltip } from "@mui/material";
import Android12Switch from "../../components/Android12Switch";
import { useLoader } from "../../Context/Context";
import ConfirmationPopUP from "../../components/ConfirmationPopUP";
import SuccessPopUP from "../../components/SuccessPopUp";
import { useNavigate } from "react-router-dom";
import {
  changeProductUnitStatus,
  deleteProductUnit,
  getAllProductUnit,
} from "../../APIServices/ProductUnitApi/ProductUnitApi";
import ProductUnitAddUpdate from "./ProductUnitAddUpdate";

interface User {
  productUnitKeyID: string;
  productUnitName: string;
  status: string;
  email: string;
  createdAt: string;
}

interface ModalRequestData {
  Action: string | null;
  productUnitKeyID: string | null;
}

const ProductUnitList: React.FC = () => {
  const navigate = useNavigate();

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
    productUnitKeyID: null,
  });
  const [search, setSearch] = useState("");
  const { setLoader } = useLoader();

  // New state for confirmation action
  const [modelAction, setModelAction] = useState<"Delete" | "Status" | null>(
    null
  );

  useEffect(() => {
    getAllProductsUnitList(pageNo, pageSize, null);
  }, []);

  useEffect(() => {
    if (addUpdateActionDone) {
      getAllProductsUnitList(pageNo, pageSize, null);
      setAddUpdateActionDone(false);
    }
  }, [addUpdateActionDone]);

  const getAllProductsUnitList = async (
    pageNo: number,
    pageSize: number,
    searchKeyword: string | null
  ) => {
    setLoader(true);
    try {
      const res = await getAllProductUnit({
        pageNo,
        pageSize,
        searchKeyWord: searchKeyword || null,
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
    getAllProductsUnitList(newPageNo, pageSize, null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearch(input);
    getAllProductsUnitList(1, pageSize, input);
  };

  const filteredUsers = users.filter((user) =>
    user.productUnitName.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddProduct = () => {
    setModalRequestData({ Action: null, productUnitKeyID: null });
    setAddUpdateproductModal(true);
  };

  const handleUpdateProduct = (value: User) => {
    setModalRequestData({
      Action: "Update",
      productUnitKeyID: value.productUnitKeyID,
    });
    setAddUpdateproductModal(true);
  };

  const handleDeleteProduct = (productUnitKeyID: string) => {
    setModalRequestData({ Action: "Delete", productUnitKeyID });
    setModelAction("Delete");
    setShowConfirmationPopUp(true);
  };

  const confirmChangeStatus = (user: User) => {
    setModalRequestData({
      Action: "Status",
      productUnitKeyID: user.productUnitKeyID,
    });
    setModelAction("Status");
    setShowConfirmationPopUp(true);
  };

  const handleConfirmBtn = async () => {
    if (!modelAction || !modalRequestData.productUnitKeyID) return;
    setLoader(true);

    try {
      let data;
      if (modelAction === "Delete") {
        data = await deleteProductUnit(modalRequestData.productUnitKeyID);
      } else {
        data = await changeProductUnitStatus(modalRequestData.productUnitKeyID);
      }

      if (data?.statusCode === 200) {
        // Set success message dynamically
        setSuccessMessage(
          modelAction === "Delete"
            ? "Product Unit deleted successfully!"
            : "Product Unit status updated successfully!"
        );

        setShowConfirmationPopUp(false);
        setShowSuccessPopUp(true);
        getAllProductsUnitList(pageNo, pageSize, search);
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

        <Tooltip title="Add Product Unit">
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
            + Add Product Unit
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
              <th className="text-success">Sr. no</th>
              <th className="text-success">Product Unit Name</th>
              <th className="text-success">Status</th>
              <th className="text-success">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.productUnitKeyID}>
                  <td>{(currentPage - 1) * pageSize + (index + 1)}</td>
                  <td>{user.productUnitName}</td>
                  <td className="d-flex align-items-center">
                    <Tooltip title="Change Status">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Android12Switch
                              onClick={() => confirmChangeStatus(user)}
                              checked={user.status === "Active"}
                            />
                          }
                          label=""
                        />
                      </FormGroup>
                    </Tooltip>
                  </td>
                  <td>
                    <Tooltip title="Update Product Unit">
                      <span
                        style={{ cursor: "pointer", marginRight: "10px" }}
                        onClick={() => handleUpdateProduct(user)}
                      >
                        <FaPencilAlt size={20} color="#2e7d32" />
                      </span>
                    </Tooltip>

                    <Tooltip title="Delete Product Unit">
                      <span
                        style={{ cursor: "pointer", marginRight: "10px" }}
                        onClick={() =>
                          handleDeleteProduct(user.productUnitKeyID)
                        }
                      >
                        <FaTrash size={20} color="#808080" />
                      </span>
                    </Tooltip>
                    {/* <Tooltip title="Add Image">
  <span
    style={{ cursor: "pointer" }}
    onClick={() =>
      navigate("/admin/product-image", {
        state: { productUnitKeyID: user.productUnitKeyID },
      })
    }
  >
    <FaImage size={20} color="#2e7d32" />
  </span>
</Tooltip> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center text-muted py-3">
                  No product unit found.
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
            ? "Are you sure you want to delete this product unit?"
            : "Are you sure you want to change the status?"
        }
        onConfirm={handleConfirmBtn}
      />

      <ProductUnitAddUpdate
        show={addUpdateProductModal}
        onHide={() => setAddUpdateproductModal(false)}
        modalRequestData={modalRequestData}
        setAddUpdateActionDone={setAddUpdateActionDone}
      />
    </div>
  );
};

export default ProductUnitList;
