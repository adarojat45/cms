import { useEffect, useState } from "react";
import { myServer } from "../apis";

const PostList = () => {
	useEffect(() => {
		fetchCategories();
	}, []);

	const [categories, setCategories] = useState([]);

	const fetchCategories = async () => {
		try {
			const { data } = await myServer({
				url: "/categories",
				method: "GET",
				headers: {
					token: localStorage.getItem("token"),
				},
			});
			setCategories(data);
		} catch (error) {
			console.log("🚀 ~ file: PostList.js ~ line 11 ~ fetchPost ~ error", error);
		}
	};

	const handleStatusChange = async (id, status) => {
		try {
			const { data } = await myServer({
				url: "/categories/" + id + "/updateStatus",
				method: "PATCH",
				headers: {
					token: localStorage.getItem("token"),
				},
				data: {
					isActive: status,
				},
			});

			const index = categories.findIndex((el) => el.id === id);
			const newPosts = [...categories];
			newPosts[index] = data;
			setCategories(newPosts);
		} catch (error) {
			console.log(
				"🚀 ~ file: PostList.js ~ line 38 ~ handleStatusChange ~ error",
				error
			);
		}
	};
	return (
		<>
			<div class="page-heading">
				<div class="page-title">
					<div class="row">
						<div class="col-12 col-md-6 order-md-1 order-last">
							<h3>Category Table</h3>
							<p class="text-subtitle text-muted">Show your data here</p>
						</div>
					</div>
				</div>
				<section class="section">
					<div class="card">
						<div class="card-header">Category List</div>
						<div class="card-body">
							<table class="table table-striped" id="table1">
								<thead>
									<tr>
										<th className="text-center">No</th>
										<th className="text-center">Name</th>
										<th className="text-center">Status</th>
										<th className="text-center">Action</th>
									</tr>
								</thead>
								<tbody>
									{categories.map((category, index) => {
										return (
											<tr>
												<td className="text-center">{index + 1}</td>
												<td>{category.name}</td>
												<td className="text-center">
													<button
														className={
															category.isActive
																? "btn btn-success btn-sm dropdown-toggle"
																: "btn btn-danger btn-sm dropdown-toggle"
														}
														type="button"
														data-bs-toggle="dropdown"
														aria-expanded="false"
													>
														{category.isActive ? "Active" : "Inactive"}
													</button>
													<ul
														className="dropdown-menu dropdown-menu-end"
														aria-labelledby="dropdownMenuButton"
													>
														<li>
															<a
																className="dropdown-item"
																href="#disabled"
																onClick={() => handleStatusChange(category.id, true)}
															>
																Active
															</a>
														</li>
														<li>
															<a
																className="dropdown-item"
																href="#disabled"
																onClick={() => handleStatusChange(category.id, false)}
															>
																Inactive
															</a>
														</li>
													</ul>
												</td>
												<td className="text-center">
													<a href="#disabled">
														<i className="icon-mid bi bi-eye me-2"></i>
													</a>
													{!category.isActive && (
														<>
															<a href="#disabled">
																<i className="icon-mid bi bi-pencil-square me-2"></i>
															</a>
															<a href="#disabled" className="danger">
																<i className="icon-mid bi bi-trash me-2 text-danger"></i>
															</a>
														</>
													)}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default PostList;
