import React from "react";
import { Outlet } from "react-router-dom";
import GlobalStyle from "styles/GlobalStyle";
import SLayout from "styles/SLayout";

function App() {
  return (
    <SLayout>
      <GlobalStyle />
      <Outlet />
    </SLayout>
  );
}

export default App;
