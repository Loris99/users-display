import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import overview_icon from "../../Assets/overview.png";
import ticket_icon from "../../Assets/ticket.png";
import idea_icon from "../../Assets/ideas.png";
import user_icon from "../../Assets/user.png";
import userPilotLogo from "../../Assets/userPilotLogo.png";
import { IconButton } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  logoStyle: {
    padding: 30,
  },
  root: {
    display: "flex",
    "& .MuiIconButton-root": {
      marginTop: "5px",
      backgroundColor: theme.mainLayout.backgroundColor,
      position: "fixed",
      zIndex: "100",
      height: "51px",
      borderRadius: 0,
    },
    "& .MuiDrawer-paperAnchorLeft": {
      background: theme.sideBar.backgroundColor,
      color: theme.sideBar.textColor,
      width: "240px",
      "& .MuiList-root": {
        "& .MuiListItem-root": {
          columnGap: "10px",
          ...theme.mixins.toolbar,
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
          "&:hover": {
            backgroundColor: theme.sideBar.active,
            borderLeft: `3px solid ${theme.sideBar.activeSide}`,
          },
        },
      },
    },
  },
  active: {
    backgroundColor: theme.sideBar.active,
    borderLeft: `3px solid ${theme.sideBar.activeSide}`,
  },
  darwr: {
    "& .MuiDrawer-paperAnchorLeft": {
      background: theme.sideBar.backgroundColor,
      color: theme.sideBar.textColor,
      "& .MuiListItem-root": {
        columnGap: 10,
      },
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));
const SideBar = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const listItems = [
    {
      icon: overview_icon,
      text: "Overview",
    },
    {
      icon: ticket_icon,
      text: "Tickets",
    },
    {
      icon: idea_icon,
      text: "Ideas",
    },
    {
      icon: user_icon,
      text: "Users",
      path: "users",
    },
  ];
  const toggleDrawer = (event) => {
    setOpen(!open);
  };
  return (
    <div className={styles.root}>
      <IconButton onClick={toggleDrawer}>
        <MenuIcon
          color="inherit"
          aria-label="open drawer"
          edge="start"
          className={styles.menuButton}
        />
      </IconButton>
      <Drawer
        anchor="left"
        variant={isMdUp ? "permanent" : "temporary"}
        onClose={toggleDrawer}
        open={open}
        className={styles.darwr}
      >
        <img
          className={styles.logoStyle}
          src={userPilotLogo}
          alt="userpilot logo"
        />
        <List>
          {listItems.map((item, i) => (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                navigate(item.path);
              }}
              className={
                location.pathname.replaceAll("/", "") === item.path
                  ? styles.active
                  : null
              }
            >
              <img src={item.icon} alt={item.text} />
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};
export default SideBar;
