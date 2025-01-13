import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Content, Header, Footer } from 'antd/es/layout/layout'
import { ConfigProvider, Layout } from 'antd'
import Main from './screens/main/main.tsx'
import Good from './screens/good/good.tsx'
import Goods from './screens/goods/goods.tsx'
import Categories from './screens/categories/categories.tsx'

import S from './app.module.css'

// Клиент можно выпилить, если не будешь использовать react-query
const queryClient = new QueryClient()

const ConfigProviderWrap = () => {
  // Тут можно прокинуть стор пользователя, к примеру
  return (
    <Layout className={S.root}>
      <Header className={S.header}></Header>
      <Content className={S.content}>
        <Outlet />
      </Content>
      <Footer />
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
        <RouterProvider router={router} fallbackElement={<div>404 page</div>} />
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default App
