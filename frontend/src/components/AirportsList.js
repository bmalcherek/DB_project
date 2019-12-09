import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";

import { fetchData, listSort } from "../helpers";
import { TableToolbar, TableHeader, TableActions } from "./table";

const AirportList = () => {
	const [airports, setAirports] = useState([]);
	const [ogAirports, setOgAirports] = useState([]);
	const [nameFilter, setNameFilter] = useState("");
	const [icaoCodeFilter, setIcaoCodeFilter] = useState("");
	const [iataCodeFilter, setIataCodeFilter] = useState("");
	// const [countryFilter, setCountryFilter] = useState("");
	const [orderBy, setOrderBy] = useState("name");
	const [order, setOrder] = useState("desc");
	const [edited, setEdited] = useState(false);

	useEffect(() => {
		const response = fetchData("api/airports/");
		response.then(res => {
			setAirports(res.data);
			setOgAirports(res.data);
			setEdited(false);
		});
	}, [edited]);

	useEffect(() => {
		if (ogAirports.length > 0) {
			let ports = ogAirports;
			ports = ports
				.filter(row => {
					return row.name.toLowerCase().startsWith(nameFilter);
				})
				.filter(row => {
					return row.IATA_code.toLowerCase().startsWith(iataCodeFilter);
				})
				.filter(row => {
					return row.ICAO_code.toLowerCase().startsWith(icaoCodeFilter);
				});
			setAirports(ports);
		}
	}, [ogAirports, nameFilter, icaoCodeFilter, iataCodeFilter]);

	useEffect(() => {
		if (airports.length > 0) {
			setAirports(listSort(airports, orderBy, order));
		}
	}, [airports, orderBy, order]);

	const airportsTableRows = airports.map(airport => (
		<TableRow key={airport.id}>
			<TableCell>{airport.name}</TableCell>
			<TableCell align="right">{airport.IATA_code}</TableCell>
			<TableCell align="right">{airport.ICAO_code}</TableCell>
			<TableCell align="right">{airport.country}</TableCell>
			<TableActions
				editLink={`/airlines/${airport.id}/edit`}
				setEdited={setEdited}
				url="api/airports"
				itemID={airport.id}
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
		}
	];

	const headers = [
		{ align: "inherit", name: "Name" },
		{ align: "right", name: "IATA Code" },
		{ align: "right", name: "ICAO Code" },
		{ align: "right", name: "Country" }
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
		<div id="airports-list-container">
			<TableToolbar
				tableTitle="Airports"
				addLink="/airports/add-airport"
				filters={filters}
			/>

			<Table>
				<TableHeader
					headers={headers}
					orderBy={orderBy}
					handleOrder={handleOrder}
					order={order}
				/>

				<TableBody>{airportsTableRows}</TableBody>
			</Table>
		</div>
	);
};

export default AirportList;
