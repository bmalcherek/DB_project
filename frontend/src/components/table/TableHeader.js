import React from "react";
import {
	TableHead,
	TableRow,
	TableCell,
	TableSortLabel
} from "@material-ui/core";

const TableHeader = props => {
	const tableHeaders = props.headers.map(header => (
		<TableCell key={header.name} align={header.align}>
			<TableSortLabel
				active={props.orderBy === header.name.toLowerCase()}
				onClick={() => props.handleOrder(header.name.toLowerCase())}
				direction={props.order}
			>
				<b>{header.name}</b>
			</TableSortLabel>
		</TableCell>
	));

	return (
		<TableHead>
			<TableRow>
				{tableHeaders}
				<TableCell align="right">
					<b>Actions</b>
				</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default TableHeader;
