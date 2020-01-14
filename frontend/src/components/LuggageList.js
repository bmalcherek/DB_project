import React, { useEffect, useState } from "react";
import { Table, TableRow, TableCell, TableBody } from "@material-ui/core";

import { fetchData, listSort } from "../helpers";
import { TableToolbar, TableHeader, TableActions } from "./table";

const LuggageList = () => {
	const [luggage, setLuggage] = useState([]);
	const [ogLuggage, setOgLuggage] = useState([]);
	const [amountFilter, setAmountFilter] = useState("");
	const [weightLimitFilter, setWeightLimitFilter] = useState("");
	const [reservationFilter, setReservationFilter] = useState("");
	const [orderBy, setOrderBy] = useState("name");
	const [order, setOrder] = useState("desc");
	const [edited, setEdited] = useState(false);

	useEffect(() => {
		document.title = "Luggage List";
	}, []);

	useEffect(() => {
		const response = fetchData("api/luggage/");
		response.then(res => {
			setLuggage(res.data);
			setOgLuggage(res.data);
			setEdited(false);
		});
	}, [edited]);

	useEffect(() => {
		if (ogLuggage.length > 0) {
			setLuggage(
				ogLuggage.filter(
					row =>
						row.amount.toString().startsWith(amountFilter) &&
						row.weight_limit.toString().startsWith(weightLimitFilter) &&
						row.reservation.toString().startsWith(reservationFilter)
				)
			);
		}
	}, [ogLuggage, amountFilter, weightLimitFilter, reservationFilter]);

	useEffect(() => {
		if (luggage.length > 0) {
			setLuggage(listSort(luggage, orderBy, order));
		}
	}, [luggage, orderBy, order]);

	const luggageTableRows = luggage.map(bag => (
		<TableRow key={bag.id}>
			<TableCell>{bag.amount}</TableCell>
			<TableCell align="right">{bag.weight_limit}</TableCell>
			<TableCell align="right">{bag.reservation}</TableCell>
			<TableActions
				editLink={`/luggage/${bag.id}/edit`}
				setEdited={setEdited}
				url="api/luggage"
				itemID={bag.id}
			/>
		</TableRow>
	));

	const filters = [
		{
			label: "Amount",
			name: "amount",
			value: amountFilter,
			onChange: setAmountFilter
		},
		{
			label: "Weight",
			name: "weight",
			value: weightLimitFilter,
			onChange: setWeightLimitFilter
		},
		{
			label: "Reservation",
			name: "reservation",
			value: reservationFilter,
			onChange: setReservationFilter
		}
	];

	const headers = [
		{
			align: "inherit",
			name: "Amount"
		},
		{ align: "right", name: "Weight" },
		{ align: "right", name: "Reservation" }
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
				tableTitle="Luggage"
				addLink="/luggage/add-luggage"
				filters={filters}
			/>
			<Table>
				<TableHeader
					headers={headers}
					orderBy={orderBy}
					handleOrder={handleOrder}
					order={order}
				/>

				<TableBody>{luggageTableRows}</TableBody>
			</Table>
		</div>
	);
};

export default LuggageList;
