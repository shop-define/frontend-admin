import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Footer } from 'antd/es/modal/shared'
import { Header } from 'antd/es/layout/layout'
import { ConfigProvider, Layout } from 'antd'
import Main from './screens/main/main.tsx'
import Good from './screens/good/good.tsx'

import S from './app.module.css'

// Клиент можно выпилить, если не будешь использовать react-query
const queryClient = new QueryClient()

const ConfigProviderWrap = () => {
  // Тут можно прокинуть стор пользователя, к примеру
  return (
    <Layout>
      <Header style={{ borderBottom: '2px #f5f5f5 solid' }}></Header>
      <div className={S.root}>
        <Outlet />
      </div>
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
    ],
  },
])

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: '#8f9298',
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
