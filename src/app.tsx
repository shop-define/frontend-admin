import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Content } from 'antd/es/layout/layout'
import { ConfigProvider, Layout } from 'antd'
import Main from './screens/main/main.tsx'
import Good from './screens/good/good.tsx'
import Goods from './screens/goods/goods.tsx'
import Categories from './screens/categories/categories.tsx'
import './index.css'

import AddNewsModal from './components/AddNewsModal/AddNewsModal'
import UserAccount from './components/UserAccount/UserAccount'

import S from './app.module.css'
import Checkout from './screens/checkout/checkout.tsx'
import HeaderComponent from './components/HeaderComponent/HeaderComponent.tsx'
import FooterComponent from './components/FooterComponent/FooterComponent.tsx'
import Checkouts from './screens/checkouts/checkouts.tsx'
import { SettingsProvider } from './helpers/SettingsContext.tsx'

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
        path: '/checkouts',
        element: <Checkouts />,
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
        path: '/checkout/:id',
        element: <Checkout />,
      },
      {
        path: '/news/create',
        element: <AddNewsModal />,
      },
      {
        path: '/profile',
        element: <UserAccount />,
      },
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
        <SettingsProvider>
          <RouterProvider router={router} />
        </SettingsProvider>
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default App
