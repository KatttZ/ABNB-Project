import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";
import SpotList from "./components/SpotList";
import SpotDetail from "./components/SpotDetail";
import CreateSpot from "./components/CreateSpotForm";
import ManageSpots from "./components/ManageSpots";
import EditSpot from "./components/EditSpotForm";

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
      {
        path: '/spots/:spotId/edit',
        element: <EditSpot />
      },
      {
        path: '/spots/current',
        element: <ManageSpots />
      },
    
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
