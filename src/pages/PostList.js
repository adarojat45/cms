import { useEffect, useState } from "react";
import { myServer } from "../apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastHelper from "../helpers/toastHelper";

const PostList = () => {
	useEffect(() => {
		fetchPost();
	}, []);

	const [posts, setPosts] = useState([]);

	const fetchPost = async () => {
		try {
			const { data } = await toast.promise(
				myServer({
					url: "/posts",
					method: "GET",
					headers: {
						token: localStorage.getItem("token"),
					},
				}),
				{
					pending: toastHelper("Loading...", "info"),
					success: toastHelper("Successfully updated", "success"),
					error: toastHelper(null, "error"),
				}
			);
			setPosts(data);
		} catch (error) {
			toast.error(error.response.data);
		}
	};

	const handleStatusChange = async (id, status) => {
		try {
			const { data } = await toast.promise(
				myServer({
					url: "/posts/" + id + "/updateStatus",
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
			const index = posts.findIndex((post) => post.id === id);
			const newPosts = [...posts];
			newPosts[index] = data;
			setPosts(newPosts);
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
							<h3>Post Table</h3>
							<p class="text-subtitle text-muted">Show your data here</p>
						</div>
					</div>
				</div>
				<section class="section">
					<div class="card">
						<div class="card-header">Post List</div>
						<div class="card-body">
							<table class="table table-striped" id="table1">
								<thead>
									<tr>
										<th className="text-center">No</th>
										<th className="text-center">Title</th>
										<th className="text-center">View</th>
										<th className="text-center">Status</th>
										<th className="text-center">Action</th>
									</tr>
								</thead>
								<tbody>
									{posts.map((post, index) => {
										return (
											<tr>
												<td className="text-center">{index + 1}</td>
												<td>{post.name}</td>
												<td className="text-center">{post.view || 0}</td>
												<td className="text-center">
													<button
														className={
															post.isActive
																? "btn btn-success btn-sm dropdown-toggle"
																: "btn btn-danger btn-sm dropdown-toggle"
														}
														type="button"
														data-bs-toggle="dropdown"
														aria-expanded="false"
													>
														{post.isActive ? "Active" : "Inactive"}
													</button>
													<ul
														className="dropdown-menu dropdown-menu-end"
														aria-labelledby="dropdownMenuButton"
													>
														<li>
															<a
																className="dropdown-item"
																href="#disabled"
																onClick={() => handleStatusChange(post.id, true)}
															>
																Active
															</a>
														</li>
														<li>
															<a
																className="dropdown-item"
																href="#disabled"
																onClick={() => handleStatusChange(post.id, false)}
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
													{!post.isActive && (
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
				<ToastContainer />
			</div>
		</>
	);
};

export default PostList;
