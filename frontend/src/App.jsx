import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";
import SpotList from "./components/SpotList";
import SpotDetail from "./components/SpotList/SpotDetail";
import CreateSpot from "./components/SpotForm/CreateSpot";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      // {
      //   path: '/',
      //   element: <h1>Welcome!</h1>
      // },
      {
        path: "/",
        element: <SpotList />,
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetail />,
      },
      {
        path:'/spots/new',
        element:<CreateSpot />
      },
      // {
      //   path: '/spots/current',
      //   element: <SpotManage />
      // }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
