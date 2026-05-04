import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper/modules";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { getAllProductImageByProductIDForWeb, Product } from "../../services/ProductService";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface ProductCarouselProps {
    productInfo: Product;
}

interface ProductImage {
    imageUrl: string;
}

const ProductCarousel = ({ productInfo }: ProductCarouselProps) => {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    useEffect(() => {
        const fetchImages = async () => {
            if (!productInfo?.productKeyID) return;
            try {
                setLoading(true);
                const res = await getAllProductImageByProductIDForWeb(
                    productInfo.productKeyID
                );
                if (res?.responseData?.data?.length) {
                    const urls = res.responseData.data.map((item: ProductImage) =>
                        item.imageUrl.replace(/\\/g, "/")
                    );
                    setImages(urls);
                } else if (productInfo.imageUrl) {
                    setImages([productInfo.imageUrl.replace(/\\/g, "/")]);
                }
            } catch (error) {
                console.error("Error fetching product images", error);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, [productInfo?.productKeyID, productInfo?.imageUrl]);

    if (loading) {
        return <div>Loading images...</div>;
    }

    if (!images.length) {
        return <div>No images available</div>;
    }

    return (
        <div>
            <PhotoProvider>
                {/* Main Image Slider */}
                <Swiper
                    style={{ width: "100%", height: "500px", marginBottom: "10px" }}
                    spaceBetween={10}
                    navigation
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[Navigation, Thumbs]}
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <PhotoView src={img}>
                                <img
                                    src={img}
                                    alt={`Product ${index}`}
                                    style={{
                                        cursor: "pointer",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            </PhotoView>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Thumbnails Slider */}
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    watchSlidesProgress
                    modules={[Thumbs]}
                    style={{ width: "100%", height: "120px" }}
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={img}
                                alt={`Thumbnail ${index}`}
                                style={{
                                    cursor: "pointer",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </PhotoProvider>
        </div>
    );
};

export default ProductCarousel;
