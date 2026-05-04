import React, { useState, useEffect } from "react";
import {
  changeAdminStatusAPI,
  GetAllAdmins,
} from "../../APIServices/AdminAPI/AdminAPI";
import { Prev } from "react-bootstrap/esm/PageItem";
import { MdUpdate } from "react-icons/md";
import { FaEye, FaPencilAlt, FaSyncAlt } from "react-icons/fa";
import PaginationComponent from "../../components/Pagination";
import { FormControlLabel, FormGroup } from "@mui/material";
import Android12Switch from "../../components/Android12Switch";
import SuccessPopUP from "../../components/SuccessPopUp";
import {
  changeEnquiryStatusAPI,
  GetAllEnquiriesAPI,
} from "../../APIServices/EnquiryAPI/EnquiryAPI";
import AddUpdateEnquiryModal from "./AddUpdateEnquiry";
import { useLoader } from "../../Context/Context";
import ConfirmationPopUP from "../../components/ConfirmationPopUP";
import dayjs from "dayjs";
import { Tooltip } from '@mui/material';


interface Enquiry {
  enquiryKeyID: null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  message: string;
  status: string;
  Date: string;
}

interface ModalRequestData {
  Action: string | null;
  enquiryKeyID: string | null;
}

const EnquiryList: React.FC = () => {
  const [enquiry, setEnquiry] = useState<Enquiry[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [addUpdateAdminModal, setAddUpdateAdminModal] = useState(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showConfirmationPopUp, setShowConfirmationPopUp] = useState(false);
  const [addUpdateActionDone, setAddUpdateActionDone] = useState(false);
  const [modalRequestData, setModalRequestData] = useState<ModalRequestData>({
    Action: null,
    enquiryKeyID: null,
  });
  const [search, setSearch] = useState("");
  const { setLoader } = useLoader();

  useEffect(() => {
    GetAllEnquiryList(pageNo, pageSize, null);
  }, []);

  useEffect(() => {
    if (addUpdateActionDone) {
      GetAllEnquiryList(pageNo, pageSize, null);
    }
    setAddUpdateActionDone(false);
  }, [addUpdateActionDone]);

  const GetAllEnquiryList = async (
    pageNo: number,
    pageSize: number,
    searchKeyword: string | null
  ) => {
    setLoader(true);
    try {
      const res = await GetAllEnquiriesAPI({
        pageNo: pageNo,
        pageSize: pageSize,
        searchKeyWord: searchKeyword ? searchKeyword : null,
        fromDate: null,
        toDate: null,
      });

      if (res.statusCode === 200) {
        setLoader(false);
        setTotalCount(res.totalCount);

        setEnquiry(res.responseData?.data || []);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const input = e.target.value;
    GetAllEnquiryList(1, pageSize, input);
  };

  const filteredEnquiry = enquiry.filter(
    (enq) =>
      `${enq.firstName} ${enq.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      enq.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddEnquiry = () => {
    setModalRequestData((prev) => ({
      ...prev,
      Action: null,
      enquiryKeyID: null,
    }));
    setAddUpdateAdminModal(true);
  };

  const handleUpdateAdmin = (value: any) => {
    setModalRequestData((prev) => ({
      ...prev,
      Action: "Update",
      enquiryKeyID: value.enquiryKeyID,
    }));
    setAddUpdateAdminModal(true);
  };

  const handlePageChange = (newPageNo: number) => {
    setPageNo(newPageNo);
    GetAllEnquiryList(newPageNo, pageSize, null);
  };

  const handleChangeStatus = async () => {
    try {
      const res = await changeEnquiryStatusAPI(modalRequestData.enquiryKeyID);

      if (res.statusCode === 200) {
        GetAllEnquiryList(pageNo, pageSize, null);
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
      enquiryKeyID: value.enquiryKeyID,
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

        {/* <Tooltip title="Add Enquiry">
          <button
            className="fw-semibold px-4 py-2"
            style={{
              backgroundColor: "#2e7d32",
              color: "white",
              borderRadius: "0.375rem",
              whiteSpace: "nowrap",
            }}
            onClick={handleAddEnquiry}
          >
            + Add Enquiry
          </button>
        </Tooltip> */}
      </div>

      {/* Table Container with Scroll */}
      <div
        className="table-responsive"
        style={{
          maxHeight: "64vh",
          overflowY: "auto",
          overflowX: "auto",
        }}
      >
        <table
          className="table table-bordered table-hover mb-0 overflow-auto"
          style={{ overflow: "scroll" }}
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
              <th className="text-success tableHead">Sr. no</th> {/* 👈 Added column */}
              <th className="text-success tableHead">Name</th>
              <th className="text-success tableHead">Email</th>
              <th className="text-success tableHead">Phone</th>
              <th className="text-success tableHead">Massage</th>
              <th className="text-success tableHead">Enquiry Date</th>
              <th className="text-success tableHead">Status</th>
              <th className="text-success tableHead">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEnquiry.length > 0 ? (
              filteredEnquiry.map((enquiry, index) => (
                <tr key={enquiry.enquiryKeyID}>
                  <td>{index + 1}</td> {/* 👈 SR.No column */}
                  <td>
                    {enquiry.firstName} {enquiry.lastName}
                  </td>
                  <td>{enquiry.email}</td>
                  <td>{enquiry.phoneNumber}</td>
                  <td>
                    {enquiry.message?.length > 35 ? (
                      <Tooltip title={enquiry.message} arrow>
                        <span className="cursor-pointer">{enquiry.message.substring(0, 35)}...</span>
                      </Tooltip>
                    ) : (
                      enquiry.message || '-'
                    )}
                  </td>
                  <td>{dayjs(enquiry?.Date).format('DD/MM/YYYY')}</td>
                  <td
                    style={{ height: "87px" }}
                    className="Switch table-content-font d-flex align-items-center "
                  >
                    <div className="d-flex gap-2 align-items-center">
                      <Tooltip title="Change Status">
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Android12Switch
                                onClick={() => confirmChangeStatus(enquiry)}
                                checked={enquiry.status === "Active"}
                              />
                            }
                            label=""
                          />
                        </FormGroup>
                      </Tooltip>
                    </div>
                  </td>
                  <td onClick={() => handleUpdateAdmin(enquiry)}>
                    <Tooltip title="View Enquiry">
                      <span style={{ cursor: "pointer" }}>
                        <FaEye size={20} color="#2e7d32" />
                      </span>
                    </Tooltip>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center text-muted py-3">
                  No enquiry found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
        message={"Status changed successfully!"}
      />

      <ConfirmationPopUP
        show={showConfirmationPopUp}
        onHide={() => setShowConfirmationPopUp(false)}
        message={"Are you sure, you want to complete the enquiry?"}
        onConfirm={handleChangeStatus}
      />

      {/* Modal */}
      <AddUpdateEnquiryModal
        show={addUpdateAdminModal}
        onHide={() => setAddUpdateAdminModal(false)}
        modalRequestData={modalRequestData}
        setAddUpdateActionDone={setAddUpdateActionDone}
      />
    </div>
  );
};

export default EnquiryList;
