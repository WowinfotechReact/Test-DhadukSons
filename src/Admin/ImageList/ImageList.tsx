import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaSyncAlt } from "react-icons/fa";
import { GetAllBanners } from "../../APIServices/BannerAPI/BannerAPI";
import { GetAllImages } from "../../APIServices/ImageAPI/ImageAPI";
import AddUpdateImageModal from "./AddUpdateImageModal";
import PaginationComponent from "../../components/Pagination";
import { Tooltip } from "@mui/material";
import { useLoader } from "../../Context/Context";

interface image {
  imageKeyID: string;
  imageTitle: string;
  image: string;
  status: string;
  createdAt: string;
}

interface ModalRequestData {
  Action: string | null;
  imageKeyID: string | null;
}

const ImageList: React.FC = () => {
  const [images, setImages] = useState<image[]>([]);
  const [addUpdateImageModal, setAddUpdateImageModal] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [addUpdateActionDone, setAddUpdateActionDone] = useState(false);
  const [modalRequestData, setModalRequestData] = useState<ModalRequestData>({
    Action: null,
    imageKeyID: null,
  });
  const [search, setSearch] = useState("");
  const { setLoader } = useLoader();

  useEffect(() => {
    GetAllImageList(pageNo, pageSize);
  }, []);

  useEffect(() => {
    if (addUpdateActionDone) {
      GetAllImageList(pageNo, pageSize);
    }
    setAddUpdateActionDone(false);
  }, [addUpdateActionDone]);

  const GetAllImageList = async (pageNo: number, pageSize: number) => {
    setLoader(true);
    try {
      const res = await GetAllImages({
        pageNo: pageNo,
        pageSize: pageSize,
        searchKeyWord: null,
        fromDate: null,
        toDate: null,
      });

      if (res.statusCode === 200) {
        setLoader(false);
        setTotalCount(res.totalCount);
        setImages(res.responseData?.data || []);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredImages = images.filter((image) =>
    image.imageTitle.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddImage = () => {
    setModalRequestData((prev) => ({
      ...prev,
      Action: null,
      imageKeyID: null,
    }));
    setAddUpdateImageModal(true);
  };

  const handleUpdateImage = (value: any) => {
    setModalRequestData((prev) => ({
      ...prev,
      Action: "Update",
      imageKeyID: value.imageKeyID,
    }));
    setAddUpdateImageModal(true);
  };

  const handlePageChange = (newPageNo: number) => {
    setPageNo(newPageNo);
    setCurrentPage(newPageNo);
    GetAllImageList(newPageNo, pageSize);
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
        <Tooltip title="Add Image">
          <button
            className=" fw-semibold px-4 py-2"
            style={{
              backgroundColor: "#2e7d32",
              color: "white",
              borderRadius: "0.375rem",
              padding: "10px 0",
              whiteSpace: "nowrap",
            }}
            onClick={handleAddImage}
          >
            + Add Image
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
              <th className="text-success">Sr no.</th>
              <th className="text-success">Image Title</th>
              <th className="text-success">Image</th>
              {/* <th className="text-success">Status</th> */}
              <th className="text-success">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredImages.length > 0 ? (
              filteredImages.map((image, index) => (
                <tr key={image.imageKeyID}>
                  <td>{(currentPage - 1) * pageSize + (index + 1)}</td>
                  <td>{image.imageTitle}</td>
                  <td
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                      src={image.image}
                      alt="Banner"
                    />
                  </td>
                  {/* <td>{image.status}</td> */}
                  <td onClick={() => handleUpdateImage(image)}>
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
                  No image found.
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

      <AddUpdateImageModal
        show={addUpdateImageModal}
        onHide={() => setAddUpdateImageModal(false)}
        modalRequestData={modalRequestData}
        setAddUpdateActionDone={setAddUpdateActionDone}
      />
    </div>
  );
};

export default ImageList;
