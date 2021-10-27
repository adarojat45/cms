import { useEffect, useState } from "react";
import { myServer } from "../apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastHelper from "../helpers/toastHelper";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
	customClass: {
		confirmButton: "btn btn-primary mx-2",
		cancelButton: "btn btn-danger",
	},
	buttonsStyling: false,
});

const PostList = () => {
	const history = useHistory();

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
			toast.error(error?.response?.data);
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
			toast.error(error?.response?.data);
		}
	};

	const handleCreate = () => {
		history.push("/post/create");
	};

	const handleEdit = (id) => {
		history.push("/post/" + id);
	};

	const deleteConfirm = (id) => {
		swalWithBootstrapButtons
			.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Yes, delete it!",
				cancelButtonText: "No, cancel!",
				reverseButtons: true,
			})
			.then((result) => {
				if (result.isConfirmed) {
					handleDelete(id);
				}
			});
	};

	const handleDelete = async (id) => {
		try {
			await toast.promise(
				myServer({
					url: "/posts/" + id,
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
			const newPosts = posts.filter((el) => el.id !== id);
			setPosts(newPosts);
		} catch (error) {
			toast.error(error?.response?.data);
		}
	};

	return (
		<>
			<div className="page-heading">
				<div className="page-title">
					<div className="row">
						<div className="col-12 col-md-6 order-md-1 order-last">
							<h3>Post Table</h3>
							<p className="text-subtitle text-muted">Show your data here</p>
						</div>
					</div>
				</div>
				<section className="section">
					<div className="card">
						<div className="card-header">Post List</div>
						<div className="card-body">
							<button
								type="button"
								className="btn btn-primary mb-3"
								onClick={handleCreate}
							>
								<i className="bi bi-plus-circle-fill"></i>
								<span> Create</span>
							</button>
							<table className="table table-striped" id="table1">
								<thead>
									<tr>
										<th className="text-center">No</th>
										<th className="text-center">Title</th>
										<th className="text-center">Category</th>
										<th className="text-center">View</th>
										<th className="text-center">Status</th>
										<th className="text-center">Action</th>
									</tr>
								</thead>
								<tbody>
									{posts.map((post, index) => {
										return (
											<tr key={post.id}>
												<td className="text-center">{index + 1}</td>
												<td>{post.name}</td>
												<td className="text-center">
													{post.categories.map((el) => (
														<span className="badge bg-primary me-1" key={el.id}>
															{el.name}
														</span>
													))}
												</td>
												<td className="text-center">{post.views || 0}</td>
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
															<a
																href="#disabled"
																onClick={() => {
																	handleEdit(post.id);
																}}
															>
																<i className="icon-mid bi bi-pencil-square me-2"></i>
															</a>
															<a
																href="#disabled"
																className="danger"
																onClick={() => {
																	deleteConfirm(post.id);
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
