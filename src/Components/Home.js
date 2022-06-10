import React from "react";
import Head from "../Helper/Head";
import Feed from "./Feed/Feed";

const Home = () => {
	return (
		<section className="container mainContainer">
			<Head title="Home" description="Home do site Dogs" />
			<Feed />
		</section>
	);
};

export default Home;
