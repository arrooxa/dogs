import React from "react";
import { STATS_GET } from "../api";
import Head from "../Helper/Head";
import useFetch from "../Hooks/useFetch";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import Empty from "../Helper/Empty";
const UserStatsGraph = React.lazy(() => import("./UserStatsGraph"));

const UserStats = () => {
	const { data, loading, error, request } = useFetch();

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
