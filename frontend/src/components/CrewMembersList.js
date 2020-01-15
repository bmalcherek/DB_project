import React, { useState, useEffect } from "react";
import { Table, TableRow, TableCell, TableBody } from "@material-ui/core";

import { fetchData, listSort } from "../helpers";
import { TableToolbar, TableHeader, TableActions } from "./table";

const CrewMembersList = () => {
	const [crewMembers, setCrewMembers] = useState([]);
	const [ogCrewMembers, setOgCrewMembers] = useState([]);
	const [nameFilter, setNameFilter] = useState("");
	const [jobTitleFilter, setJobTitleFilter] = useState("");
	const [orderBy, setOrderBy] = useState("name");
	const [order, setOrder] = useState("desc");
	const [edited, setEdited] = useState(false);

	useEffect(() => {
		const response = fetchData("api/crew-members/");
		response.then(res => {
			setCrewMembers(res.data);
			setOgCrewMembers(res.data);
			setEdited(false);
		});
	}, [edited]);

	useEffect(() => {
		if (ogCrewMembers.length > 0) {
			setCrewMembers(
				ogCrewMembers.filter(row => {
					return (
						row.name
							.toString()
							.toLowerCase()
							.startsWith(nameFilter.toLowerCase()) &&
						row.job_title
							.toStirng()
							.toLowerCase()
							.startsWith(jobTitleFilter.toLowerCase())
					);
				})
			);
			setCrewMembers(members);
		}
	}, [ogCrewMembers, nameFilter, jobTitleFilter]);

	useEffect(() => {
		if (crewMembers.length > 0) {
			setCrewMembers(listSort(crewMembers, orderBy, order));
		}
	}, [crewMembers, orderBy, order]);

	const crewMembersTableRows = crewMembers.map(crewMember => (
		<TableRow key={crewMember.id}>
			<TableCell>{crewMember.name}</TableCell>
			<TableCell align="right">{crewMember.airline}</TableCell>
			<TableCell align="right">{crewMember.crew}</TableCell>
			<TableCell align="right">{crewMember.job_title}</TableCell>
			<TableActions
				editLink={`/crew-members/${crewMember.id}/edit`}
				setEdited={setEdited}
				url="api/crew-members"
				itemID={crewMember.id}
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
			label: "Job Title",
			name: "job-title",
			value: jobTitleFilter,
			onChange: setJobTitleFilter
		}
	];

	const headers = [
		{ align: "inherit", name: "Name" },
		{ align: "right", name: "Airline" },
		{ align: "right", name: "Crew" },
		{ align: "right", name: "Job Title" }
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
		<div id="crew-members-list=container">
			<TableToolbar
				tableTitle="Crew Members"
				addLink="/crew-members/add-crew-member"
				filters={filters}
			/>

			<Table>
				<TableHeader
					headers={headers}
					orderBy={orderBy}
					handleOrder={handleOrder}
					order={order}
				/>

				<TableBody>{crewMembersTableRows}</TableBody>
			</Table>
		</div>
	);
};

export default CrewMembersList;
