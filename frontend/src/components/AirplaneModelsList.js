import React, { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
	Paper
} from "@material-ui/core";

import { fetchData } from "../helpers";
import { TableToolbar, TableHeader, TableActions } from "./table";

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

	const airplaneModelsTableRows = airplaneModels.map(airplaneModel => (
		<TableRow key={airplaneModel.id}>
			<TableCell>{airplaneModel.name}</TableCell>
			<TableCell align="right">{airplaneModel.manufacturer}</TableCell>
			<TableCell align="right">{airplaneModel.symbol}</TableCell>
			<TableActions
				editLink={`/airplane-models/${airplaneModel.id}/edit`}
				setEdited={setEdited}
				url="api/airplane-models"
				itemID={airplaneModel.id}
			/>
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

	const headers = [
		{ align: "inherit", name: "Name" },
		{ align: "right", name: "Manufacturer" },
		{ align: "right", name: "Symbol" }
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

	useEffect(() => {
		if (ogAirplaneModels.length > 0) {
			const models = ogAirplaneModels;
			setAirplaneModels(
				models.sort((model1, model2) => {
					if (order === "asc") {
						return model1[orderBy] > model2[orderBy]
							? 1
							: model1[orderBy] < model2[orderBy]
							? -1
							: 0;
					} else {
						return model1[orderBy] > model2[orderBy]
							? -1
							: model1[orderBy] < model2[orderBy]
							? 1
							: 0;
					}
				})
			);
		}
	}, [order, orderBy, ogAirplaneModels]);

	const handleOrder = name => {
		if (orderBy === name) {
			setOrder(order === "desc" ? "asc" : "desc");
		} else {
			setOrder("desc");
			setOrderBy(name);
		}
	};

	return (
		<div id="airplane-models-table-container">
			<Paper>
				<TableToolbar
					tableTitle="Airplane Models"
					addLink="/airplane-models/add-airplane-model"
					filters={filters}
				/>

				<Table>
					<TableHeader
						headers={headers}
						orderBy={orderBy}
						handleOrder={handleOrder}
						order={order}
					/>

					<TableBody>{airplaneModelsTableRows}</TableBody>
				</Table>
			</Paper>
		</div>
	);
};

export default AirplaneModelsList;
