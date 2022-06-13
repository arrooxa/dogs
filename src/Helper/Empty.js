import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Empty.module.css";

const Empty = () => {
	const navigate = useNavigate();

	function handleClick() {
		navigate("/conta/postar");
	}

	return (
		<div className={`${styles.wrapper} animeLeft`}>
			<p className={styles.text}>
				Ops! A galeria de fotos está vazia. Para postar uma foto clique aqui:
			</p>
			<button className={styles.button} onClick={handleClick}>
				Postar foto!
			</button>
		</div>
	);
};

export default Empty;
