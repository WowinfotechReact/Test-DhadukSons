import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaSyncAlt } from "react-icons/fa";
import { GetAllBanners } from "../../../APIServices/BannerAPI/BannerAPI";
import { Tooltip } from "@mui/material";
import PaginationComponent from "../../../components/Pagination";
import { useLoader } from "../../../Context/Context";
import { useLocation } from "react-router-dom";
import { getAllProductImageByProductID } from "../../../APIServices/ProductImageApi/ProductImageApi";
import AddUpdateProductImage from "./AddUpdateImage";

interface image {
  productImageKeyID: string;
  image: string;
  backImage: string;
  status: string;
}

interface ModalRequestData {
  Action: string | null;
  productImageKeyID: string | null;
}
const ProductImageList: React.FC = () => {
  const location = useLocation();
  const productKeyID = location.state?.productKeyID;

  const [images, setImages] = useState<image[]>([]);
  const [addUpdateImageModal, setAddUpdateImageModal] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [addUpdateActionDone, setAddUpdateActionDone] = useState(false);
  const [modalRequestData, setModalRequestData] = useState<ModalRequestData>({
    Action: null,
    productImageKeyID: null,
  });
  const [search, setSearch] = useState("");
  const { setLoader } = useLoader();

  useEffect(() => {
    GetAllImageList(pageNo, pageSize);
  }, []);

  useEffect(() => {
    if (addUpdateActionDone) {
      GetAllImageList(pageNo, pageSize);
      setAddUpdateActionDone(false);
    }
  }, [addUpdateActionDone]);

  const GetAllImageList = async (pageNo: number, pageSize: number) => {
    setLoader(true);
    try {
      const res = await getAllProductImageByProductID(productKeyID);

      setLoader(false);
      if (res.statusCode === 200) {
        setTotalCount(res.totalCount || 0);

        // Transform API response to match the expected structure
        const mappedImages =
          res.responseData?.data?.map((item: any) => ({
            productImageKeyID: item.productImageKeyID,
            image: item.imageUrl, // map imageUrl to image
            backImage: item.imageUrlBack,
            status: item.status,
          })) || [];

        setImages(mappedImages);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAddImage = () => {
    setModalRequestData({ Action: null, productImageKeyID: null });
    setAddUpdateImageModal(true);
  };

  const handleUpdateImage = (value: image) => {
    setModalRequestData({
      Action: "Update",
      productImageKeyID: value.productImageKeyID,
    });
    setAddUpdateImageModal(true);
  };

  const handlePageChange = (newPageNo: number) => {
    setPageNo(newPageNo);
    GetAllImageList(newPageNo, pageSize);
  };

  const filteredImages = images.filter((img) =>
    img.image?.toLowerCase().includes(search.toLowerCase())
  );

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
        <Tooltip title="Add Image">
          <button
            className="fw-semibold px-4 py-2"
            style={{
              backgroundColor: "#2e7d32",
              color: "white",
              borderRadius: "0.375rem",
              padding: "10px 0",
              whiteSpace: "nowrap",
            }}
            onClick={handleAddImage}
          >
            + Add Product Image
          </button>
        </Tooltip>
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
              <th className="text-success">Front Image</th>
              <th className="text-success">Back Image</th>
              <th className="text-success">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredImages.length > 0 ? (
              filteredImages.map((image) => (
                <tr key={image.productImageKeyID}>
                  <td className="text-center">
                    <img
                      src={image.image}
                      alt="Product"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                    />
                  </td>
                  <td className="text-center">
                    <img
                      src={image.backImage}
                      alt="Product"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                    />
                  </td>
                  <td className="text-center">
                    <Tooltip title="Update Image">
                      <span
                        onClick={() => handleUpdateImage(image)}
                        style={{ cursor: "pointer" }}
                      >
                        <FaPencilAlt size={20} color="#2e7d32" />
                      </span>
                    </Tooltip>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center text-muted py-3">
                  No images found.
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

      <AddUpdateProductImage
        show={addUpdateImageModal}
        onHide={() => setAddUpdateImageModal(false)}
        modalRequestData={{
          ...modalRequestData,
          productKeyID: productKeyID, // ✅ included inside modalRequestData
        }}
        setAddUpdateActionDone={setAddUpdateActionDone}
      />
    </div>
  );
};

export default ProductImageList;
