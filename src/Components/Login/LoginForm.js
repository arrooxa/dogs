import React from "react";
import { Link } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import { TOKEN_POST, USER_GET } from "../../api";

const LoginForm = () => {
	const username = useForm();
	const password = useForm();

	React.useEffect(() => {
		const token = window.localStorage.getItem("token");
		if (token) {
			getUser(token);
		}
	}, []);

	async function getUser(token) {
		const { url, options } = USER_GET(token);

		const response = await fetch(url, options);

		const resolve = await response.json();

		console.log(resolve);
	}

	async function handleLogin(e) {
		e.preventDefault();
		if (username.validate() && password.validate()) {
			const { url, options } = TOKEN_POST({
				username: username.value,
				password: password.value,
			});

			const response = await fetch(url, options);

			const resolve = await response.json();

			window.localStorage.setItem("token", resolve.token);
			getUser(resolve.token);
		}
	}

	return (
		<section>
			<h1>Login</h1>
			<form onSubmit={handleLogin}>
				<Input name="username" label="Usuário" type="text" {...username} />
				<Input name="password" label="Senha" type="password" {...password} />
				<Button>Enviar</Button>
			</form>
			<Link to="criar">Cadastro</Link>
		</section>
	);
};

export default LoginForm;
