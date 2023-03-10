import { Avatar, Typography, AppBar, Toolbar } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  bar: {
    paddingTop: "20px",
    paddingRight: "20px",
    width: "calc(100% - 240px)",
    position: "fixed",
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 40px)",
      paddingTop: 0,
    },
    background: theme.mainLayout.backgroundColor,
    color: theme.pallette.primary.main,
    position: "fixed",

    "& .MuiToolbar-gutters": {
      columnGap: "20px",
    },
  },
  avatar: {
    padding: 5,
    border: `2px solid ${theme.pallette.secondary.light}`,
    borderRadius: "50%",
  },
}));

const TopBar = (props) => {
  const styles = useStyles();
  const { user } = props;
  useEffect(() => {}, [props.user]);
  return (
    <>
      <AppBar className={styles.bar} elevation={0}>
        <Toolbar>
          <Typography
            style={{ flexGrow: 1, fontSize: "calc(24px + .39063vw)" }}
          >
            Users
          </Typography>
          <Typography style={{ fontSize: "calc(16px + .39063vw)" }}>
            {props.user?.name.first} {props.user?.name.last}
          </Typography>
          <div className={styles.avatar}>
            <Avatar src={props.user?.picture.medium}></Avatar>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default TopBar;
