import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home";
import { Login } from "../Components/Login";
import { Register } from "../Components/Register";
import { CreateInquiry } from "../Pages/Inquiry/Create";
import Inquiry from "../Pages/Inquiry/Inquiry";
import { EditInquiry } from "../Pages/Inquiry/Edit";
import Orders from "../Pages/Orders/Orders";
import { CreateOrders } from "../Pages/Orders/Create";
import { EditOrders } from "../Pages/Orders/Edit";
import Store from "../Pages/Store/Store";
import { CreateStore } from "../Pages/Store/Create";
import { EditStore } from "../Pages/Store/Edit";
import Purchase from "../Pages/Purchase/Purchase";
import { EditPurchase } from "../Pages/Purchase/Edit";
import CreatePurchase from "../Pages/Purchase/Create";
import Production from "../Pages/Production/Production";
import { CreateProduction } from "../Pages/Production/Create";
import { EditProduction } from "../Pages/Production/Edit";
import Packaging from "../Pages/Packaging/Packaging";
import { CreatePackaging } from "../Pages/Packaging/Create";
import { EditPackaging } from "../Pages/Packaging/Edit";
import Billing from "../Pages/Billing/Billing";
import { CreateBilling } from "../Pages/Billing/Create";
import { EditBilling } from "../Pages/Billing/Edit";
import Dispatch from "../Pages/Dispatch/Dispatch";
import { CreateDispatch } from "../Pages/Dispatch/Create";
import { EditDispatch } from "../Pages/Dispatch/Edit";
import Replacement from "../Pages/Replacement/Replacement";
import { CreateReplacement } from "../Pages/Replacement/Create";
import { EditReplacement } from "../Pages/Replacement/Edit";
import Employee from "../Pages/Employee/Employee";
import CreateEmployee from "../Pages/Employee/Create";
import { EditEmployee } from "../Pages/Employee/Edit";
import Customer from "../Pages/Customer/Customer";
import Cookies from "js-cookie";

export const AllRouters = () => {
  let token = Cookies.get("token");
  let role = Cookies.get("role");
  if (!token || !role) {
    return (
      <Routes>
        <Route path="/*" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    );
  }
  if (role === "employee") {
    return (
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/*" element={<Navigate to={"/"} />}></Route>
        {/* inquiry */}
        <Route path="/inquiry" element={<Inquiry />}></Route>
        {/* <Route path="/inquiry/create" element={<CreateInquiry />}></Route> */}
        <Route path="/inquiry/edit/:id" element={<EditInquiry />}></Route>
        {/* orders */}
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/orders/create" element={<CreateOrders />}></Route>
        <Route path="/orders/edit/:id" element={<EditOrders />}></Route>
      </Routes>
    );
  }
  if (role === "customer") {
    return (
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/*" element={<Navigate to={"/"} />}></Route>
      </Routes>
    );
  }

  if (role === "supplier") {
    return (
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/*" element={<Navigate to={"/"} />}></Route>
      </Routes>
    );
  }
  if (role === "admin" || role === "superAdmin") {
    return (
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/*" element={<Navigate to={"/"} />}></Route>
        {/* inquiry */}
        <Route path="/inquiry" element={<Inquiry />}></Route>
        <Route path="/inquiry/create" element={<CreateInquiry />}></Route>
        {/* <Route path="/inquiry/edit/:id" element={<EditInquiry />}></Route> */}
        {/* orders */}
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/orders/create" element={<CreateOrders />}></Route>
        {/* <Route path="/orders/edit/:id" element={<EditOrders />}></Route> */}
        {/* store */}
        <Route path="/store" element={<Store />}></Route>
        <Route path="/store/create" element={<CreateStore />}></Route>
        {/* <Route path="/store/edit/:id" element={<EditStore />}></Route> */}
        {/* purchase */}
        <Route path="/purchase" element={<Purchase />}></Route>
        <Route path="/purchase/create" element={<CreatePurchase />}></Route>
        {/* <Route path="/purchase/edit/:id" element={<EditPurchase />}></Route> */}
        {/* production */}
        <Route path="/production" element={<Production />}></Route>
        <Route path="/production/create" element={<CreateProduction />}></Route>
        {/* <Route path="/production/edit/:id" element={<EditProduction />}></Route> */}
        {/* Packaging */}
        <Route path="/packaging" element={<Packaging />}></Route>
        <Route path="/packaging/create" element={<CreatePackaging />}></Route>
        {/* <Route path="/packaging/edit/:id" element={<EditPackaging />}></Route> */}
        {/* Billing */}
        <Route path="/billing" element={<Billing />}></Route>
        <Route path="/billing/create" element={<CreateBilling />}></Route>
        {/* <Route path="/billing/edit/:id" element={<EditBilling />}></Route> */}
        {/* Dispatch */}
        <Route path="/dispatch" element={<Dispatch />}></Route>
        <Route path="/dispatch/create" element={<CreateDispatch />}></Route>
        {/* <Route path="/dispatch/edit/:id" element={<EditDispatch />}></Route> */}
        {/* Replacement */}
        <Route path="/replacement" element={<Replacement />}></Route>
        <Route
          path="/replacement/create"
          element={<CreateReplacement />}
        ></Route>
        {/* <Route
          path="/replacement/edit/:id"
          element={<EditReplacement />}
        ></Route> */}
        {/* employee */}

        <Route path="/employee" element={<Employee />}></Route>
        <Route path="/employee/create" element={<CreateEmployee />}></Route>
        {/* <Route path="/employee/edit/:id" element={<EditEmployee />}></Route> */}
        {/* Customer */}
        <Route path="/customer" element={<Customer />}></Route>

        {/* Settings */}
        {/* <Route path="/settings" element={<Setting />}></Route> */}
      </Routes>
    );
  }
};
