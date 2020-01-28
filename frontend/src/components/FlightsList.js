import React, { useEffect, useState } from "react";
import { Table, TableRow, TableCell, TableBody } from "@material-ui/core";

import { fetchData, listSort } from "../helpers";
import { TableToolbar, TableHeader, TableActions } from "./table";

const FlightsList = () => {
	const [flights, setFlights] = useState([]);
	const [ogFlights, setOgFlights] = useState([]);
	const [flightNumberFilter, setFlightNumberFilter] = useState("");
	const [airlineFilter, setAirlineFilter] = useState("");
	const [fromAirportFilter, setFromAirportFilter] = useState("");
	const [toAirportFilter, setToAirportFilter] = useState("");
	const [crewFilter, setCrewFilter] = useState("");
	const [airplaneFilter, setAirplaneFilter] = useState("");
	const [placesFilter, setPlacesFilter] = useState("");
	const [orderBy, setOrderBy] = useState("name");
	const [order, setOrder] = useState("desc");
	const [edited, setEdited] = useState(false);

	useEffect(() => {
		document.title = "Flights List";
	}, []);

	useEffect(() => {
		const response = fetchData("api/flights/");
		response.then(res => {
			setFlights(res.data);
			setOgFlights(res.data);
			setEdited(false);
		});
	}, [edited]);

	useEffect(() => {
		if (ogFlights.length > 0) {
			setFlights(
				ogFlights.filter(
					row =>
						row.flight_number.startsWith(flightNumberFilter) &&
						row.airline.toString().startsWith(airlineFilter) &&
						row.from_airport.toString().startsWith(fromAirportFilter) &&
						row.to_airport.toString().startsWith(toAirportFilter) &&
						row.crew ? row.crew.toString().startsWith(crewFilter) : true &&
//						row.crew.toString().startsWith(crewFilter) &&
						row.airplane.toString().startsWith(airplaneFilter) &&
						row.num_places.toString().startsWith(placesFilter)
				)
			);
		}
	}, [
		flightNumberFilter,
		airlineFilter,
		fromAirportFilter,
		toAirportFilter,
		crewFilter,
		airplaneFilter,
		placesFilter,
		ogFlights
	]);

	useEffect(() => {
		if (flights.length > 0) {
			setFlights(listSort(flights, orderBy, order));
		}
	}, [flights, orderBy, order]);

	const dateOptions = { hour: "numeric", minute: "numeric" };

	const flightsTableRows = flights.map(flight => (
		<TableRow key={flight.id}>
			<TableCell>{flight.flight_number}</TableCell>
			<TableCell align="right">{flight.airline}</TableCell>
			<TableCell align="right">{flight.from_airport}</TableCell>
			<TableCell align="right">{flight.to_airport}</TableCell>
			<TableCell align="right">{flight.crew ? flight.crew : ''}</TableCell>
			<TableCell align="right">{flight.airplane}</TableCell>
			<TableCell align="right">
				{new Date(flight.departure_date).toLocaleDateString(
					"pl-PL",
					dateOptions
				)}
			</TableCell>
			<TableCell align="right">
				{new Date(flight.arrival_date).toLocaleDateString("pl-PL", dateOptions)}
			</TableCell>
			<TableCell align="right">{flight.num_places}</TableCell>
			<TableActions
				editLink={`/flights/${flight.id}/edit`}
				setEdited={setEdited}
				url="api/flights"
				itemID={flight.id}
			/>
		</TableRow>
	));

	const filters = [
		{
			label: "Flight Number",
			name: "flight-number",
			value: flightNumberFilter,
			onChange: setFlightNumberFilter
		},
		{
			label: "Airline",
			name: "airline",
			value: airlineFilter,
			onChange: setAirlineFilter
		},
		{
			label: "From",
			name: "from",
			value: fromAirportFilter,
			onChange: setFromAirportFilter
		},
		{
			label: "To",
			name: "to",
			value: toAirportFilter,
			onChange: setToAirportFilter
		},
		{
			label: "Crew",
			name: "crew",
			value: crewFilter,
			onChange: setCrewFilter
		},
		{
			label: "Airplane",
			name: "airplane",
			value: airplaneFilter,
			onChange: setAirplaneFilter
		},
		{
			label: "Places",
			name: "places",
			value: placesFilter,
			onChange: setPlacesFilter
		}
	];

	const headers = [
		{ align: "inherit", name: "Flight Number" },
		{ align: "right", name: "Airline" },
		{ align: "right", name: "From" },
		{ align: "right", name: "To" },
		{ align: "right", name: "Crew" },
		{ align: "right", name: "Airplane" },
		{ align: "right", name: "Departure Date" },
		{ align: "right", name: "Arrival Date" },
		{ align: "right", name: "Places" }
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
				tableTitle="Flights"
				addLink="/flights/add-flight"
				filters={filters}
			/>
			<Table>
				<TableHeader
					headers={headers}
					orderBy={orderBy}
					handleOrder={handleOrder}
					order={order}
				/>
				<TableBody>{flightsTableRows}</TableBody>
			</Table>
		</div>
	);
};

export default FlightsList;
