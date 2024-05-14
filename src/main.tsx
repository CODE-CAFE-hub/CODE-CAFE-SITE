import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Loader } from "./components/components.ts";


const HomePage = lazy(() => delayForDemo(import("./pages/HomePage")));
const About = lazy(() => delayForDemo(import("./pages/About")));
const Contact = lazy(() => delayForDemo(import("./pages/Contact")));
const Services = lazy(() => delayForDemo(import("./pages/Services.tsx")));

interface PromiseFunction<T> {
  (promise: Promise<T>): Promise<T>;
}

const delayForDemo: PromiseFunction<any> = (promise) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(promise);
    }, 1000);
  });
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/contactus",
        element: <Contact />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense
    fallback={
      <div>
        <h1><Loader/></h1>
      </div>
    }
  >
    <RouterProvider router={router} />
  </Suspense>
);
