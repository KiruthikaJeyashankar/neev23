import axios from 'axios';
import React, { useState } from "react";

export default function GitProfile({ url }) {
  const [data, setData] = useState();

	async function fetchData() {
    const response = await axios.get(url);
    // setData(response.data);
    setData(response?.data);
  }

	return (
		<div>
			{data ? (
				<>
					<span>Data</span>
					<span>{data.login}</span>
					<span>{data.id}</span>
				</>
			) : (
				<span>No data found</span>
			)}
			<button onClick={fetchData}>Fetch data</button>
		</div>
	);
}
