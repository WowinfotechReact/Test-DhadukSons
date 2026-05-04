import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaSyncAlt } from "react-icons/fa";
import { GetAllBanners } from "../../APIServices/BannerAPI/BannerAPI";
import PaginationComponent from "../../components/Pagination";
import { FormControlLabel, FormGroup, Tooltip } from "@mui/material";
import {
  changeBlogStatusAPI,
  GetAllBlogs,
} from "../../APIServices/BlogAPI/BlogAPI";
import AddUpdateBlogModal from "./AddUpdateBlog";
import Android12Switch from "../../components/Android12Switch";
import { useLoader } from "../../Context/Context";
import ConfirmationPopUP from "../../components/ConfirmationPopUP";

interface Blog {
  blogKeyID: string;
  title: string;
  featureImage: string;
  status: string;
  blogDescription: string;
  publishDate: string;
  author: string;
}

interface ModalRequestData {
  Action: string | null;
  blogKeyID: string | null;
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [addUpdateBlogModal, setAddUpdateBlogModal] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmationPopUp, setShowConfirmationPopUp] = useState(false);
  const [addUpdateActionDone, setAddUpdateActionDone] = useState(false);
  const [modalRequestData, setModalRequestData] = useState<ModalRequestData>({
    Action: null,
    blogKeyID: null,
  });
  const [search, setSearch] = useState("");
  const { setLoader } = useLoader();

  useEffect(() => {
    GetAllBlogsList(pageNo, pageSize);
  }, []);

  useEffect(() => {
    if (addUpdateActionDone) {
      GetAllBlogsList(pageNo, pageSize);
    }
    setAddUpdateActionDone(false);
  }, [addUpdateActionDone]);

  const GetAllBlogsList = async (pageNo: number, pageSize: number) => {
    setLoader(true);
    try {
      const res = await GetAllBlogs({
        pageNo: pageNo,
        pageSize: pageSize,
        searchKeyWord: null,
        fromDate: null,
        toDate: null,
      });

      if (res.statusCode === 200) {
        setLoader(false);
        setTotalCount(res.totalCount);
        setBlogs(res.responseData?.data || []);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddUser = () => {
    setModalRequestData((prev) => ({
      ...prev,
      Action: null,
      blogKeyID: null,
    }));
    setAddUpdateBlogModal(true);
  };

  const handleUpdateBanner = (value: any) => {
    setModalRequestData((prev) => ({
      ...prev,
      Action: "Update",
      blogKeyID: value.blogKeyID,
    }));
    setAddUpdateBlogModal(true);
  };

  const handlePageChange = (newPageNo: number) => {
    setPageNo(newPageNo);
    setCurrentPage(newPageNo);
    GetAllBlogsList(newPageNo, pageSize);
  };

  const handleChangeStatus = async () => {
    try {
      const res = await changeBlogStatusAPI(modalRequestData.blogKeyID);

      if (res.statusCode === 200) {
        GetAllBlogsList(pageNo, pageSize);
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
      blogKeyID: value.blogKeyID,
    }));
    setShowConfirmationPopUp(true);
  };

  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "");

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
        <Tooltip title="Add Blog">
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
            + Add Blog
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
              <th className="text-success">Title</th>
              <th className="text-success text-center">Blog Image</th>
              <th className="text-success">Author</th>
              <th className="text-success">Blog Description</th>
              <th className="text-success">Publish Date</th>
              <th className="text-success">Status</th>
              <th className="text-success">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog, index) => (
                <tr key={blog.blogKeyID}>
                  <td>{(currentPage - 1) * pageSize + (index + 1)}</td>
                  <td>{blog.title}</td>
                  <td className="text-center">
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                      src={blog.featureImage}
                      alt="Blog"
                    />
                  </td>
                  <td>{blog.author}</td>
                  <td>
                    {stripHtml(blog.blogDescription).length > 15 ? (
                      <Tooltip title={stripHtml(blog.blogDescription)}>
                        <span>
                          {stripHtml(blog.blogDescription).substring(0, 15) +
                            "...."}
                        </span>
                      </Tooltip>
                    ) : (
                      stripHtml(blog.blogDescription)
                    )}
                  </td>

                  <td>
                    {new Date(blog.publishDate).toLocaleDateString("en-CA")}
                  </td>

                  <td
                    style={{ height: "117px" }}
                    className="Switch table-content-font d-flex align-items-center "
                  >
                    <div className="d-flex gap-2 align-items-center">
                      {/* <div style={{ width: "50px" }}>{user.status}</div> */}

                      <Tooltip title="Change Status">
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Android12Switch
                                onClick={() => confirmChangeStatus(blog)}
                                checked={blog.status === "Active"}
                              />
                            }
                            label="" // Avoid label misalignment
                          />
                        </FormGroup>
                      </Tooltip>
                    </div>
                  </td>
                  <Tooltip title="Update Blog">
                    <td>
                      <span
                        onClick={() => handleUpdateBanner(blog)}
                        style={{ cursor: "pointer" }}
                      >
                        <FaPencilAlt size={20} color="#2e7d32" />
                      </span>
                    </td>
                  </Tooltip>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-muted py-3">
                  No blogs found.
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

      <AddUpdateBlogModal
        show={addUpdateBlogModal}
        onHide={() => setAddUpdateBlogModal(false)}
        modalRequestData={modalRequestData}
        setAddUpdateActionDone={setAddUpdateActionDone}
      />
    </div>
  );
};

export default BlogList;
