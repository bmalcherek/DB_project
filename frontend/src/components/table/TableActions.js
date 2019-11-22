import React from "react";
import { IconButton, TableCell } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";

import { deleteItem } from "../../helpers";

const TableActions = props => {
	const handleDelete = event => {
		const response = deleteItem(`${props.url}/${props.itemID}/`);
		response.then(() => props.setEdited(true));
	};

	return (
		<TableCell align="right">
			<Link to={props.editLink}>
				<IconButton>
					<Edit />
				</IconButton>
			</Link>
			<IconButton onClick={handleDelete} name={props.itemID}>
				<Delete />
			</IconButton>
		</TableCell>
	);
};

export default TableActions;
