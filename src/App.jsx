import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  Home,
  Error,
  Checkout,
  About,
  Products,
  SingleProduct,
  Cart,
  Login,
  Register,
  OrderPage,
} from "./pages";
import { Footer, Navbar, Sidebar, UserInformation } from "./components";
import { isUserLoggedIn } from "./utils/helpers";
const login = true;
function App() {
  const [isLogined, setLogined] = useState(false);
  const handleLogin = () => {
    setLogined(true);
  };
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="about" element={<About />} />
        <Route
          path="products"
          element={<Navigate to="/products/men" replace />}
        />
        <Route path="products/:mainCategory" element={<Products />} />
        <Route
          path="products"
          element={<Navigate to="/products/men" replace />}
        />
        <Route path="checkout" element={<Checkout />} />
        <Route path="product/:id" element={<SingleProduct />} />
        <Route path="*" element={<Error />} />
        <Route
          path="login"
          element={
            isLogined || isUserLoggedIn() ? (
              <Navigate to="/products/men" />
            ) : (
              <Login handleLogin={handleLogin} />
            )
          }
        />
        <Route
          path="order"
          element={
            isLogined || isUserLoggedIn() ? (
              <OrderPage />
            ) : (
              <Login handleLogin={handleLogin} />
            )
          }
        />
        {/* <Route path="login" element={<Login />} /> */}
        <Route path="register" element={<Register />} />
        <Route path="information" element={<UserInformation />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
