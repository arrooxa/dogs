import React from "react";
import { Link } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import { UserContext } from "../../UserContext";

const LoginForm = () => {
	const username = useForm();
	const password = useForm();

	const { userLogin } = React.useContext(UserContext);

	async function handleLogin(e) {
		e.preventDefault();
		if (username.validate() && password.validate()) {
			userLogin(username.value, password.value);
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
