import Dashboard from "views/Dashboard/Dashboard.jsx";
import GoogleMaps from "views/Maps/GoogleMaps.jsx";
import FullScreenMap from "views/Maps/FullScreenMap.jsx";
import VectorMap from "views/Maps/VectorMap.jsx";
import Charts from "views/Charts/Charts.jsx";
import Pdfgen from "../views/Pdfgen/Pdfgen.js";
import UsersView from "../views/Users/UserView";
import CreateUserView from "../views/CreateUser/CreateUser";
import Form from "../views/Forms/RegularForms";
import CreateSkill from "../views/CreateSkill/CreateSkill";
import CreateRole from "../views/CreateRole/CreateRole.js";
import CreateProject from "../views/CreateProject/CreateProject.js";
import Upload from "../views/Upload/Upload"

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard
  },
  {
    path: "/upload",
    name: "Upload Images",
    icon: "design_app",
    component: Upload
  }, 
  // {
  //   path: "/createuser",
  //   name: "Create User",
  //   icon: "design_app",
  //   component: CreateUserView
  // },
 
  
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
