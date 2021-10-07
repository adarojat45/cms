const PostList = () => {
	return (
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
	);
};

export default PostList;
