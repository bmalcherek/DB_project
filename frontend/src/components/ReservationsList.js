import React, { useEffect, useState } from "react";
import { Table, TableRow, TableCell, TableBody } from "@material-ui/core";

import { fetchData, listSort } from "../helpers";
import { TableToolbar, TableHeader, TableActions } from "./table";

const ReservationsList = () => {
	const [reservations, setReservations] = useState([]);
	const [ogReservations, setOgReservations] = useState([]);
	const [userFilter, setUserFilter] = useState("");
	const [flightFilter, setFlightFilter] = useState("");
	const [priceFilter, setPriceFilter] = useState("");
	const [orderBy, setOrderBy] = useState("name");
	const [order, setOrder] = useState("desc");
	const [edited, setEdited] = useState(false);

	useEffect(() => {
		document.title = "Reservations List";
	}, []);

	useEffect(() => {
		const response = fetchData("api/reservations/");
		response.then(res => {
			setReservations(res.data);
			setOgReservations(res.data);
			setEdited(false);
		});
	}, [edited]);

	useEffect(() => {
		if (ogReservations.length > 0) {
			setReservations(
				ogReservations.filter(
					row =>
						row.user.toString().startsWith(userFilter) &&
						row.flight.toString().startsWith(flightFilter) &&
						row.price.toString().startsWith(priceFilter)
				)
			);
		}
	}, [ogReservations, userFilter, flightFilter, priceFilter]);

	useEffect(() => {
		if (reservations.length > 0) {
			setReservations(listSort(reservations, orderBy, order));
		}
	}, [reservations, orderBy, order]);

	const reservationsTableRows = reservations.map(reservation => (
		<TableRow key={reservation.id}>
			<TableCell>{reservation.user}</TableCell>
			<TableCell align="right">{reservation.flight}</TableCell>
			<TableCell align="right">{reservation.price}</TableCell>
			<TableActions
				editLink={`/reservations/${reservation.id}/edit`}
				setEdited={setEdited}
				url="api/reservations"
				itemID={reservation.id}
			/>
		</TableRow>
	));

	const filters = [
		{
			label: "User",
			name: "user",
			value: userFilter,
			onChange: setUserFilter
		},
		{
			label: "Flight",
			name: "flight",
			value: flightFilter,
			onChange: setFlightFilter
		},
		{
			label: "Price",
			name: "price",
			value: priceFilter,
			onChange: setPriceFilter
		}
	];

	const headers = [
		{ align: "inherit", name: "User" },
		{ align: "right", name: "Flight" },
		{ align: "right", name: "Price" }
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
				tableTitle="Reservations"
				addLink="reservations/add-reservation"
				filters={filters}
			/>

			<Table>
				<TableHeader
					headers={headers}
					orderBy={orderBy}
					handleOrder={handleOrder}
					order={order}
				/>

				<TableBody>{reservationsTableRows}</TableBody>
			</Table>
		</div>
	);
};

export default ReservationsList;
