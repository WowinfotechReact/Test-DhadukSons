import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Loader from "../components/Loader";

// Define the shape of the user object
interface User {
  adminKeyID: string;
  firstName: string;
  lastName: string;
  phoneNo: string;
  email: string;
  token?: string;
}

// Cart item shape
interface CartItem {
  cartKeyID: string;
  userKeyID: string;
  ProductKeyID: string;
  productTitle: string;
  ProductSizeKeyID: string;
  productSize: string;
  productUnitKeyID: string;
  productUnitName: string;
  productPrice: string;
  productDiscount: string;
  quantity: number;
  totalPrice: string;
  totalDiscount: string;
  finalPrice: string;
  finalPriceUSD: string;
  productImage?: string;
}

interface Location {
  country_code: string;
  currency_code: string;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (userData: User) => void;
  isAuthenticated: boolean;
  isAddUpdateCartDone: boolean;
  setIsAddUpdateCartDone: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setGeoLocation: React.Dispatch<React.SetStateAction<Location>>;
  geoLocation: Location | null;
}

// Loader context type
interface LoaderContextType {
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create contexts
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const LoaderContext = createContext<LoaderContextType | undefined>(
  undefined
);

// Provider props type
interface AuthProviderProps {
  children: ReactNode;
}

interface LoaderProviderProps {
  children: ReactNode;
}

// Auth provider
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [geoLocation, setGeoLocation] = useState<Location>({
    country_code: "IN",
    currency_code: "INR",
  });
  const [isAddUpdateCartDone, setIsAddUpdateCartDone] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("authUser", JSON.stringify(user));
  }, [user]);

  const login = (userData: User) => {
    localStorage.setItem("authUser", JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        isAuthenticated: !!user,
        isAddUpdateCartDone,
        setIsAddUpdateCartDone,
        cartItems,
        setCartItems,
        geoLocation,
        setGeoLocation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Loader provider
export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
  const [loader, setLoader] = useState<boolean>(false);

  return (
    <LoaderContext.Provider value={{ loader, setLoader }}>
      {children}
      {loader && <Loader />}
    </LoaderContext.Provider>
  );
};

// Hooks for easier usage
export const useLoader = (): LoaderContextType => {
  const context = useContext(LoaderContext);
  if (!context)
    throw new Error("useLoader must be used within a LoaderProvider");
  return context;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
