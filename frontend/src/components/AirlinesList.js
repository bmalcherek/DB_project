import React, { useEffect, useState } from "react";
import { Table, TableRow, TableCell, TableBody } from "@material-ui/core";

import { fetchData, listSort } from "../helpers";
import { TableToolbar, TableHeader, TableActions } from "./table";

const AirlinesList = () => {
	const [airlines, setAirlines] = useState([]);
	const [ogAirlines, setOgAirlines] = useState([]);
	const [nameFilter, setNameFilter] = useState("");
	const [icaoCodeFilter, setIcaoCodeFilter] = useState("");
	const [iataCodeFilter, setIataCodeFilter] = useState("");
	const [baseAirportFilter, setBaseAirportFilter] = useState("");
	const [orderBy, setOrderBy] = useState("name");
	const [order, setOrder] = useState("desc");
	const [edited, setEdited] = useState(false);

	useEffect(() => {
		document.title = "Airlines List";
	}, []);

	useEffect(() => {
		const response = fetchData("api/airlines/");
		response.then(res => {
			setAirlines(res.data);
			setOgAirlines(res.data);
			setEdited(false);
		});
	}, [edited]);

	useEffect(() => {
		if (ogAirlines.length > 0) {
			let lines = ogAirlines;
			lines = lines
				.filter(row => {
					return row.name.toLowerCase().startsWith(nameFilter);
				})
				.filter(row => {
					return row.iata_code.toLowerCase().startsWith(iataCodeFilter);
				})
				.filter(row => {
					return row.icao_code.toLowerCase().startsWith(icaoCodeFilter);
				});
			setAirlines(lines);
		}
	}, [
		ogAirlines,
		nameFilter,
		icaoCodeFilter,
		iataCodeFilter,
		baseAirportFilter
	]);

	useEffect(() => {
		if (airlines.length > 0) {
			setAirlines(listSort(airlines, orderBy, order));
		}
	}, [airlines, orderBy, order]);

	const airlinesTableRows = airlines.map(airline => (
		<TableRow key={airline.id}>
			<TableCell>{airline.name}</TableCell>
			<TableCell align="right">{airline.iata_code}</TableCell>
			<TableCell align="right">{airline.icao_code}</TableCell>
			<TableCell align="right">{airline.base_airport}</TableCell>
			<TableActions
				editLink={`/airlines/${airline.id}/edit`}
				setEdited={setEdited}
				url="api/airlines"
				itemID={airline.id}
			/>
		</TableRow>
	));

	const filters = [
		{
			label: "Name",
			name: "name",
			value: nameFilter,
			onChange: setNameFilter
		},
		{
			label: "IATA code",
			name: "iata-code",
			value: iataCodeFilter,
			onChange: setIataCodeFilter
		},
		{
			label: "ICAO code",
			name: "icao-code",
			value: icaoCodeFilter,
			onChange: setIcaoCodeFilter
		},
		{
			label: "Base Airport",
			name: "base-airport",
			value: baseAirportFilter,
			onChange: setBaseAirportFilter
		}
	];

	const headers = [
		{ align: "inherit", name: "Name" },
		{ align: "right", name: "IATA Code" },
		{ align: "right", name: "ICAO Code" },
		{ align: "right", name: "BaseAirport" }
	];

	const handleOrder = name => {
		if (orderBy === name) {
			setOrder(order === "desc" ? "asc" : "desc");
		} else {
			setOrder("desc");
			setOrderBy(name);
		}
	};

	return (
		<div>
			<TableToolbar
				tableTitle="Airlines"
				addLink="/airlines/add-airline"
				filters={filters}
			/>

			<Table>
				<TableHeader
					headers={headers}
					orderBy={orderBy}
					handleOrder={handleOrder}
					order={order}
				/>

				<TableBody>{airlinesTableRows}</TableBody>
			</Table>
		</div>
	);
};

export default AirlinesList;
