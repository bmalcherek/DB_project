import React, { useState, useEffect } from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Typography,
  Paper,
  makeStyles,
  Menu,
  MenuItem,
  Divider
} from "@material-ui/core";
import { Edit, Delete, FilterList } from "@material-ui/icons";

import { fetchData } from "../helpers";

//TODO: implement edit
//TODO: implement adding airplaneModels

const useStyles = makeStyles(theme => ({
  title: {
    flex: "1 1 100%"
  }
}));

const AirplaneModelsList = () => {
  const [airplaneModels, setAirplaneModels] = useState([]);
  const [ogAirplaneModels, setOgAirplaneModels] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("desc");
  const [nameFilter, setNameFilter] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles();

  useEffect(() => {
    const response = fetchData("api/airplane-models/");
    response.then(res => {
      setOgAirplaneModels(res.data);
      setAirplaneModels(res.data);
    });
  }, []);

  const handleChange = event => {
    switch (event.target.name) {
      case "name-filter":
        setNameFilter(event.target.value);
        setAirplaneModels(
          ogAirplaneModels.filter(row => {
            return row["name"].toLowerCase().startsWith(event.target.value);
          })
        );
        break;
      default:
        console.log("error");
    }
    console.log(event.target.value);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    //TODO: implement delete
    console.log("implement delete");
  };

  const handleSort = key => () => {
    let ord;
    if (orderBy === key) {
      ord = order === "desc" ? "asc" : "desc";
      setOrder(ord);
    } else {
      ord = "desc";
      setOrderBy(key);
      setOrder("desc");
    }
    sort(airplaneModels, key, ord);
  };

  const sort = (models, by, ord) => {
    setAirplaneModels(
      models.sort((element1, element2) => {
        if (ord === "asc") {
          return element1[by] > element2[by]
            ? 1
            : element1[by] < element2[by]
            ? -1
            : 0;
        } else {
          return element1[by] > element2[by]
            ? -1
            : element1[by] < element2[by]
            ? 1
            : 0;
        }
      })
    );
  };

  const airplaneModelsTableRows = airplaneModels.map(airplaneModel => (
    <TableRow key={airplaneModel.id}>
      <TableCell>{airplaneModel.name}</TableCell>
      <TableCell align="right">{airplaneModel.manufacturer}</TableCell>
      <TableCell align="right">{airplaneModel.symbol}</TableCell>
      <TableCell align="right">
        <IconButton>
          <Edit />
        </IconButton>
        <IconButton onClick={handleDelete} name={airplaneModel.id}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  ));

  return (
    <div id="airplane-models-table-container">
      <Paper>
        <Toolbar>
          <Typography variant="h6" id="tableTitle" className={classes.title}>
            <b>Aiplane Models</b>
          </Typography>
          <IconButton edge="end" onClick={handleClick}>
            <FilterList />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Typography style={{ paddingLeft: "5px" }}>
              <b>Filters</b>
            </Typography>
            <Divider />
            <MenuItem>
              <TextField
                variant="outlined"
                label="Name:"
                name="name-filter"
                value={nameFilter}
                onChange={handleChange}
              />
            </MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell key="name">
                <TableSortLabel
                  active={orderBy === "name"}
                  onClick={handleSort("name")}
                  direction={order}
                >
                  <b>Name</b>
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" key="manufacturer">
                <TableSortLabel
                  active={orderBy === "manufacturer"}
                  align="right"
                  onClick={handleSort("manufacturer")}
                  direction={order}
                >
                  <b>Manufacturer</b>
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" key="symbol">
                <TableSortLabel
                  active={orderBy === "symbol"}
                  align="right"
                  onClick={handleSort("symbol")}
                  direction={order}
                >
                  <b>Symbol</b>
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{airplaneModelsTableRows}</TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default AirplaneModelsList;
