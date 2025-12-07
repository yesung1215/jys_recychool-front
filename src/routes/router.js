import { createBrowserRouter } from "react-router-dom";

// Layout
import HeaderAndFooterLayout from "../pages/layout/headerandfooterlayout/HeaderAndFooterLayout";

// Pages
import NotFound from "../pages/notfound/NotFound";
import Search from "../pages/Search";
import SignUp from "../pages/SignUp";
import FindUser from "../pages/FindUser";
import MyPage from "../pages/MyPage";
import Reserve from "../pages/Reserve";
import Payment from "../pages/Payment";
import Main from "../pages/Main";
import SignIn from "../pages/sign-in/SignIn";
import OauthSuccess from "../pages/sign-in/OauthSuccess";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HeaderAndFooterLayout />,
    children: [
      {
        path: "",
        element: <Main />
      },
      {
        path: "sign-up",
        element: <SignUp />
      },
      {
        path: "sign-in",
        element: <SignIn />
      },
      {
        path: "oauth2/success",
        element: <OauthSuccess />
      },
      {
        path: "search",
        element: <Search />
      },
      {
        path: "find-user",
        element: <FindUser />
      },
      {
        path: "my-page",
        element: <MyPage />
      },
      {
        path: "reserve/:schoolId",
        element: <Reserve />
      },
      {
        path: "Payment/:schoolId",
        element: <Payment />
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;