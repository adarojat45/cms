import { useHistory } from "react-router-dom";

const Login = ({ onLogin }) => {
	const history = useHistory();

	const handleLogin = () => {
		onLogin && onLogin();
		history.push("/");
	};

	return (
		<section className="section" style={{ height: "100vh" }}>
			<div className="card">
				<div className="card-header">Login</div>
				<div className="card-body">
					<form onSubmit={handleLogin}>
						<div className="mb-3">
							<label for="exampleFormControlInput1" className="form-label">
								Email
							</label>
							<input type="email" className="form-control" />
						</div>
						<div className="mb-3">
							<label for="exampleFormControlInput1" className="form-label">
								Password
							</label>
							<input type="password" className="form-control" />
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
