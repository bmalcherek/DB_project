import React, { useState, useEffect } from "react";
import {
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	Button
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";

import { fetchData, deleteItem } from "../helpers";

//TODO: implement edit

const AirportList = () => {
	const [airports, setAirtports] = useState([]);
	const [edited, setEdited] = useState(false);

	useEffect(() => {
		const response = fetchData("api/airports/");
		response.then(res => {
			setAirtports(res.data);
			setEdited(false);
		});
	}, [edited]);

	const handleDelete = event => {
		const response = deleteItem(`api/airports/${event.currentTarget.name}/`);
		response.then(() => setEdited(true));
	};

	const airportsListElements = airports.map(airport => (
		<ListItem button key={airport.id}>
			<ListItemText
				primary={airport.name}
				secondary={`IATA code: ${airport.IATA_code}, ICAO code: ${airport.ICAO_code}, countryID: ${airport.country}`}
			/>
			<ListItemSecondaryAction>
				<Link to={`/airports/${airport.id}/edit`}>
					<IconButton edge="end">
						<Edit />
					</IconButton>
				</Link>
				<IconButton edge="end" onClick={handleDelete} name={airport.id}>
					<Delete name={airport.id} />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	));

	return (
		<div>
			<div id="airport-utils">
				<Link to="/airports/add-airport" className="link">
					<Button id="add-airport-btn" variant="contained">
						Add Airport
					</Button>
				</Link>
			</div>
			<div id="airports-list-container">
				<List id="airports-list">{airportsListElements}</List>
			</div>
		</div>
	);
};

export default AirportList;
