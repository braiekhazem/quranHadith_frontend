import { Suspense, lazy, useEffect, Fragment, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AccessLayout from "./components/layout/accessLayout";
import Layout from "./components/layout/mainLayout";
import Loading from "./components/loading/Loading";
import { useStore } from "./context/JWTAuthContext";
import useWindowDimensions from "./hooks/useDimension";

export const RenderRoutes = ({ routes = [] }) => {
  const { user, isAuthenticated } = useStore();
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (process.env.REACT_APP_BASE_NODE_ENV !== "development") {
    console.log(process.env.REACT_APP_BASE_NODE_ENV);
    console.log = () => {};
  }

  useEffect(() => {
    const url = pathname;
    const publicPaths = ["/login", "/signup"];
    const path = url.split("?")[0];
    if (!user && !isAuthenticated && !publicPaths.includes(path))
      navigate("/login");
    else if (isAuthenticated && publicPaths.includes(path)) {
      navigate("/");
    }
  }, [user, isAuthenticated, navigate, pathname]);

  if (width < 1150)
    return (
      <div className="noRes">
        Great news! We're happy to inform you that our website's responsiveness
        is currently being worked on...
      </div>
    );
  return (
    <Suspense fallback={<Loading size={{ w: 130, h: 130 }} />}>
      <Routes>
        {routes.map((route, i) => {
          const Layout = route.layout ? route.layout : Fragment;
          const Component = route.component;
          return (
            <Route
              key={i}
              path={route.path}
              element={
                <Layout>
                  <Component />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

const routes = [
  {
    path: "/login",
    layout: AccessLayout,
    component: lazy(() => import("./views/login/Login")),
  },
  {
    path: "/signup",
    layout: AccessLayout,
    component: lazy(() => import("./views/signup/Signup")),
  },
  {
    path: "/read/:id",
    layout: Layout,
    component: lazy(() => import("./views/reader/Read")),
  },
  {
    path: "/read/pages/:page",
    layout: Layout,
    component: lazy(() => import("./views/reader/Read")),
  },
  {
    path: "/read/juz/:juz",
    layout: Layout,
    component: lazy(() => import("./views/reader/Read")),
  },
  {
    path: "/",
    layout: Layout,
    component: lazy(() => import("./views/home/Home")),
  },
  {
    path: "*",
    component: lazy(() => import("./views/notFound/notFound")),
  },
  // {
  //   path: "/favorites",
  //   layout: Layout,
  //   component: lazy(() => import("./views/favorites/Favorites")),
  // },
  // {
  //   path: "/buy",
  //   layout: Layout,
  //   component: lazy(() => import("./views/buy/Buy")),
  // },
  // {
  //   path: "/send",
  //   layout: Layout,
  //   component: lazy(() => import("./views/send/Send")),
  // },
];

export default routes;
