import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaSyncAlt } from "react-icons/fa";
import {
  changeBannerStatusAPI,
  GetAllBanners,
} from "../../APIServices/BannerAPI/BannerAPI";
import AddUpdateBannerModal from "./AddUpdateBanner";
import PaginationComponent from "../../components/Pagination";
import { FormControlLabel, FormGroup, Tooltip } from "@mui/material";
import Android12Switch from "../../components/Android12Switch";
import { useLoader } from "../../Context/Context";
import ConfirmationPopUP from "../../components/ConfirmationPopUP";

interface Banner {
  bannerKeyID: string;
  bannerTitle: string;
  bannerSubTitle: string;
  bannerImage: string;
  status: string;
  createdAt: string;
}

interface ModalRequestData {
  Action: string | null;
  bannerKeyID: string | null;
}

const BannerList: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [addUpdateBannerModal, setAddUpdateBannerModal] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [showConfirmationPopUp, setShowConfirmationPopUp] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [addUpdateActionDone, setAddUpdateActionDone] = useState(false);
  const [modalRequestData, setModalRequestData] = useState<ModalRequestData>({
    Action: null,
    bannerKeyID: null,
  });
  const [search, setSearch] = useState("");
  const { setLoader } = useLoader();

  useEffect(() => {
    GetAllBannerList(pageNo, pageSize);
  }, []);

  useEffect(() => {
    if (addUpdateActionDone) {
      GetAllBannerList(pageNo, pageSize);
    }
    setAddUpdateActionDone(false);
  }, [addUpdateActionDone]);

  const GetAllBannerList = async (pageNo: number, pageSize: number) => {
    setLoader(true);
    try {
      const res = await GetAllBanners({
        pageNo: pageNo,
        pageSize: pageSize,
        searchKeyWord: null,
        fromDate: null,
        toDate: null,
      });

      if (res.statusCode === 200) {
        setLoader(false);
        setTotalCount(res.totalCount);
        setBanners(res.responseData?.data || []);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredBanners = banners.filter((banner) =>
    banner.bannerTitle.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddUser = () => {
    setModalRequestData((prev) => ({
      ...prev,
      Action: null,
      bannerKeyID: null,
    }));
    setAddUpdateBannerModal(true);
  };

  const handleUpdateBanner = (value: any) => {
    setModalRequestData((prev) => ({
      ...prev,
      Action: "Update",
      bannerKeyID: value.bannerKeyID,
    }));
    setAddUpdateBannerModal(true);
  };

  const handlePageChange = (newPageNo: number) => {
    setPageNo(newPageNo);
    setCurrentPage(newPageNo);
    GetAllBannerList(newPageNo, pageSize);
  };

  const handleChangeStatus = async () => {
    try {
      const res = await changeBannerStatusAPI(modalRequestData.bannerKeyID);

      if (res.statusCode === 200) {
        GetAllBannerList(pageNo, pageSize);
        setShowConfirmationPopUp(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirmChangeStatus = (value: any) => {
    // debugger;
    setModalRequestData((prev) => ({
      ...prev,
      bannerKeyID: value.bannerKeyID,
    }));
    setShowConfirmationPopUp(true);
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
        <Tooltip title="Add Banner">
          <button
            className=" fw-semibold px-4 py-2"
            style={{
              backgroundColor: "#2e7d32",
              color: "white",
              borderRadius: "0.375rem",
              padding: "10px 0",
              whiteSpace: "nowrap",
            }}
            onClick={handleAddUser}
          >
            + Add Banner
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
              <th className="text-success">Banner Title</th>
              <th className="text-success">Banner Sub Title</th>
              <th className="text-success text-center">Banner Image</th>
              <th className="text-success">Status</th>
              <th className="text-success">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBanners.length > 0 ? (
              filteredBanners.map((banner, index) => (
                <tr key={banner.bannerKeyID}>
                  <td>{(currentPage - 1) * pageSize + (index + 1)}</td>
                  <td>{banner.bannerTitle}</td>
                  <td>{banner.bannerSubTitle}</td>
                  <td className="text-center">
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                      src={banner.bannerImage}
                      alt="Banner"
                    />
                  </td>
                  <td
                    className="Switch table-content-font d-flex align-items-center "
                    style={{ lineHeight: "2.5", height: "117px" }}
                  >
                    <div className="d-flex gap-2 align-items-center">
                      {/* <div style={{ width: "50px" }}>{user.status}</div> */}

                      <Tooltip title="Change Status">
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Android12Switch
                                onClick={() => confirmChangeStatus(banner)}
                                checked={banner.status === "Active"}
                              />
                            }
                            label="" // Avoid label misalignment
                          />
                        </FormGroup>
                      </Tooltip>
                    </div>
                  </td>
                  <td onClick={() => handleUpdateBanner(banner)}>
                    <Tooltip title="Update Banner">
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
                  No banners found.
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

      <ConfirmationPopUP
        show={showConfirmationPopUp}
        onHide={() => setShowConfirmationPopUp(false)}
        message={"Are you sure, you want to change the status?"}
        onConfirm={handleChangeStatus}
      />

      <AddUpdateBannerModal
        show={addUpdateBannerModal}
        onHide={() => setAddUpdateBannerModal(false)}
        modalRequestData={modalRequestData}
        setAddUpdateActionDone={setAddUpdateActionDone}
      />
    </div>
  );
};

export default BannerList;
