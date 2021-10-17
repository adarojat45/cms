import { useHistory, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastHelper from "../helpers/toastHelper";
import { myServer } from "../apis";
import { CategoryForm } from "../components";
import { useEffect, useState } from "react";

const CategoryEdit = () => {
	const history = useHistory();
	const { id } = useParams();
	const [post, setPost] = useState(null);

	useEffect(() => {
		fetchPost();
		// eslint-disable-next-line
	}, [id]);

	const fetchPost = async () => {
		try {
			const { data } = await toast.promise(
				myServer({
					url: "/categories/" + id,
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
			setPost(data);
		} catch (error) {
			toast.error(error?.response?.data);
		}
	};

	const handleCancel = () => {
		history.push("/category");
	};

	const handleSubmit = async (data) => {
		try {
			await toast.promise(
				myServer({
					url: "/categories/" + post.id,
					method: "PUT",
					headers: {
						token: localStorage.getItem("token"),
					},
					data: data,
				}),
				{
					pending: toastHelper("Loading...", "info"),
					success: toastHelper("Successfully fetched", "success"),
					error: toastHelper(null, "error"),
				}
			);
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
							<h3>Category Create</h3>
							<p className="text-subtitle text-muted">Add your data here</p>
						</div>
					</div>
				</div>
				<section className="section">
					<div className="card">
						<div className="card-header">Category Create</div>
						<div className="card-body">
							<CategoryForm
								data={post}
								onCancel={handleCancel}
								onSubmit={handleSubmit}
							/>
						</div>
					</div>
				</section>
				<ToastContainer />
			</div>
		</>
	);
};

export default CategoryEdit;
