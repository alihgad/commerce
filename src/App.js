import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import LayOut from './components/LayOut/LayOut';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Categorys from './components/Categorys/Categorys';
import Brands from './components/Brands/Brands';
import NotFound from './components/NotFound/NotFound';
import '@fortawesome/fontawesome-free/css/all.min.css'
import ProtectedRoutes from './components/protectedRoutes/protectedRoutes';
import LoginRoutes from './components/protectedRoutes/loginroutes';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Checkout from './components/Checkout/Checkout';
import Allorders from './components/Allorders/Allorders';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import VerfiyCode from './components/VerfiyCode/VerfiyCode';
import ResetPassword from './components/ResetPassword/ResetPassword';
import WhichList from './components/WhichList/WhichList';
import Offlinecheckout from './components/Offlinecheckout/Offlinecheckout';


function App() {


  const routers = createBrowserRouter([
      // log in routing
    {path: "/",element: <LayOut/> , children: [
      {index: true,element: <ProtectedRoutes><Home/></ProtectedRoutes>},
      {path: '/home',element: <ProtectedRoutes><Home/></ProtectedRoutes>},
      {path: '/E-commerce',element: <ProtectedRoutes><Home/></ProtectedRoutes>},
      {path: "/cart",element:<ProtectedRoutes> <Cart/> </ProtectedRoutes>},
      {path: "/products",element:<ProtectedRoutes><Products/></ProtectedRoutes> },
      {path: "/Categories",element:<ProtectedRoutes><Categorys/></ProtectedRoutes> },
      {path: "/brands",element:<ProtectedRoutes><Brands/></ProtectedRoutes> },
      {path: "/allorders",element:<ProtectedRoutes><Allorders/></ProtectedRoutes> },
      {path: "/checkout",element:<ProtectedRoutes><Checkout/></ProtectedRoutes> },
      {path: "/offlinecheckout",element:<ProtectedRoutes><Offlinecheckout/></ProtectedRoutes> },
      {path: "/whichlist",element:<ProtectedRoutes><WhichList/></ProtectedRoutes> },
      {path: "/product/:id",element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes> },


      // log out routing
      {path: "/reset-password",element:<LoginRoutes> <ResetPassword/> </LoginRoutes> },
      {path: "/forget-password",element:<LoginRoutes> <ForgetPassword/> </LoginRoutes> },
      {path: "/verfiy-code",element:<LoginRoutes> <VerfiyCode/> </LoginRoutes> },
      {path: "/signin",element:<LoginRoutes> <Signin/> </LoginRoutes> },
      {path: "/register",element:<LoginRoutes><Register/></LoginRoutes> },
      
      {path: "*",element:<NotFound/> }

    ]}
])


      return <RouterProvider router={routers}></RouterProvider>


}

export default App;
