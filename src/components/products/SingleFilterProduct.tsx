import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { toast } from "react-toastify";
import { RootState } from "../../store/store";

interface DataType {
  id?: number;
  title?: string;
  thumb?: string;
  tags: string[];
  price?: string;
  oldPrice?: string | null;
  onSale?: boolean;
  category?: string;
}
interface CartItem {
  cartKeyID: string;
  ProductKeyID: string;
  ProductTitle: string;
  productPrice: string;
  quantity: number;
  productImage?: string;
  finalPrice?: string;
}
interface ProductProps {
  product: DataType;
  sectionClass?: string;
}

const SingleFilterProduct = ({ product, sectionClass }: ProductProps) => {
  const { id, title, thumb, tags, price, oldPrice, onSale, category } = product;

  const dispatch = useDispatch();
  const cartItems = useSelector<RootState, RootState["cart"]["items"]>(
    (state) => state.cart.items
  );

  const handleAddToCart = () => {
    const alreadyInCart = cartItems.some((item) => item.id === product.id);

    if (alreadyInCart) {
      toast.warning("Product already in cart");
    } else {
      dispatch(
        addToCart({
          id: product.id!,
          title: product.title!,
          price: parseFloat(product.price!.replace("$", "")),
          thumb: product.thumb!,
          quantity: 1,
        })
      );
      toast.success("Product added successfully");
    }
  };

  return (
    <div
      className={`product grid-item ${
        sectionClass ? sectionClass : ""
      } ${category}`}
    >
      <div className="product-contents">
        <div className="product-image">
          {onSale && <span className="onsale">Sale!</span>}
          <Link to={`/products/${id}`}>
            <img src={`/assets/img/products/${thumb}`} alt="Product" />
          </Link>
          <div className="shop-action">
            <ul>
              <li className="cart">
                <Link to="#" onClick={handleAddToCart}>
                  <span>Add to cart</span>
                </Link>
              </li>
              <li className="wishlist">
                <Link to="#">
                  <span>Add to wishlist</span>
                </Link>
              </li>
              <li className="quick-view">
                <Link to="#">
                  <span>Quick view</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="product-caption">
          <div className="product-tags">
            {tags.map((tag, idx) => (
              <Link to="#" key={idx}>
                {tag}
              </Link>
            ))}
          </div>
          <h4 className="product-title">
            <Link to={`/products/${id}`}>{title}</Link>
          </h4>
          <div className="price">
            {oldPrice && (
              <span>
                <del>{oldPrice}</del>
              </span>
            )}
            <span>{price}</span>
          </div>
          <Link to="#" className="cart-btn" onClick={handleAddToCart}>
            <i className="fas fa-shopping-bag" /> Add to cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleFilterProduct;
