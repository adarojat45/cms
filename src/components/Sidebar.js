const Sidebar = ({ isActive }) => {
	return (
		<div id="sidebar" class={isActive ? "active" : "inactive"}>
			<div class="sidebar-wrapper active">
				<div class="sidebar-header">
					<div class="d-flex justify-content-between">
						<div class="logo">
							<a href="#disabled">
								<h2>CMS</h2>
							</a>
						</div>
						<div class="toggler">
							<a href="#disabled" class="sidebar-hide d-xl-none d-block">
								<i class="bi bi-x bi-middle"></i>
							</a>
						</div>
					</div>
				</div>
				<div class="sidebar-menu">
					<ul class="menu">
						<li class="sidebar-title">Menu</li>

						<li class="sidebar-item active ">
							<a href="table.html" class="sidebar-link">
								<i class="bi bi-grid-fill"></i>
								<span>Entity 1</span>
							</a>
						</li>
					</ul>
				</div>
				<button class="sidebar-toggler btn x">
					<i data-feather="x"></i>
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
