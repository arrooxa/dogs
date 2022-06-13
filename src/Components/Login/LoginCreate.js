import React from "react";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import useForm from "../../Hooks/useForm";
import { USER_POST } from "../../api";
import Error from "../../Helper/Error";
import useFetch from "../../Hooks/useFetch";
import { UserContext } from "../../UserContext";
import Head from "../../Helper/Head";

const LoginCreate = () => {
	const username = useForm();
	const email = useForm("email");
	const password = useForm();

	const { loading, error, request } = useFetch();

	const { userLogin } = React.useContext(UserContext);

	async function handleCreate(event) {
		event.preventDefault();

		const { url, options } = USER_POST({
			username: username.value,
			email: email.value,
			password: password.value,
		});

		const { response } = await request(url, options);

		if (response.ok) userLogin(username.value, password.value);
	}

	return (
		<section className="animeLeft">
			<Head title="Criar conta" />
			<h1 className="title">Cadastre-se</h1>
			<form onSubmit={handleCreate}>
				<Input label="Usuário" type="text" name="username" {...username} />
				<Input label="E-mail" type="email" name="email" {...email} />
				<Input label="Senha" type="password" name="password" {...password} />
				<Error error={error} />
				{loading ? (
					<Button disabled>Carregando...</Button>
				) : (
					<Button>Criar</Button>
				)}
			</form>
		</section>
	);
};

export default LoginCreate;
