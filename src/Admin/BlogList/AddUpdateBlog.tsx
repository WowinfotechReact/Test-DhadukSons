import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
// import {
//   addUpdateBannerAPI,
//   getBannerByIDAPI,
// } from "../../APIServices/BannerAPI/BannerAPI";
import SuccessPopUP from "../../components/SuccessPopUp";
import {
  addUpdateBannerAPI,
  getBannerByIDAPI,
} from "../../APIServices/BannerAPI/BannerAPI";
import TextEditor from "../../components/TextEditor";
import {
  addUpdateBlogAPI,
  getBlogByIDAPI,
} from "../../APIServices/BlogAPI/BlogAPI";
import { useLoader } from "../../Context/Context";
import Text_Editor from "../../components/TextEditor";

interface BlogData {
  blogKeyID: string | null;
  title: string;
  featureImage: string;
  blogDescription: string;
  status: string;
  publishDate: string;
  author: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
}

interface AddUpdateBlogModalProps {
  show: boolean;
  onHide: () => void;
  modalRequestData: {
    Action: string | null;
    blogKeyID: string | null;
  };
  setAddUpdateActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultBlogData: BlogData = {
  blogKeyID: null,
  title: "",
  featureImage: "",
  blogDescription: "",
  status: "Active",
  publishDate: "",
  author: "",
  slug: "",
  metaTitle: "",
  metaDescription: "",
};

const AddUpdateBlogModal: React.FC<AddUpdateBlogModalProps> = ({
  show,
  onHide,
  modalRequestData,
  setAddUpdateActionDone,
}) => {
  const [formData, setFormData] = useState<BlogData>(defaultBlogData);
  const [error, setError] = useState(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
  const { setLoader } = useLoader();
  const [imageError, setImageError] = useState<string>("");

  useEffect(() => {
    if (modalRequestData.blogKeyID) {
      getBlogDataByID(modalRequestData.blogKeyID);
    } else {
      setFormData(defaultBlogData); // reset when adding new
    }
  }, [modalRequestData.blogKeyID]);

  useEffect(() => {
    if (modalRequestData?.blogKeyID) {
      getBlogDataByID(modalRequestData.blogKeyID);
    } else {
      setFormData(defaultBlogData); // reset when adding new
    }
  }, [modalRequestData]);

  const handleChange = (e: ChangeEvent<any>) => {
    setError(false);
    const { name, value } = e.target;
    let newValue = value;

    // Restrict Banner Title to only two words
    if (name === "title") {
      // 1. Prevent empty space as first character
      if (newValue.startsWith(" ")) {
        newValue = newValue.trimStart();
      }
      const generatedSlug = newValue
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

      setFormData((prev) => ({
        ...prev,
        title: newValue,
        slug: generatedSlug,
      }));
      return;
    } else if (name === "author") {
      if (newValue.startsWith(" ")) {
        newValue = newValue.trimStart();
      }

      // 2. Allow only letters and spaces (no digits/special chars)
      newValue = newValue.replace(/[^a-zA-Z\s]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = () => {
    // debugger;
    let isValid = false;

    if (
      formData.title === "" ||
      formData.title === null ||
      formData.title === undefined ||
      formData.featureImage === "" ||
      formData.featureImage === null ||
      formData.featureImage === undefined ||
      formData.blogDescription === "" ||
      formData.blogDescription === null ||
      formData.blogDescription === undefined ||
      formData.status === "" ||
      formData.status === null ||
      formData.status === undefined ||
      formData.slug === "" ||
      formData.slug === null ||
      formData.slug === undefined
    ) {
      isValid = true;
      setError(true);
      return;
    }

    const params = {
      blogKeyID: modalRequestData.blogKeyID,
      title: formData.title,
      featureImage: formData.featureImage,
      blogDescription: formData.blogDescription,
      author: formData.author,
      slug: formData.slug,
      metaTitle: formData.metaTitle,
      metaDescription: formData.metaDescription,
      publishDate: modalRequestData.blogKeyID
        ? formData.publishDate
        : new Date().toISOString().split("T")[0],
    };

    if (!isValid) {
      addUpdateBlogData(params);
    }
  };

  const addUpdateBlogData = async (params: any) => {
    setLoader(true);
    try {
      const res = await addUpdateBlogAPI(params);
      if (res.statusCode === 200) {
        setLoader(false);
        setAddUpdateActionDone(true);
        setShowSuccessPopUp(true);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const getBlogDataByID = async (blogKeyID: string | null) => {
    if (!blogKeyID) return;
    setLoader(true);
    try {
      const res = await getBlogByIDAPI(blogKeyID);
      if (res.statusCode === 200) {
        setLoader(false);
        const modalData = res.responseData.data;

        setFormData({
          blogKeyID: modalData.blogKeyID,
          title: modalData.title ?? "",
          featureImage: modalData.featureImage ?? "", // prevent null issues
          status: modalData.status ?? "Active",
          blogDescription: modalData.blogDescription ?? "", // HTML safe
          publishDate: modalData.publishDate
            ? modalData.publishDate.split(" ")[0] // Splits at the space and takes "2026-03-11"
            : "",
          author: modalData.author ?? "",
          slug: modalData.slug ?? "",
          metaTitle: modalData.metaTitle ?? "",
          metaDescription: modalData.metaDescription ?? "",
        });
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const closeAll = () => {
    setShowSuccessPopUp(false);
    onHide();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024) {
        setImageError("Image size must be less than 500KB");
        return;
      } else {
        setImageError("");
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          featureImage: reader.result as string, // base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      featureImage: "",
    }));
  };

  const setInitial = () => {
    setError(false);
    setFormData(defaultBlogData);
  };

  const handleEditorChange = React.useCallback((content: string) => {
    setFormData((prev) => ({
      ...prev,
      blogDescription: content,
    }));
  }, [])

  console.log(formData, "formData")
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header>
        <Modal.Title>
          {modalRequestData.blogKeyID ? "Update Blog" : "Add Blog"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Blog Title
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter blog title"
                  maxLength={255}
                />
                {error &&
                  (formData.title === "" ||
                    formData.title === null ||
                    formData.title === undefined) ? (
                  <span style={{ color: "red" }}>This field is required</span>
                ) : (
                  ""
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Publish Date <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="date" // Changed from "text" to "date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleChange}
                  placeholder="Enter Publish Date"
                  min={new Date().toISOString().split("T")[0]}
                />
                {error &&
                  (formData.publishDate === "" ||
                    formData.publishDate === null ||
                    formData.publishDate === undefined) ? (
                  <span style={{ color: "red" }}>This field is required</span>
                ) : (
                  ""
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Author <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Enter Author Name"
                  maxLength={255}
                />
                {error &&
                  (formData.author === "" ||
                    formData.author === null ||
                    formData.author === undefined) ? (
                  <span style={{ color: "red" }}>This field is required</span>
                ) : (
                  ""
                )}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Slug <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="example-blog-title"
                />
                {error &&
                  (formData.slug === "" ||
                    formData.slug === null ||
                    formData.slug === undefined) ? (
                  <span style={{ color: "red" }}>This field is required</span>
                ) : null}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Meta Title
                  {/* <span style={{ color: "red" }}>*</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  placeholder="SEO meta title"
                  maxLength={60}
                />
              </Form.Group>
            </Col>



            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Meta Description
                  {/* <span style={{ color: "red" }}>*</span> */}
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  placeholder="Enter meta description..."
                  maxLength={160}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Blog Image <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="file"
                  name="featureImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ lineHeight: "2.5" }}
                />

                {error &&
                  (formData.featureImage === "" ||
                    formData.featureImage === null ||
                    formData.featureImage === undefined) ? (
                  <span style={{ color: "red" }}>This field is required</span>
                ) : null}

                {imageError && (
                  <span style={{ color: "red" }}>{imageError}</span>
                )}

                {formData.featureImage && !imageError && (
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                      marginTop: "10px",
                    }}
                  >
                    <span
                      onClick={handleRemoveImage}
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        backgroundColor: "white",
                        border: "1px solid #ccc",
                        borderRadius: "50%",
                        cursor: "pointer",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "bold",
                        zIndex: 1,
                      }}
                      title="Remove Image"
                    >
                      ✖
                    </span>

                    <img
                      src={formData.featureImage}
                      alt="Preview"
                      style={{
                        width: "120px",
                        height: "auto",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                )}

                {/* Note below upload field */}
                <div
                  style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}
                >
                  * Allowed size: up to 500KB
                </div>
              </Form.Group>
            </Col>



            <Col md={12}>
              <Form.Label>
                Blog Description
                <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Text_Editor
                editorState={formData.blogDescription || ""}
                handleContentChange={handleEditorChange}
              />

              {error &&
                (formData.blogDescription === "" ||
                  formData.blogDescription === null ||
                  formData.blogDescription === undefined) ? (
                <span style={{ color: "red" }}>This field is required</span>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Form>
        {/* {error && (
          <p style={{ color: "red" }}>Please fill all the required fields.</p>
        )} */}
      </Modal.Body>

      <Modal.Footer>
        <button
          // style={{
          //   backgroundColor: "#2e7d32",
          //   color: "white",
          //   borderRadius: "0.375rem",
          //   padding: "10px 0",
          //   whiteSpace: "nowrap",
          // }}
          className="custom-button"
          onClick={() => {
            onHide();
            setInitial();
          }}
        >
          Close
        </button>
        <button
          // style={{
          //   backgroundColor: "#2e7d32",
          //   color: "white",
          //   borderRadius: "0.375rem",
          //   padding: "10px 0",
          //   whiteSpace: "nowrap",
          // }}
          className="custom-button"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </Modal.Footer>

      <SuccessPopUP
        show={showSuccessPopUp}
        onHide={closeAll}
        message={
          modalRequestData.blogKeyID === null
            ? "Blog Added successfully!"
            : "Blog Updated successfully!"
        }
      />
    </Modal>
  );
};

export default AddUpdateBlogModal;

// import React, { useState, useEffect, ChangeEvent } from "react";
// import { Modal, Button, Form, Row, Col } from "react-bootstrap";
// // import {
// //   addUpdateBannerAPI,
// //   getBannerByIDAPI,
// // } from "../../APIServices/BannerAPI/BannerAPI";
// import SuccessPopUP from "../../components/SuccessPopUp";
// import {
//   addUpdateBannerAPI,
//   getBannerByIDAPI,
// } from "../../APIServices/BannerAPI/BannerAPI";
// import TextEditor from "../../components/TextEditor";
// import {
//   addUpdateBlogAPI,
//   getBlogByIDAPI,
// } from "../../APIServices/BlogAPI/BlogAPI";
// import { useLoader } from "../../Context/Context";

// interface BlogData {
//   blogKeyID: string | null;
//   title: string;
//   featureImage: string;
//   blogDescription: string;
//   status: string;
//   publishDate: string;
//   author: string;
// }

// interface AddUpdateBlogModalProps {
//   show: boolean;
//   onHide: () => void;
//   modalRequestData: {
//     Action: string | null;
//     blogKeyID: string | null;
//   };
//   setAddUpdateActionDone: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const defaultBlogData: BlogData = {
//   blogKeyID: null,
//   title: "",
//   featureImage: "",
//   blogDescription: "",
//   status: "Active",
//   publishDate: "",
//   author: "",
// };

// const AddUpdateBlogModal: React.FC<AddUpdateBlogModalProps> = ({
//   show,
//   onHide,
//   modalRequestData,
//   setAddUpdateActionDone,
// }) => {
//   const [formData, setFormData] = useState<BlogData>(defaultBlogData);
//   const [error, setError] = useState(false);
//   const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
//   const { setLoader } = useLoader();
//   const [imageError, setImageError] = useState<string>("");

//   useEffect(() => {
//     if (modalRequestData.blogKeyID) {
//       getBlogDataByID(modalRequestData.blogKeyID);
//     } else {
//       setFormData(defaultBlogData); // reset when adding new
//     }
//   }, [modalRequestData.blogKeyID]);

//   useEffect(() => {
//     if (modalRequestData?.blogKeyID) {
//       getBlogDataByID(modalRequestData.blogKeyID);
//     } else {
//       setFormData(defaultBlogData); // reset when adding new
//     }
//   }, [modalRequestData]);

//   const handleChange = (e: ChangeEvent<any>) => {
//     setError(false);
//     const { name, value } = e.target;
//     let newValue = value;

//     // Restrict Banner Title to only two words
//     if (name === "title") {
//       // 1. Prevent empty space as first character
//       if (newValue.startsWith(" ")) {
//         newValue = newValue.trimStart();
//       }
//     } else if (name === "author") {
//       if (newValue.startsWith(" ")) {
//         newValue = newValue.trimStart();
//       }

//       // 2. Allow only letters and spaces (no digits/special chars)
//       newValue = newValue.replace(/[^a-zA-Z\s]/g, "");
//     }

//     setFormData((prev) => ({
//       ...prev,
//       [name]: newValue,
//     }));
//   };

//   const handleSubmit = () => {
//     // debugger;
//     let isValid = false;

//     if (
//       formData.title === "" ||
//       formData.title === null ||
//       formData.title === undefined ||
//       formData.featureImage === "" ||
//       formData.featureImage === null ||
//       formData.featureImage === undefined ||
//       formData.blogDescription === "" ||
//       formData.blogDescription === null ||
//       formData.blogDescription === undefined ||
//       formData.status === "" ||
//       formData.status === null ||
//       formData.status === undefined
//     ) {
//       isValid = true;
//       setError(true);
//       return;
//     }

//     const params = {
//       blogKeyID: modalRequestData.blogKeyID,
//       title: formData.title,
//       featureImage: formData.featureImage,
//       blogDescription: formData.blogDescription,
//       author: formData.author,
//       publishDate: modalRequestData.blogKeyID
//         ? formData.publishDate
//         : new Date().toISOString().split("T")[0],
//     };

//     if (!isValid) {
//       addUpdateBlogData(params);
//     }
//   };

//   const addUpdateBlogData = async (params: any) => {
//     setLoader(true);
//     try {
//       const res = await addUpdateBlogAPI(params);
//       if (res.statusCode === 200) {
//         setLoader(false);
//         setAddUpdateActionDone(true);
//         setShowSuccessPopUp(true);
//       }
//     } catch (error) {
//       setLoader(false);
//       console.log(error);
//     }
//   };

//   const getBlogDataByID = async (blogKeyID: string | null) => {
//     if (!blogKeyID) return;
//     setLoader(true);
//     try {
//       const res = await getBlogByIDAPI(blogKeyID);
//       if (res.statusCode === 200) {
//         setLoader(false);
//         const modalData = res.responseData.data;

//         setFormData({
//           blogKeyID: modalData.blogKeyID,
//           title: modalData.title ?? "",
//           featureImage: modalData.featureImage ?? "", // prevent null issues
//           status: modalData.status ?? "Active",
//           blogDescription: modalData.blogDescription ?? "", // HTML safe
//           publishDate: modalData.publishDate ?? "",
//           author: modalData.author ?? "",
//         });
//       }
//     } catch (error) {
//       setLoader(false);
//       console.log(error);
//     }
//   };

//   const closeAll = () => {
//     setShowSuccessPopUp(false);
//     onHide();
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 500 * 1024) {
//         setImageError("Image size must be less than 500KB");
//         return;
//       } else {
//         setImageError("");
//       }

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData((prev) => ({
//           ...prev,
//           featureImage: reader.result as string, // base64 string
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemoveImage = () => {
//     setFormData((prev) => ({
//       ...prev,
//       featureImage: "",
//     }));
//   };

//   const setInitial = () => {
//     setError(false);
//     setFormData(defaultBlogData);
//   };

//   return (
//     <Modal show={show} onHide={onHide} centered size="lg">
//       <Modal.Header>
//         <Modal.Title>
//           {modalRequestData.blogKeyID ? "Update Blog" : "Add Blog"}
//         </Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         <Form>
//           <Row>
//             <Col md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label>
//                   Blog Title
//                   <span style={{ color: "red" }}>*</span>
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   placeholder="Enter blog title"
//                   maxLength={255}
//                 />
//                 {error &&
//                 (formData.title === "" ||
//                   formData.title === null ||
//                   formData.title === undefined) ? (
//                   <span style={{ color: "red" }}>This field is required</span>
//                 ) : (
//                   ""
//                 )}
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label>
//                   Blog Image <span style={{ color: "red" }}>*</span>
//                 </Form.Label>
//                 <Form.Control
//                   type="file"
//                   name="featureImage"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   style={{ lineHeight: "2.5" }}
//                 />

//                 {error &&
//                 (formData.featureImage === "" ||
//                   formData.featureImage === null ||
//                   formData.featureImage === undefined) ? (
//                   <span style={{ color: "red" }}>This field is required</span>
//                 ) : null}

//                 {imageError && (
//                   <span style={{ color: "red" }}>{imageError}</span>
//                 )}

//                 {formData.featureImage && !imageError && (
//                   <div
//                     style={{
//                       position: "relative",
//                       display: "inline-block",
//                       marginTop: "10px",
//                     }}
//                   >
//                     <span
//                       onClick={handleRemoveImage}
//                       style={{
//                         position: "absolute",
//                         top: "-8px",
//                         right: "-8px",
//                         backgroundColor: "white",
//                         border: "1px solid #ccc",
//                         borderRadius: "50%",
//                         cursor: "pointer",
//                         width: "20px",
//                         height: "20px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontSize: "12px",
//                         fontWeight: "bold",
//                         zIndex: 1,
//                       }}
//                       title="Remove Image"
//                     >
//                       ✖
//                     </span>

//                     <img
//                       src={formData.featureImage}
//                       alt="Preview"
//                       style={{
//                         width: "120px",
//                         height: "auto",
//                         border: "1px solid #ddd",
//                         borderRadius: "4px",
//                       }}
//                     />
//                   </div>
//                 )}

//                 {/* Note below upload field */}
//                 <div
//                   style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}
//                 >
//                   * Allowed size: up to 500KB
//                 </div>
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label>
//                   Author <span style={{ color: "red" }}>*</span>
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="author"
//                   value={formData.author}
//                   onChange={handleChange}
//                   placeholder="Enter Author Name"
//                   maxLength={255}
//                 />
//                 {error &&
//                 (formData.author === "" ||
//                   formData.author === null ||
//                   formData.author === undefined) ? (
//                   <span style={{ color: "red" }}>This field is required</span>
//                 ) : (
//                   ""
//                 )}
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={12}>
//               <Form.Label>
//                 Blog Description
//                 <span style={{ color: "red" }}>*</span>
//               </Form.Label>
//               <TextEditor
//                 value={formData.blogDescription || ""}
//                 onChange={(content) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     blogDescription: content,
//                   }))
//                 }
//               />

//               {error &&
//               (formData.blogDescription === "" ||
//                 formData.blogDescription === null ||
//                 formData.blogDescription === undefined) ? (
//                 <span style={{ color: "red" }}>This field is required</span>
//               ) : (
//                 ""
//               )}
//             </Col>
//           </Row>
//         </Form>
//         {/* {error && (
//           <p style={{ color: "red" }}>Please fill all the required fields.</p>
//         )} */}
//       </Modal.Body>

//       <Modal.Footer>
//         <button
//           // style={{
//           //   backgroundColor: "#2e7d32",
//           //   color: "white",
//           //   borderRadius: "0.375rem",
//           //   padding: "10px 0",
//           //   whiteSpace: "nowrap",
//           // }}
//           className="custom-button"
//           onClick={() => {
//             onHide();
//             setInitial();
//           }}
//         >
//           Close
//         </button>
//         <button
//           // style={{
//           //   backgroundColor: "#2e7d32",
//           //   color: "white",
//           //   borderRadius: "0.375rem",
//           //   padding: "10px 0",
//           //   whiteSpace: "nowrap",
//           // }}
//           className="custom-button"
//           onClick={handleSubmit}
//         >
//           Save Changes
//         </button>
//       </Modal.Footer>

//       <SuccessPopUP
//         show={showSuccessPopUp}
//         onHide={closeAll}
//         message={
//           modalRequestData.blogKeyID === null
//             ? "Blog Added successfully!"
//             : "Blog Updated successfully!"
//         }
//       />
//     </Modal>
//   );
// };

// export default AddUpdateBlogModal;
