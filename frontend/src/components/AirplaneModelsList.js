import React, { useState, useEffect } from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

import { fetchData } from "../helpers";

//TODO: implement edit
//TODO: implement adding airplaneModels

const AirplaneModelsList = () => {
  const [airplaneModels, setAirplaneModels] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    const response = fetchData("api/airplane-models/");
    response.then(res => setAirplaneModels(res.data));
  }, []);

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
    </div>
  );
};

export default AirplaneModelsList;
