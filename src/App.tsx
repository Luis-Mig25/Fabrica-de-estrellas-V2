import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router";
import { SimulationPanel } from "./pages/SimulationPanel";
import { Info } from "./pages/info";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <SimulationPanel />,
  },
  { path: "/about", element: <Info /> },
];

const router = createBrowserRouter(routes);

export const App = () => {
  return <RouterProvider router={router} />;
};
