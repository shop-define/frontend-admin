import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppLayout from './components/Layout/Layout'; // Импорт Layout
import Dashboard from './components/Dashboard/Dashboard'; 
import ProductList from './components/ProductList/ProductList';
import ProductForm from './components/ProductForm/ProductForm';
import OrderList from './components/OrderList/OrderList';
import './index.css'
import OrderDetails from './components/OrderDetails/OrderDetails';
import EditProduct from './components/EditProduct/EditProduct';
import AddCategoryModal from './components/AddCategoryModal/AddCategoryModal';
import AddNewsModal from './components/AddNewsModal/AddNewsModal';
import UserAccount from './components/UserAccount/UserAccount';


const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
        <Dashboard />
      </AppLayout>
    ),
  },
  {
    path: '/products',
    element: (
      <AppLayout>
        <ProductList />
      </AppLayout>
    ),
  },
  {
    path: '/products/create',
    element: (
      <AppLayout>
        <ProductForm />
      </AppLayout>
    ),
  },
  {
    path: '/orders',
    element: (
      <AppLayout>
        <OrderList />
      </AppLayout>
    ),
  },
  {
    path: '/orders/:orderId',
    element: 
    <AppLayout>
      <OrderDetails />
    </AppLayout>,
  },
  {
    path: '/categories/create',
    element: 
    <AppLayout>
      <AddCategoryModal />
    </AppLayout>,
  },
  {
    path: '/edit-product/:productId',
    element: 
    <AppLayout>
      <EditProduct />
    </AppLayout>,
  },
  {
    path: '/news/create',
    element: (
      <AppLayout>
        <AddNewsModal />
      </AppLayout>
    ),
  },
  {
    path: '/profile',
    element: (
      <AppLayout>
        <UserAccount />
      </AppLayout>
    ),
  }  
]);

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextPlaceholder: '#8f9298',
          controlHeightLG: 44,
          fontSize: 16,
        },
        components: {
          Layout: {
            headerBg: '#ffffff',
            bodyBg: '#ffffff',
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
