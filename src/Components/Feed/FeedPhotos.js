import React from "react";
import { PHOTOS_GET } from "../../api";
import Error from "../../Helper/Error";
import Loading from "../../Helper/Loading";
import useFetch from "../../Hooks/useFetch";
import FeedPhotosItem from "./FeedPhotosItem";
import styles from "./FeedPhotos.module.css";
import Empty from "../../Helper/Empty";

const FeedPhotos = ({ setInfinite, page, user, setModalPhoto }) => {
	const { data, loading, error, request } = useFetch();

	React.useEffect(() => {
		async function fetchPhotos() {
			let total = 6;

			const { url, options } = PHOTOS_GET({ page, total, user });

			const { response, json } = await request(url, options);

			if (response && response.ok && json.length < total) setInfinite(false);
		}
		fetchPhotos();
	}, [request, user]);

	if (error) return <Error error={error} />;
	if (loading) return <Loading />;
	if (data && data.length === 0) return <Empty />;
	if (data && data.length > 0)
		return (
			<ul className={`${styles.feed} animeLeft`}>
				{data.map((photo) => (
					<FeedPhotosItem
						key={photo.id}
						photo={photo}
						setModalPhoto={setModalPhoto}
					/>
				))}
			</ul>
		);
	else return null;
};

export default FeedPhotos;
