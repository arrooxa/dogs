import React from "react";
import styles from "./UserStatsGraph.module.css";

import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement
);

const options = {
	responsive: true,
};

const UserStatsGraph = ({ data }) => {
	const [total, setTotal] = React.useState(0);
	const [graphData, setGraphData] = React.useState([]);
	const [labels, setLabels] = React.useState([]);

	React.useEffect(() => {
		const graphData = data.map((item) => Number(item.acessos));
		setGraphData(graphData);

		const graphLabels = data.map((item) => item.title);
		setLabels(graphLabels);

		const total = data
			.map(({ acessos }) => Number(acessos))
			.reduce((a, b) => a + b);
		setTotal(total);
	}, [data]);

	return (
		<section className={`${styles.graphs} animeLeft`}>
			<div className={`${styles.total} ${styles.graphItem}`}>
				<p>Total de Acessos: {total}</p>
			</div>
			<div className={styles.graphItem}>
				<Doughnut
					data={{
						labels,
						datasets: [
							{
								label: "Número de acessos individuais",
								data: graphData,
								backgroundColor: [
									"rgba(245, 161, 39, 0.67)",
									"rgba(0, 0, 0, 0.65)",
								],
								borderColor: "rgba(228, 227, 229, 0.39)",
								borderWidth: 5,
							},
						],
					}}
				/>
			</div>
			<div className={styles.graphItem}>
				<Bar
					data={{
						labels,
						datasets: [
							{
								label: "Número de acessos individuais",
								data: graphData,
								backgroundColor: ["rgba(245, 161, 39, 0.67)"],
							},
						],
					}}
					options={options}
				/>
			</div>
		</section>
	);
};

export default UserStatsGraph;
