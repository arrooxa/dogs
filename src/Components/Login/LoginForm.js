import React from "react";
import { Link } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import { UserContext } from "../../UserContext";
import Error from "../../Helper/Error";
import styles from "./LoginForm.module.css";
import stylesBtn from "../Forms/Button.module.css";
import Head from "../../Helper/Head";

const LoginForm = () => {
	const username = useForm();
	const password = useForm();

	const { userLogin, error, loading } = React.useContext(UserContext);

	async function handleLogin(e) {
		e.preventDefault();
		if (username.validate() && password.validate()) {
			userLogin(username.value, password.value);
		}
	}

	return (
		<section className="animeLeft">
			<Head title="Login" />
			<h1 className="title">Login</h1>
			<form className={styles.form} onSubmit={handleLogin}>
				<Input name="username" label="Usuário" type="text" {...username} />
				<Input name="password" label="Senha" type="password" {...password} />
				{loading ? (
					<Button disabled>Carregando...</Button>
				) : (
					<Button>Entrar</Button>
				)}
				<Error error={error} />
			</form>
			<Link className={styles.perdeu} to="/login/perdeu">
				Esqueceu a senha?
			</Link>
			<div className={styles.cadastro}>
				<h2 className={styles.subtitle}>Cadastre-se</h2>
				<p>Ainda não possui conta? Cadastre-se no site.</p>
				<Link className={stylesBtn.button} to="criar">
					Cadastro
				</Link>
			</div>
		</section>
	);
};

export default LoginForm;
