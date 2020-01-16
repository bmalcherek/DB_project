import React, { useEffect, useState } from "react";
import { Table, TableRow, TableCell, TableBody } from "@material-ui/core";

import { fetchData, listSort } from "../helpers";
import { TableToolbar, TableHeader, TableActions } from "./table";

const CrewsList = () => {
	const [crews, setCrews] = useState([]);
	const [orderBy, setOrderBy] = useState("name");
	const [order, setOrder] = useState("desc");
	const [edited, setEdited] = useState(false);

	useEffect(() => {
		document.title = "Crews List";
	}, []);

	useEffect(() => {
		const response = fetchData("api/crews/");
		response.then(res => {
			setCrews(res.data);
			setEdited(false);
		});
	}, [edited]);

	useEffect(() => {
		if (crews.length > 0) {
			setCrews(listSort(crews, orderBy, order));
		}
	}, [crews, orderBy, order]);

	const crewsTableRows = crews.map(crew => (
		<TableRow key={crew.id}>
			<TableCell>{crew.id}</TableCell>
			<TableCell align="right">{crew.size}</TableCell>
			<TableCell align="right">{crew.airline}</TableCell>
			<TableActions
				editLink={`/crews/${crew.id}/edit`}
				setEdited={setEdited}
				url="api/crews"
				itemID={crew.id}
			/>
		</TableRow>
	));

	const filters = [];

	const headers = [
		{ align: "inherit", name: "ID" },
		{ align: "right", name: "Size" },
		{ align: "right", name: "Airline" }
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
		<div id="crews-list-container">
			<TableToolbar
				tableTitle="Crews"
				addLink="crews/add-crew"
				filters={filters}
			/>

			<Table>
				<TableHeader
					headers={headers}
					orderBy={orderBy}
					handleOrder={handleOrder}
					order={order}
				/>

				<TableBody>{crewsTableRows}</TableBody>
			</Table>
		</div>
	);
};

export default CrewsList;
