import GalleryData from "../../assets/jsonData/widgets/GalleryWidgetData.json";
import { Link } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useEffect, useState } from "react";
import { GetAllImages } from "../../APIServices/ImageAPI/ImageAPI";

interface image {
  imageKeyID: string;
  imageTitle: string;
  image: string;
  status: string;
}

const GalleryWidget = () => {
  const [images, setImages] = useState<image[]>([]);

  useEffect(() => {
    GetAllImageList(1, 20);
  }, []);

  const GetAllImageList = async (pageNo: number, pageSize: number) => {
    const res = await GetAllImages({
      pageNo: pageNo,
      pageSize: pageSize,
      searchKeyWord: null,
      fromDate: null,
      toDate: null,
    });

    if (res.statusCode === 200) {
      //   setTotalCount(res.totalCount);
      setImages(res.responseData?.data || []);
    }
  };

  return (
    <>
      <div className="sidebar-item gallery">
        {/* <h4 className="title">Gallery</h4> */}
        <div className="sidebar-info">
          <ul>
            <PhotoProvider
              speed={() => 800}
              easing={(type) =>
                type === 2
                  ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
                  : "cubic-bezier(0.34, 1.56, 0.64, 1)"
              }
            >
              {images.map((gallery) => (
                <li className="widget-gallery" key={gallery.imageKeyID}>
                  <div className="single">
                    <PhotoView src={gallery.image}>
                      <img src={gallery.image} alt={gallery.imageTitle} />
                    </PhotoView>
                  </div>
                </li>
              ))}
            </PhotoProvider>
          </ul>
        </div>
      </div>
    </>
  );
};

export default GalleryWidget;
