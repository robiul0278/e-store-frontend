import { ToastContainer } from "react-toastify";

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main>
        {children}
         <ToastContainer />
    </main>
  )
}
export default Layout;