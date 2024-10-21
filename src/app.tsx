import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import Main from './screens/main/main.tsx'

import S from './app.module.css'

// Клиент можно выпилить, если не будешь использовать react-query
const queryClient = new QueryClient()

const ConfigProviderWrap = () => {
  // Тут можно прокинуть стор, пользователя, к примеру
  return (
    <div className={S.root}>
      <Outlet />
    </div>
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
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} fallbackElement={<div>404 page</div>} />
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default App
