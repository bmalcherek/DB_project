import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import { FilterList } from "@material-ui/icons";

import TableToolbar from "./TableToolbar";

const TableTest = () => {
	const [test, setTest] = useState("");

	const filters = [
		{
			label: "Test",
			name: "test",
			value: test,
			onChange: setTest
		}
	];

	return (
		<div id="table-test-container">
			<TableToolbar filters={filters} tableTitle="Test" addLink="/test/add" />
			<IconButton onClick={() => console.log(test)} edge="end">
				<FilterList />
			</IconButton>
		</div>
	);
};

export default TableTest;
