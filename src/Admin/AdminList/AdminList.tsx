import React, { useState, useEffect } from "react";
import {
  changeAdminStatusAPI,
  GetAllAdmins,
} from "../../APIServices/AdminAPI/AdminAPI";
import AddUpdateAdminModal from "./AddUpdateAdminModal";
import { Prev } from "react-bootstrap/esm/PageItem";
import { MdUpdate } from "react-icons/md";
import { FaPencilAlt, FaSyncAlt } from "react-icons/fa";
import PaginationComponent from "../../components/Pagination";
import { FormControlLabel, FormGroup, Tooltip } from "@mui/material";
import Android12Switch from "../../components/Android12Switch";
import SuccessPopUP from "../../components/SuccessPopUp";
import { useLoader } from "../../Context/Context";
import ConfirmationPopUP from "../../components/ConfirmationPopUP";

interface User {
  adminKeyID: string;
  firstName: string;
  lastName: string;
  phoneNo: string;
  email: string;
  status: string;
  createdAt: string;
}

interface ModalRequestData {
  Action: string | null;
  adminKeyID: string | null;
}

const AdminList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [addUpdateAdminModal, setAddUpdateAdminModal] = useState(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
  const [showConfirmationPopUp, setShowConfirmationPopUp] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [addUpdateActionDone, setAddUpdateActionDone] = useState(false);
  const [modalRequestData, setModalRequestData] = useState<ModalRequestData>({
    Action: null,
    adminKeyID: null,
  });
  const [search, setSearch] = useState("");
  const { setLoader } = useLoader();

  useEffect(() => {
    GetAllAdminsList(pageNo, pageSize, null);
  }, []);

  useEffect(() => {
    if (addUpdateActionDone) {
      GetAllAdminsList(pageNo, pageSize, null);
    }
    setAddUpdateActionDone(false);
  }, [addUpdateActionDone]);

  const GetAllAdminsList = async (
    pageNo: number,
    pageSize: number,
    searchKeyword: string | null
  ) => {
    setLoader(true);
    try {
      const res = await GetAllAdmins({
        pageNo: pageNo,
        pageSize: pageSize,
        searchKeyWord: searchKeyword ? searchKeyword : null,
        fromDate: null,
        toDate: null,
      });

      if (res.statusCode === 200) {
        setLoader(false);
        setTotalCount(res.totalCount);
        setUsers(res.responseData?.data || []);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const input = e.target.value;
    GetAllAdminsList(1, pageSize, input);
  };

  const filteredUsers = users.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddUser = () => {
    setModalRequestData((prev) => ({
      ...prev,
      Action: null,
      adminKeyID: null,
    }));
    setAddUpdateAdminModal(true);
  };

  const handleUpdateAdmin = (value: any) => {
    setModalRequestData((prev) => ({
      ...prev,
      Action: "Update",
      adminKeyID: value.adminKeyID,
    }));
    setAddUpdateAdminModal(true);
  };

  const handlePageChange = (newPageNo: number) => {
    setPageNo(newPageNo);
    setCurrentPage(newPageNo);
    GetAllAdminsList(newPageNo, pageSize, null);
  };

  const handleChangeStatus = async () => {
    try {
      const res = await changeAdminStatusAPI(modalRequestData.adminKeyID);

      if (res.statusCode === 200) {
        GetAllAdminsList(pageNo, pageSize, null);
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
      adminKeyID: value.adminKeyID,
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

        <Tooltip title="Add Admin">
          <button
            className="fw-semibold px-4 py-2"
            style={{
              backgroundColor: "#2e7d32",
              color: "white",
              borderRadius: "0.375rem",
              whiteSpace: "nowrap",
            }}
            onClick={handleAddUser}
          >
            + Add Admin
          </button>
        </Tooltip>
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
              <th className="text-success">Sr No.</th>
              <th className="text-success">Name</th>
              <th className="text-success">Email</th>
              <th className="text-success">Phone</th>
              <th className="text-success">Status</th>
              <th className="text-success">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.adminKeyID}>
                  <td>{(currentPage - 1) * pageSize + (index + 1)}</td>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phoneNo}</td>
                  <td className="Switch table-content-font d-flex align-items-center ">
                    <div className="d-flex gap-2 align-items-center">
                      {/* <div style={{ width: "50px" }}>{user.status}</div> */}

                      <Tooltip title="Change Status">
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Android12Switch
                                onClick={() => confirmChangeStatus(user)}
                                checked={user.status === "Active"}
                              />
                            }
                            label="" // Avoid label misalignment
                          />
                        </FormGroup>
                      </Tooltip>
                    </div>
                  </td>
                  <td onClick={() => handleUpdateAdmin(user)}>
                    <Tooltip title="Update Admin">
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
                  No admin user found.
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
        message={"Are you sure, you want to change the status?"}
        onConfirm={handleChangeStatus}
      />

      {/* Modal */}
      <AddUpdateAdminModal
        show={addUpdateAdminModal}
        onHide={() => setAddUpdateAdminModal(false)}
        modalRequestData={modalRequestData}
        setAddUpdateActionDone={setAddUpdateActionDone}
      />
    </div>
  );
};

export default AdminList;
