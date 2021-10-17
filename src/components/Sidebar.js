import { useHistory } from "react-router-dom";

const Sidebar = ({ isActive, onClick }) => {
	const history = useHistory();

	const handleChangePage = (newPage) => {
		history.push(newPage);
	};

	return (
		<div id="sidebar" className={isActive ? "active" : "inactive"}>
			<div className="sidebar-wrapper active">
				<div className="sidebar-header">
					<div className="d-flex justify-content-between">
						<div className="logo">
							<a href="#disabled">
								<h2>CMS</h2>
							</a>
						</div>
						<div className="toggler">
							<a
								href="#disabled"
								className="sidebar-hide d-xl-none d-block"
								onClick={onClick}
							>
								<i className="bi bi-x bi-middle"></i>
							</a>
						</div>
					</div>
				</div>
				<div className="sidebar-menu">
					<ul className="menu">
						<li className="sidebar-title">Menu</li>
						<li className="sidebar-item active ">
							<button
								type="button"
								class="btn btn-primary sidebar-link btn-block"
								onClick={() => handleChangePage("/")}
							>
								<i className="bi bi-grid-fill"></i>
								<span>Dashboard</span>
							</button>
						</li>
						<li className="sidebar-item active ">
							<button
								type="button"
								class="btn btn-primary sidebar-link btn-block"
								onClick={() => handleChangePage("/category")}
							>
								<i className="bi bi-grid-fill"></i>
								<span>Category</span>
							</button>
						</li>
						<li className="sidebar-item active ">
							<button
								type="button"
								class="btn btn-primary sidebar-link btn-block"
								onClick={() => handleChangePage("/post")}
							>
								<i className="bi bi-grid-fill"></i>
								<span>Post</span>
							</button>
						</li>
					</ul>
				</div>
				<button className="sidebar-toggler btn x">
					<i data-feather="x"></i>
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
