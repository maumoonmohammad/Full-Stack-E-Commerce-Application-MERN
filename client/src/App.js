import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/user/Dashboard'
import PrivateRoute from './components/Routes/Private'
import Forgotpassword from './pages/auth/Forgotpassword';
import AdminRoute from './components/Routes/Admin/AdminRoute';
import AdminDashboard from './components/Routes/Admin/AdminDashboard';
import CreateCategory from './components/Routes/Admin/CreateCategory';
import CreateProduct from './components/Routes/Admin/CreateProduct';
import Users from './components/Routes/Admin/Users';
import UserProfile from './pages/user/UserProfile';
import UserOrders from './pages/user/UserOrders';
import Products from './components/Routes/Admin/Products';
import Updateproduct from './components/Routes/Admin/Updateproduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import CategoryProduct from './pages/CategoryProduct';
import UserCart from './pages/UserCart';
import AdminOrders from './components/Routes/Admin/AdminOrders';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/category/:slug' element={<CategoryProduct />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<UserCart />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path='' element={<Dashboard />} />
          <Route path='/dashboard/profile' element={<UserProfile />} />
          <Route path='/dashboard/orders' element={<UserOrders />} />
        </Route>
        <Route path='/admin/dashboard' element={<AdminRoute />}>
          <Route path='' element={<AdminDashboard />} />
          <Route path='/admin/dashboard/create-category' element={<CreateCategory />} />
          <Route path='/admin/dashboard/create-product' element={<CreateProduct />} />
          <Route path='/admin/dashboard/update-product/:slug' element={<Updateproduct />} />
          <Route path='/admin/dashboard/products' element={<Products />} />
          <Route path='/admin/dashboard/users' element={<Users />} />
          <Route path='/admin/dashboard/orders' element={<AdminOrders />} />
        </Route>
        <Route path='/contact' element={<Contact />} />
        <Route path='/search' element={<Search />} />
        <Route path='/product-details/:slug' element={<ProductDetails />} />
        <Route path='/forgot-password' element={<Forgotpassword />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Pagenotfound />} />

      </Routes>
    </>
  );
}

export default App;
