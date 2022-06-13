import React from "react";
import { STATS_GET } from "../api";
import Head from "../Helper/Head";
import useFetch from "../Hooks/useFetch";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import Empty from "../Helper/Empty";
const UserStatsGraph = React.lazy(() => import("./UserStatsGraph"));

const data = [
	{ id: 21984, title: "dog3", acessos: "2" },
	{ id: 21982, title: "dog2", acessos: "1" },
	{ id: 21980, title: "dog", acessos: "1" },
	{ id: 21980, title: "dog", acessos: "3" },
];

const UserStats = () => {
	const { loading, error, request } = useFetch();

	React.useEffect(() => {
		async function fetchData() {
			const token = window.localStorage.getItem("token");

			const { url, options } = STATS_GET(token);

			const { response, json } = await request(url, options);
		}

		fetchData();
	}, [request]);

	return (
		<div>
			<Head title="Estatísticas" />
			{error && <Error error={error} />}
			{loading && <Loading />}
			{data && data.length === 0 && <Empty />}
			{data && data.length > 0 && (
				<React.Suspense fallback={<Empty />}>
					<UserStatsGraph data={data} />
				</React.Suspense>
			)}
		</div>
	);
};

export default UserStats;
