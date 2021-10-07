import { useHistory } from "react-router-dom";
import { myServer } from "../apis";
import { useState } from "react";

const Login = ({ onLogin }) => {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e) => {
		try {
			e.preventDefault();
			const { data } = await myServer({
				url: "/users/login",
				method: "POST",
				data: {
					email,
					password,
				},
			});
			localStorage.setItem("token", data.token);
			onLogin && onLogin();
			history.push("/");
		} catch (error) {
			console.log("🚀 ~ file: Login.js ~ line 19 ~ handleLogin ~ error", error);
		}
	};

	return (
		<section className="section" style={{ height: "100vh" }}>
			<div className="card">
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
						<div className="mb-3">
							<button type="submit" className="btn btn-primary mb-3">
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Login;
