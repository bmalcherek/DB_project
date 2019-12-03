import React, { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
	Paper
} from "@material-ui/core";

import { fetchData, listSort } from "../helpers";
import { TableToolbar, TableHeader, TableActions } from "./table";

const Countrieslist = () => {
	const [countries, setCountries] = useState([]);
	const [ogCountries, setOgCountries] = useState([]);
	const [nameFilter, setNameFilter] = useState("");
	const [continentFilter, setContinentFilter] = useState("");
	const [currencyFilter, setCurrencyFilter] = useState("");
	const [languageFilter, setLanguageFilter] = useState("");
	const [orderBy, setOrderBy] = useState("name");
	const [order, setOrder] = useState("desc");
	const [edited, setEdited] = useState(false);

	useEffect(() => {
		const response = fetchData("api/countries/");
		response.then(res => {
			setCountries(res.data);
			setOgCountries(res.data);
			setEdited(false);
		});
	}, [edited]);

	useEffect(() => {
		if (ogCountries.length > 0) {
			setCountries(
				ogCountries
					.filter(row => {
						return row.name.toLowerCase().startsWith(nameFilter);
					})
					.filter(row => {
						return row.continent.toLowerCase().startsWith(continentFilter);
					})
					.filter(row => {
						return row.currency.toLowerCase().startsWith(currencyFilter);
					})
					.filter(row => {
						return row.language.toLowerCase().startsWith(languageFilter);
					})
			);
		}
	}, [
		nameFilter,
		continentFilter,
		currencyFilter,
		languageFilter,
		ogCountries
	]);

	useEffect(() => {
		if (countries.length > 0) {
			setCountries(listSort(countries, orderBy, order));
		}
	}, [order, orderBy, countries]);

	const countriesTableRows = countries.map(country => (
		<TableRow key={country.id}>
			<TableCell>{country.name}</TableCell>
			<TableCell align="right">{country.continent}</TableCell>
			<TableCell align="right">{country.currency}</TableCell>
			<TableCell align="right">{country.language}</TableCell>
			<TableActions
				editLink={`/countires/${country.id}/edit`}
				setEdited={setEdited}
				url="api/countires"
				itemID={country.id}
			/>
		</TableRow>
	));

	const filters = [
		{ label: "Name", name: "name", value: nameFilter, onChange: setNameFilter },
		{
			label: "Continent",
			name: "continent",
			value: continentFilter,
			onChange: setContinentFilter
		},
		{
			label: "Currency",
			name: "currency",
			value: currencyFilter,
			onChange: setCurrencyFilter
		},
		{
			label: "Language",
			name: "language",
			value: languageFilter,
			onChange: setLanguageFilter
		}
	];

	const headers = [
		{ align: "inherit", name: "Name" },
		{ align: "right", name: "Continent" },
		{ align: "right", name: "Currency" },
		{ align: "right", name: "Language" }
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
		<div id="countires-list-table-container">
			<Paper>
				<TableToolbar
					tableTitle="Countries"
					addLink="/countries/add-country"
					filters={filters}
				/>

				<Table>
					<TableHeader
						headers={headers}
						orderBy={orderBy}
						handleOrder={handleOrder}
						order={order}
					/>

					<TableBody>{countriesTableRows}</TableBody>
				</Table>
			</Paper>
		</div>
	);
};

export default Countrieslist;
