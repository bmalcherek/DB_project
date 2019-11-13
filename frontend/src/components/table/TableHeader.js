import React, { useState } from "react";
import {
	TextField,
	MenuItem,
	Menu,
	IconButton,
	Toolbar,
	makeStyles,
	Typography,
	Divider
} from "@material-ui/core";
import { FilterList, AddCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
	title: {
		flex: "1 1 100%"
	}
}));

const TableHeader = props => {
	const [anchorFilter, setAnchorFilter] = useState(null);

	const classes = useStyles();

	const filters = props.filters.map(filter => (
		<MenuItem key={filter.name}>
			<TextField
				variant="outlined"
				label={filter.label}
				name={filter.name}
				value={filter.value}
				onChange={event => {
					filter.onChange(event.target.value);
				}}
			/>
		</MenuItem>
	));

	return (
		<div id="table-header-container">
			<Toolbar>
				<Typography variant="h6" id="tableTitle" className={classes.title}>
					<b>{props.tableTitle}</b>
				</Typography>
				<Link to={props.addLink}>
					<IconButton>
						<AddCircle />
					</IconButton>
				</Link>
				<IconButton onClick={event => setAnchorFilter(event.currentTarget)}>
					<FilterList />
				</IconButton>
				<Menu
					open={Boolean(anchorFilter)}
					anchorEl={anchorFilter}
					keepMounted
					onClose={() => setAnchorFilter(null)}
				>
					<Typography style={{ paddingLeft: "5px" }}>
						<b>Filters</b>
					</Typography>
					<Divider />
					{filters}
				</Menu>
			</Toolbar>
		</div>
	);
};

export default TableHeader;
