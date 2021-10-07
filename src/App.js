import { Sidebar } from "./components";
import { useState } from "react";

function App() {
	const [isSidebar, setIsSidebar] = useState(true);
	return (
		<div className="App">
			<Sidebar isActive={isSidebar} />
			<div id="main">
				<header className="mb-3">
					<nav className="navbar navbar-expand navbar-light ">
						<div className="container-fluid">
							<a
								href="#disabled"
								className="burger-btn d-block"
								onClick={() => setIsSidebar(!isSidebar)}
							>
								<i className="bi bi-justify fs-3"></i>
							</a>

							<button
								className="navbar-toggler"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#navbarSupportedContent"
								aria-controls="navbarSupportedContent"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								<span className="navbar-toggler-icon"></span>
							</button>
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
									<li className="nav-item dropdown me-1">
										<a
											className="nav-link active dropdown-toggle"
											data-bs-toggle="dropdown"
											aria-expanded="false"
											href="#disabled"
										>
											<i className="bi bi-envelope bi-sub fs-4 text-gray-600"></i>
										</a>
										<ul
											className="dropdown-menu dropdown-menu-end"
											aria-labelledby="dropdownMenuButton"
										>
											<li>
												<h6 className="dropdown-header">Mail</h6>
											</li>
											<li>
												<a className="dropdown-item" href="#disabled">
													No new mail
												</a>
											</li>
										</ul>
									</li>
									<li className="nav-item dropdown me-3">
										<a
											className="nav-link active dropdown-toggle"
											data-bs-toggle="dropdown"
											aria-expanded="false"
											href="#disabled"
										>
											<i className="bi bi-bell bi-sub fs-4 text-gray-600"></i>
										</a>
										<ul
											className="dropdown-menu dropdown-menu-end"
											aria-labelledby="dropdownMenuButton"
										>
											<li>
												<h6 className="dropdown-header">Notifications</h6>
											</li>
											<li>
												<a className="dropdown-item" href="#disabled">
													No notification available
												</a>
											</li>
										</ul>
									</li>
								</ul>
								<div className="dropdown">
									<a data-bs-toggle="dropdown" aria-expanded="false" href="#disabled">
										<div className="user-menu d-flex">
											<div className="user-name text-end me-3">
												<h6 className="mb-0 text-gray-600">John Doe</h6>
												<p className="mb-0 text-sm text-gray-600">Administrator</p>
											</div>
											<div className="user-img d-flex align-items-center">
												<div className="avatar avatar-md">
													<img src="https://picsum.photos/id/1005/500/500" alt="avatar" />
												</div>
											</div>
										</div>
									</a>
									<ul
										className="dropdown-menu dropdown-menu-end"
										aria-labelledby="dropdownMenuButton"
									>
										<li>
											<h6 className="dropdown-header">Hello, John!</h6>
										</li>
										<li>
											<a className="dropdown-item" href="#disabled">
												<i className="icon-mid bi bi-person me-2"></i> My Profile
											</a>
										</li>
										<li>
											<button className="dropdown-item">
												<i className="icon-mid bi bi-gear me-2"></i> Settings
											</button>
										</li>
										<li>
											<a className="dropdown-item" href="#disabled">
												<i className="icon-mid bi bi-wallet me-2"></i> Wallet
											</a>
										</li>
										<li>
											<hr className="dropdown-divider" />
										</li>
										<li>
											<a className="dropdown-item" href="#disabled">
												<i className="icon-mid bi bi-box-arrow-left me-2"></i> Logout
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</nav>
				</header>

				<div class="page-heading">
					<div class="page-title">
						<div class="row">
							<div class="col-12 col-md-6 order-md-1 order-last">
								<h3>Entity Table</h3>
								<p class="text-subtitle text-muted">Show your data here</p>
							</div>
						</div>
					</div>
					<section class="section">
						<div class="card">
							<div class="card-header">Entity List</div>
							<div class="card-body">
								<table class="table table-striped" id="table1">
									<thead>
										<tr>
											<th>Name</th>
											<th>Email</th>
											<th>Phone</th>
											<th>City</th>
											<th>Status</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Dummy</td>
											<td>dummy@dummies.com</td>
											<td>076 4820 8838</td>
											<td>Jakarta</td>
											<td>
												<span class="badge bg-success">Active</span>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}

export default App;
