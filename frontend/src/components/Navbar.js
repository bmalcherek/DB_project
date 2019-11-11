import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Divider
} from "@material-ui/core";
import { Menu, Public, FlightTakeoff, Flight } from "@material-ui/icons";
import { Link } from "react-router-dom";

import "../styles/Navbar.css";

const useStyles = makeStyles({
  list: {
    width: 250
  }
});

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const classes = useStyles();

  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const drawer = (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Typography type="h4" style={{ padding: "5px", margin: "5px" }}>
        Menu
      </Typography>
      <Divider />
      <List id="drawer-list">
        <Link to="/countries" className="link">
          <ListItem button>
            <ListItemIcon>
              <Public />
            </ListItemIcon>
            <ListItemText primary="Countries" />
          </ListItem>
        </Link>

        <Link to="/airports" className="link">
          <ListItem button>
            <ListItemIcon>
              <FlightTakeoff />
            </ListItemIcon>
            <ListItemText primary="Airports" />
          </ListItem>
        </Link>

        <Link to="/airplane-models" className="link">
          <ListItem button>
            <ListItemIcon>
              <Flight />
            </ListItemIcon>
            <ListItemText primary="Airplane Models" />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <div id="navbar">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6">Navbar</Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>
    </div>
  );
};

export default Navbar;
