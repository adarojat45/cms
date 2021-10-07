const Login = () => {
	return (
		<section class="section">
			<div class="card">
				<div class="card-header">Login</div>
				<div class="card-body">
					<div class="mb-3">
						<label for="exampleFormControlInput1" class="form-label">
							Email
						</label>
						<input type="email" class="form-control" />
					</div>
					<div class="mb-3">
						<label for="exampleFormControlInput1" class="form-label">
							Password
						</label>
						<input type="password" class="form-control" />
					</div>
					<div class="mb-3">
						<button type="submit" class="btn btn-primary mb-3">
							Login
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
