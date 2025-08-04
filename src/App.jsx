import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Component/Home";
import CodeEditor from "./Component/CodeEditor";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/ide" element={<CodeEditor></CodeEditor>}></Route>
      </>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
