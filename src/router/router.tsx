import App from "App";
import EditReservationPage from "page/EditReservationPage";
import NewReservationPage from "page/NewReservationPage";
import ReservationList from "page/ReservationList";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ReservationList />,
      },
      {
        path: "/create",
        element: <NewReservationPage />,
      },
      {
        path: "/edit",
        element: <EditReservationPage />,
      },
    ],
  },
  // {
  //   path: "*",
  // },
]);

export default router;
