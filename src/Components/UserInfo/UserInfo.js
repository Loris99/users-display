import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Avatar, Drawer, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ArrowBack } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  name: {
    fontSize: 14,
    color: theme.pallette.primary.main,
    fontWeight: "bold",
    marginTop: "20px",
  },
  paper: {
    width: "calc(30% - 100px)",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  listStyle: {
    background: "white",
    color: theme.sideBar.textColor,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    rowGap: 10,
    alignItems: "center",
  },
  header: {
    background: "#528CFC",
    height: "150px",
    position: "relative",
    width: "100%",
    marginBottom: "40px",
    "& .MuiSvgIcon-root": {
      color: "white",
    },
  },
  arrowBack: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  avatar: {
    position: "absolute",
    transform: " translate(183%, 73%)",
    [theme.breakpoints.down("sm")]: {
      transform: "translate(150%, 50%)",
    },
    width: "100px",
    height: "100px",
  },
}));

const UserInfo = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const styles = useStyles();
  const [userData, setUserData] = useState();
  const params = useParams();

  const checkData = () => {
    if (location.state === null) {
      props.rowData.map((item, i) => {
        if (item.login.uuid === params.userId) {
          setUserData(item);
        }
      });
    }
    if (location.state !== null) {
      setUserData(location.state.rowData);
    }
  };

  useEffect(() => {
    checkData();
  }, [params]);

  const toggleDrawer = () => {
    navigate("..");
  };

  return (
    <Drawer
      anchor="right"
      open={props.isUserDataDisplayed}
      onClose={toggleDrawer}
      classes={{
        paper: styles.paper,
      }}
    >
      <div className={styles.listStyle}>
        <div className={styles.header}>
          <IconButton onClick={toggleDrawer}>
            <ArrowBack
              aria-label="close user Info"
              edge="start"
              className={styles.arrowBack}
            />
          </IconButton>
          <Avatar
            className={styles.avatar}
            src={userData?.picture.medium}
          ></Avatar>
        </div>
        <Typography className={styles.name} variant="h3">
          {userData?.name.first}
          {userData?.name.last}
        </Typography>
        <Typography className={styles.cellSubHeader}>
          {userData?.location.street.number} {userData?.location.street.name}
          {", "}
          {userData?.location.city}
        </Typography>
      </div>
    </Drawer>
  );
};
export default UserInfo;
