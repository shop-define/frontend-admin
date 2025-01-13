import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Content, Header, Footer } from 'antd/es/layout/layout'
import { ConfigProvider, Layout } from 'antd'
import Main from './screens/main/main.tsx'
import Good from './screens/good/good.tsx'
import Goods from './screens/goods/goods.tsx'
import Categories from './screens/categories/categories.tsx'
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

import S from './app.module.css'
import HeaderComponent from './components/HeaderComponent/HeaderComponent.tsx'
import FooterComponent from './components/FooterComponent/FooterComponent.tsx'

// Клиент можно выпилить, если не будешь использовать react-query
const queryClient = new QueryClient()

const ConfigProviderWrap = () => {
  // Тут можно прокинуть стор пользователя, к примеру
  return (
    <Layout className={S.root}>
      <HeaderComponent />
      <Content className={S.content}>
        <Outlet />
      </Content>
      <FooterComponent />
    </Layout>
  )
}

const router = createBrowserRouter([
  {
    element: <ConfigProviderWrap />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/good/:id',
        element: <Good />,
      },
      {
        path: '/good',
        element: <Goods />,
      },
      {
        path: '/category',
        element: <Categories />,
      },
      {
        path: '/category/:id',
        element: <Categories />,
      },
      {
        path: '/orders',
        element: (
            <OrderList />
        ),
      },
      {
        path: '/orders/:orderId',
        element: 
          <OrderDetails />
      },
      {
        path: '/categories/create',
        element: 
          <AddCategoryModal />
      },
      {
        path: '/edit-product/:productId',
        element: 
          <EditProduct />
      },
      {
        path: '/news/create',
        element: (
            <AddNewsModal />
        ),
      },
      {
        path: '/profile',
        element: (
            <UserAccount />
        ),
      }  
    ],
  },
])



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
