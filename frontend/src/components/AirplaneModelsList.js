import React, { useState, useEffect } from "react";
import {
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
	Paper
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";

import { fetchData, deleteItem } from "../helpers";
import TableToolbar from "./table/TableToolbar";

//TODO: implement edit
//TODO: implement adding airplaneModels

const AirplaneModelsList = () => {
	const [airplaneModels, setAirplaneModels] = useState([]);
	const [ogAirplaneModels, setOgAirplaneModels] = useState([]);
	const [orderBy, setOrderBy] = useState("name");
	const [order, setOrder] = useState("desc");
	const [nameFilter, setNameFilter] = useState("");
	const [manufacturerFilter, setManufacturerFilter] = useState("");
	const [symbolFilter, setSymbolFilter] = useState("");
	const [edited, setEdited] = useState(false);

	useEffect(() => {
		const response = fetchData("api/airplane-models/");
		response.then(res => {
			setOgAirplaneModels(res.data);
			setAirplaneModels(res.data);
			setEdited(false);
		});
	}, [edited]);

	const handleDelete = event => {
		const response = deleteItem(
			`api/airplane-models/${event.currentTarget.name}/`
		);
		response.then(() => setEdited(true));
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
				<Link to={`/airplane-models/${airplaneModel.id}/edit`}>
					<IconButton>
						<Edit />
					</IconButton>
				</Link>
				<IconButton onClick={handleDelete} name={airplaneModel.id}>
					<Delete />
				</IconButton>
			</TableCell>
		</TableRow>
	));

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	const filters = [
		{ label: "Name", name: "name", value: nameFilter, onChange: setNameFilter },
		{
			label: "Manufacturer",
			name: "manufacturer",
			value: manufacturerFilter,
			onChange: setManufacturerFilter
		},
		{
			label: "Symbol",
			name: "symbol",
			value: symbolFilter,
			onChange: setSymbolFilter
		}
	];

	useEffect(() => {
		if (ogAirplaneModels.length > 0) {
			let models = ogAirplaneModels;
			models = models
				.filter(row => {
					return row.name.toLowerCase().startsWith(nameFilter);
				})
				.filter(row => {
					return row.manufacturer.toLowerCase().startsWith(manufacturerFilter);
				})
				.filter(row => {
					return row.symbol.toLowerCase().startsWith(symbolFilter);
				});
			setAirplaneModels(models);
		}
	}, [nameFilter, manufacturerFilter, symbolFilter, ogAirplaneModels]);

	return (
		<div id="airplane-models-table-container">
			<Paper>
				<TableToolbar
					tableTitle="Airplane Models"
					addLink="/airplane-models/add-airplane-model"
					filters={filters}
				/>

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
