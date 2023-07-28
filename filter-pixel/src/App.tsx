import { createContext, useState } from 'react'
import './App.css'
import { LoginPage } from './Pages/LoginPage.tsx'
import { PhotosPage } from './Pages/PhotosPage.tsx'
import { Banner } from './Components/Banner.tsx'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import {SignupPage} from "./Pages/SignupPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>
      <Banner isLoginPage={true} />
      <PhotosPage />
    </div>
  },
  {
    path: "/login/",
    element: <div>
      <Banner isLoginPage={true} />
      <LoginPage />
    </div>
  },
  {
    path : "/signup/",
    element : <div>
      <Banner isLoginPage={false} />
      <SignupPage />
    </div>
  }
])

type LoginInfo = {
  accessToken: string | null,
  loginType: "Google" | "Plain"
}

type LoginState = {
  info: LoginInfo | null,
  setToken: React.Dispatch<React.SetStateAction<LoginInfo | null>> | null,
}


export const LoginContext = createContext<LoginState>({
  info: null,
  setToken: null
})



function App() {

  const [loginInfo, setLoginInfo] = useState<LoginInfo | null>(null)

  return (
    <>
      <LoginContext.Provider value={{ info: loginInfo, setToken: setLoginInfo }} >
        <RouterProvider router={router} />
      </LoginContext.Provider>
    </>
  )
}

export default App
