import { Routes, Route } from "react-router-dom";
import MainLayout from "./Components/MainLayout/MainLayout";
import React from "react";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Users from "./Components/Users/Users";

const theme = createTheme({
  pallette: {
    primary: {
      main: "#252733",
      light: "#C5C7Cd",
    },
    secondary: {
      main: "#9FA2B4",
      light: "#E5E5E5",
    },
  },
  sideBar: {
    backgroundColor: "#363740",
    textColor: "#A4A6B3",
    active: "#9fa2b46b",
    activeSide: "#DDE2FF",
    width: {
      md: 300,
    },
  },
  mainLayout: {
    backgroundColor: "#DFE0EB",
    light: "#dfe0eb8f",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {/* <Route path="/" element={<MainLayout />}></Route> */}
        <Route path="/users-display" element={<MainLayout />}>
          <Route exact path="users" element={<Users />}>
            <Route
              exact
              path=":userId"
              element={<Users isUserDataDisplayed={true} />}
            />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
