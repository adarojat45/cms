import { useEffect, useState } from "react";
import { myServer } from "../apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastHelper from "../helpers/toastHelper";
import { useHistory } from "react-router";

const PostList = () => {
	const history = useHistory();

	useEffect(() => {
		fetchCategories();
	}, []);

	const [categories, setCategories] = useState([]);

	const fetchCategories = async () => {
		try {
			const { data } = await toast.promise(
				myServer({
					url: "/categories",
					method: "GET",
					headers: {
						token: localStorage.getItem("token"),
					},
				}),
				{
					pending: toastHelper("Loading...", "info"),
					success: toastHelper("Successfully fetched", "success"),
					error: toastHelper(null, "error"),
				}
			);
			setCategories(data);
		} catch (error) {
			toast.error(error.response.data);
		}
	};

	const handleStatusChange = async (id, status) => {
		try {
			const { data } = await toast.promise(
				myServer({
					url: "/categories/" + id + "/updateStatus",
					method: "PATCH",
					headers: {
						token: localStorage.getItem("token"),
					},
					data: {
						isActive: status,
					},
				}),
				{
					pending: toastHelper("Loading...", "info"),
					success: toastHelper("Successfully updated", "success"),
					error: toastHelper(null, "error"),
				}
			);

			const index = categories.findIndex((el) => el.id === id);
			const newPosts = [...categories];
			newPosts[index] = data;
			setCategories(newPosts);
		} catch (error) {
			toast.error(error.response.data);
		}
	};

	const handleCreate = () => {
		history.push("/category/create");
	};

	const handleDelete = async (id) => {
		try {
			await toast.promise(
				myServer({
					url: "/categories/" + id,
					method: "DELETE",
					headers: {
						token: localStorage.getItem("token"),
					},
				}),
				{
					pending: toastHelper("Loading...", "info"),
					success: toastHelper("Successfully deleted", "success"),
					error: toastHelper(null, "error"),
				}
			);
			const newCategories = categories.filter((el) => el.id !== id);
			setCategories(newCategories);
		} catch (error) {
			toast.error(error.response.data);
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
						<div class="card-header"></div>
						<div class="card-body">
							<button
								type="button"
								class="btn btn-primary mb-3"
								onClick={handleCreate}
							>
								<i className="bi bi-plus-circle-fill"></i>
								<span> Create</span>
							</button>
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
																onClick={() => {
																	handleStatusChange(category.id, true);
																	return false;
																}}
															>
																Active
															</a>
														</li>
														<li>
															<a
																className="dropdown-item"
																href="#disabled"
																onClick={() => {
																	handleStatusChange(category.id, false);
																	return false;
																}}
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
															<a
																href="#disabled"
																className="danger"
																onClick={() => {
																	handleDelete(category.id);
																	return false;
																}}
															>
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
				<ToastContainer />
			</div>
		</>
	);
};

export default PostList;
