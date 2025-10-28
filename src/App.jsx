import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailsPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
} from "./routes/Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store.js";
import { loadUser, loadSeller } from "./redux/actions/user";
import { useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import ShopHomePage from "./pages/Shop/ShopHomePage";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.jsx";
import SellerDashboardPage from "./pages/Shop/ShopDashboardPage.jsx";
import ShopDashboardPage from "./pages/Shop/ShopDashboardPage.jsx";
import ShopCreateProduct from "./pages/Shop/ShopCreateProduct.jsx";
import ShopPage from "./pages/Shop/ShopHomePage.jsx";
import ShopAllProducts from "./pages/Shop/ShopAllProducts.jsx";
import ShopCreateEvents from "./pages/Shop/ShopCreateEvents.jsx";
import ShopAllEvents from "./pages/Shop/ShopAllEvents.jsx";
import ShopAllCoupouns from "./pages/Shop/ShopAllCoupouns.jsx";
import { getAllEvents } from "./redux/actions/event.js";
import { getAllProducts } from "./redux/actions/product";
import { useDispatch } from "react-redux";


const App = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { isLoading, isSeller } = useSelector((state) => state.seller);

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
  }, []);

  if (loading || isLoading) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order/success/:id" element={<OrderSuccessPage />} />

        {/* Shop Routes */}
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute isSeller={isSeller}>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoute>
              <ShopAllProducts />
            </SellerProtectedRoute>
          }
        />
           <Route
          path="/dashboard-create-event"
          element={
            <SellerProtectedRoute>
              <ShopCreateEvents />
            </SellerProtectedRoute>
          }
        />

           <Route
          path="/dashboard-events"
          element={
            <SellerProtectedRoute>
              <ShopAllEvents />
            </SellerProtectedRoute>
          }
        />

          <Route
          path="/dashboard-coupouns"
          element={
            <SellerProtectedRoute>
              <ShopAllCoupouns />
            </SellerProtectedRoute>
          }
        />


      </Routes>

      {/* Toast Notifications */}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;
