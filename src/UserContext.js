import React from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET, USER_POST } from "./api";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
	const [data, setData] = React.useState(null);
	const [login, setLogin] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);

	const navigate = useNavigate();

	React.useEffect(() => {
		async function autoLogin() {
			const token = window.localStorage.getItem("token");

			if (token) {
				try {
					const { url, options } = TOKEN_VALIDATE_POST(token);

					const response = await fetch(url, options);

					if (!response.ok) throw new Error("Token inválido");

					await getUser(token);
				} catch (err) {
					userLogout();
				} finally {
					setLoading(false);
				}
			}
		}

		autoLogin();
	}, []);

	async function getUser(token) {
		const { url, options } = USER_GET(token);

		const response = await fetch(url, options);

		const resolve = await response.json();

		setData(resolve);

		setLogin(true);
	}

	async function userLogin(username, password) {
		try {
			setError(null);
			setLoading(true);
			const { url, options } = TOKEN_POST({ username, password });
			const tokenRes = await fetch(url, options);
			if (!tokenRes.ok) throw new Error(`Erro: Login Inválido`);
			const { token } = await tokenRes.json();
			window.localStorage.setItem("token", token);
			await getUser(token);
			navigate("/conta");
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	async function userLogout() {
		setData(null);
		setError(null);
		setLoading(false);
		setLogin(false);
		window.localStorage.removeItem("token");
		navigate("/login");
	}

	return (
		<UserContext.Provider
			value={{ userLogin, userLogout, data, error, loading, login }}
		>
			{children}
		</UserContext.Provider>
	);
};
