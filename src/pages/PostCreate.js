import { PostForm } from "../components";
import { myServer } from "../apis";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import toastHelper from "../helpers/toastHelper";
import { useHistory } from "react-router-dom";

const PostCreate = () => {
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
			toast.error(error?.response?.data);
		}
	};

	const handleCancel = () => {
		history.push("/post");
	};

	const handleSubmit = async (data) => {
		try {
			await toast.promise(
				myServer({
					url: "/posts",
					method: "POST",
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
			<div class="page-heading">
				<div class="page-title">
					<div class="row">
						<div class="col-12 col-md-6 order-md-1 order-last">
							<h3>PostCreate</h3>
							<p class="text-subtitle text-muted">Show your data here</p>
						</div>
					</div>
				</div>
				<section class="section">
					<div class="card">
						<div class="card-header">PostCreate</div>
						<div class="card-body">
							<PostForm
								categories={categories}
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

export default PostCreate;
