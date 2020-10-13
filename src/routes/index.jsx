import Pages from "layouts/Pages/Pages.jsx";
import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Login from "../views/Login/Login";
import CodePhoto from "../views/CodePhoto/CodePhoto";
import UsersView from "../views/Users/UserView";
import PricingPage from "views/Pages/PricingPage.jsx";

var indexRoutes = [
  { path: "/pages", name: "Pages", component: Pages },
  { path: "/codephoto", name: "CodePhoto", component: CodePhoto },
  { path: "/login", name: "Login", component: Login },
  {path: "/users", name: "Users", component: UsersView},
  { path: "/page/pricing-page", name: "Home", component: PricingPage },
  { path: "/", name: "Home", component: Dashboard }
 
];

export default indexRoutes;
