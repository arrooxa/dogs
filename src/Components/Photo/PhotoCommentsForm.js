import React from "react";
import { ReactComponent as Enviar } from "../../Assets/enviar.svg";
import useFetch from "../../Hooks/useFetch";
import { COMMENT_POST } from "../../api";

const PhotoCommentsForm = ({ id }) => {
	const { request, error } = useFetch();

	const [comment, setComment] = React.useState("");

	async function handleSubmit(event) {
		event.preventDefault();

		const token = window.localStorage.getItem("token");

		const { url, options } = COMMENT_POST(id, { comment }, token);

		await request(url, options);
	}

	return (
		<form onSubmit={handleSubmit}>
			<textarea
				id="comment"
				name="comment"
				placeholder="Comente..."
				value={comment}
				onChange={({ target }) => setComment(target.value)}
			/>
			<button>
				<Enviar />
			</button>
		</form>
	);
};

export default PhotoCommentsForm;
