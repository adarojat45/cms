import { useHistory } from "react-router-dom";
import { myServer } from "../apis";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import toastHelper from "../helpers/toastHelper";

const Login = ({ onLogin }) => {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e) => {
		try {
			e.preventDefault();
			const { data } = await await toast.promise(
				myServer({
					url: "/users/login",
					method: "POST",
					data: {
						email,
						password,
					},
				}),
				{
					pending: toastHelper("Loading...", "info"),
					success: toastHelper("Successfully login", "success"),
					error: toastHelper(null, "error"),
				}
			);
			localStorage.setItem("token", data.token);
			onLogin && onLogin();
			history.push("/");
		} catch (error) {
			toast.error(error?.response?.data);
		}
	};

	return (
		<div className="page-heading d-flex flex-column justify-content-center align-items-cente">
			<div className="page-title d-flex flex-column justify-content-center align-items-center">
				<div className="row col-sm-12 col-md-12 col-lg-4">
					<div className="col-12 order-md-1 order-last">
						<h3>Login</h3>
						<p className="text-subtitle text-muted">Plase login here</p>
					</div>
				</div>
			</div>
			<section className="d-flex flex-column justify-content-center align-items-center">
				<div className="card col-sm-12 col-md-12 col-lg-4">
					<div className="card-header">Login</div>
					<div className="card-body">
						<form onSubmit={handleLogin}>
							<div className="mb-3">
								<label htmlFor="exampleFormControlInput1" className="form-label">
									Email
								</label>
								<input
									type="email"
									className="form-control"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="exampleFormControlInput1" className="form-label">
									Password
								</label>
								<input
									type="password"
									className="form-control"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className="mb-3 " align="right">
								<button type="submit" className="btn btn-primary mb-3">
									Login
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>
			<ToastContainer />
		</div>
	);
};

export default Login;
