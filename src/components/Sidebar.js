const Sidebar = ({ isActive, onClick }) => {
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
							<a href="table.html" className="sidebar-link">
								<i className="bi bi-grid-fill"></i>
								<span>Entity 1</span>
							</a>
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
