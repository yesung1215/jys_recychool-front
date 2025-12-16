import { createBrowserRouter, Navigate } from "react-router-dom";

// Layout
import HeaderAndFooterLayout from "../pages/layout/headerandfooterlayout/HeaderAndFooterLayout";

// Pages
import NotFound from "../pages/notfound/NotFound";
import Search from "../pages/Search";
import SignUp from "../pages/sign-up/SignUp";
import FindUser from "../pages/find/FindUser";
import MyPage from "../pages/MyPage";
import Reserve from "../pages/reserve/Reserve";
import Payment from "../pages/payment/Payment";
import Main from "../pages/Main";
import SignIn from "../pages/sign-in/SignIn";
import OauthSuccess from "../pages/sign-in/OauthSuccess";
import FindEmail from "../pages/find/FindEmail";
import FindPassword from "../pages/find/FindPassword";
import Verify from "../pages/sign-up/veirfy/Verify";
import Terms from "../pages/sign-up/Terms";
import Info from "../pages/sign-up/Info";
import Complete from "../pages/sign-up/Complete";


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
        element: <SignUp />,
        children: [
          { index: true, element: <Navigate to="verify" replace /> },
          {
            path: "verify",
            element: <Verify />
          },
          {
            path: "terms",
            element: <Terms />
          },
          {
            path: "info",
            element: <Info />
          },
          {
            path: "complete",
            element: <Complete />
          }
        ]
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
        element: <FindUser />,
        children:[
          {
            path: "email",
            element: <FindEmail />
          },
          {
            path: "password",
            element: <FindPassword />
          }
        ]
      },
      {
        path: "my-page",
        element: <MyPage />
      },
      {
        path: "reserve/place/:schoolId",
        element: <Reserve reserveType="PLACE" />
      },
      {
        path: "reserve/parking/:schoolId",
        element: <Reserve reserveType="PARKING" />
      },
      {
        path: "payment/:schoolId",
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