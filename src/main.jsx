import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Layout from './Layout.jsx'
import LoginPage from './pages/Login.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import Profile from './pages/Profile/Profile.jsx'
import Settings from './pages/Settings.jsx'
import MyLearnings from './pages/MyLearnings.jsx'
import NotFound from './pages/NotFound.jsx'
import GetStarted from './pages/GetStarted/GetStarted.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
        <Route path='' element={<HomePage/>} />
        <Route path='login' element={<LoginPage/>} />
        <Route path='register' element={<RegisterPage/>} />
        <Route path='about' element={<AboutPage/>} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/my-learnings' element={<MyLearnings/>}/>
        <Route path='/get-started'>
          <Route path='' element={<GetStarted/>}/>
          
        </Route>

        <Route path='*' element={<NotFound/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  // <StrictMode>
   <RouterProvider router={router}/>
  // </StrictMode>,
)
