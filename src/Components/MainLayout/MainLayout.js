import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import TopBar from "../TopBar/TopBar";
import { makeStyles } from "@material-ui/styles";
import { Outlet } from "react-router-dom";
import axios from "axios";
const api = "https://randomuser.me/api";
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: theme.mainLayout.backgroundColor,
    overflow: "auto",
    width: "100%",
    height: "100vh",
  },
  toolbar: theme.mixins.toolbar,
}));
const sideBarWidth = 240;

const MainLayout = (props) => {
  const styles = useStyles();
  const [user, setUser] = useState();
  const fetchData = () => {
    axios({
      method: "get",
      withCredentials: false,
      url: api,
    }).then((response) => {
      setUser(response.data.results[0]);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <SideBar sideBarWidth={sideBarWidth} />
      <TopBar user={user} sideBarWidth={sideBarWidth} />
      <Outlet />
    </div>
  );
};
export default MainLayout;
