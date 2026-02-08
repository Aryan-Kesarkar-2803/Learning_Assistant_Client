import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Layout from './Layout.jsx'
import LoginPage from './pages/Login.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import AboutPage from './pages/AboutPage.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
        <Route path='' element={<HomePage/>} />
        <Route path='login' element={<LoginPage/>} />
        <Route path='register' element={<RegisterPage/>} />
        <Route path='about' element={<AboutPage/>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
