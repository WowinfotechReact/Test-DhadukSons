import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaSyncAlt } from "react-icons/fa";
import { GetAllBanners } from "../../APIServices/BannerAPI/BannerAPI";
import { GetAllImages } from "../../APIServices/ImageAPI/ImageAPI";
import PaginationComponent from "../../components/Pagination";
import { FormControlLabel, FormGroup, Tooltip } from "@mui/material";
import { GetAllProdCat } from "../../APIServices/ProdCatAPI/ProdCatAPI";
import Android12Switch from "../../components/Android12Switch";
import AddUpdateProdCatModal from "./AddUpdateProdCat";
import { useLoader } from "../../Context/Context";

interface productCategory {
  productCatKeyID: string;
  productCatName: string;
  status: string;
}

interface ModalRequestData {
  Action: string | null;
  productCatKeyID: string | null;
}

const ProductCategoryList: React.FC = () => {
  const [prodCat, setProdCat] = useState<productCategory[]>([]);
  const [addUpdateImageModal, setAddUpdateImageModal] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [addUpdateActionDone, setAddUpdateActionDone] = useState(false);
  const [modalRequestData, setModalRequestData] = useState<ModalRequestData>({
    Action: null,
    productCatKeyID: null,
  });
  const [search, setSearch] = useState("");
  const { setLoader } = useLoader();

  useEffect(() => {
    GetAllProdCatList(pageNo, pageSize);
  }, []);

  useEffect(() => {
    if (addUpdateActionDone) {
      GetAllProdCatList(pageNo, pageSize);
    }
    setAddUpdateActionDone(false);
  }, [addUpdateActionDone]);

  const GetAllProdCatList = async (pageNo: number, pageSize: number) => {
    setLoader(true);
    try {
      const res = await GetAllProdCat({
        pageNo: pageNo,
        pageSize: pageSize,
        searchKeyWord: null,
        fromDate: null,
        toDate: null,
      });

      if (res.statusCode === 200) {
        setLoader(false);
        setTotalCount(res.totalCount);
        setProdCat(res.responseData?.data || []);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredProdCat = prodCat.filter((prodCat) =>
    prodCat.productCatName.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddProdCat = () => {
    setModalRequestData((prev) => ({
      ...prev,
      Action: null,
      productCatKeyID: null,
    }));
    setAddUpdateImageModal(true);
  };

  const handleUpdateProdCat = (value: any) => {
    setModalRequestData((prev) => ({
      ...prev,
      Action: "Update",
      productCatKeyID: value.productCatKeyID,
    }));
    setAddUpdateImageModal(true);
  };

  const handlePageChange = (newPageNo: number) => {
    setPageNo(newPageNo);
    GetAllProdCatList(newPageNo, pageSize);
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
        <Tooltip title="Add Product Category">
          <button
            className=" fw-semibold px-4 py-2"
            style={{
              backgroundColor: "#2e7d32",
              color: "white",
              borderRadius: "0.375rem",
              padding: "10px 0",
              whiteSpace: "nowrap",
            }}
            onClick={handleAddProdCat}
          >
            Add Category
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
              <th className="text-success">Product Category</th>
              {/* <th className="text-success">Status</th> */}
              <th className="text-success">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProdCat.length > 0 ? (
              filteredProdCat.map((prodCat) => (
                <tr key={prodCat.productCatKeyID}>
                  <td>{prodCat.productCatName}</td>
                  <td onClick={() => handleUpdateProdCat(prodCat)}>
                    <Tooltip title="Update Image">
                      <span style={{ cursor: "pointer" }}>
                        <FaPencilAlt size={20} color="#2e7d32" />
                      </span>
                    </Tooltip>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-muted py-3">
                  No Product Categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
      </div>

      <AddUpdateProdCatModal
        show={addUpdateImageModal}
        onHide={() => setAddUpdateImageModal(false)}
        modalRequestData={modalRequestData}
        setAddUpdateActionDone={setAddUpdateActionDone}
      />
    </div>
  );
};

export default ProductCategoryList;
