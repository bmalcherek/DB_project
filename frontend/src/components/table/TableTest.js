import React, { useState } from "react";
import { IconButton, Table } from "@material-ui/core";
import { FilterList } from "@material-ui/icons";

import TableToolbar from "./TableToolbar";
import TableHeader from "./TableHeader";

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

	const headers = [
		{ align: "inherit", name: "Name" },
		{ align: "right", name: "Right" }
	];

	return (
		<div id="table-test-container">
			<TableToolbar filters={filters} tableTitle="Test" addLink="/test/add" />
			<Table>
				<TableHeader
					headers={headers}
					orderBy="name"
					changeSort={() => console.log("changeSort")}
					order="desc"
				/>
			</Table>
		</div>
	);
};

export default TableTest;
