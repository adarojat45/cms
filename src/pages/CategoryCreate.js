import { useState } from "react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastHelper from "../helpers/toastHelper";
import { myServer } from "../apis";

const CategoryCreate = () => {
	const history = useHistory();
	const [name, setName] = useState("");

	const handleCancel = () => {
		history.push("/category");
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			await toast.promise(
				myServer({
					url: "/categories",
					method: "POST",
					headers: {
						token: localStorage.getItem("token"),
					},
					data: { name },
				}),
				{
					pending: toastHelper("Loading...", "info"),
					success: toastHelper("Successfully fetched", "success"),
					error: toastHelper(null, "error"),
				}
			);
			setName("");
		} catch (error) {
			toast.error(error.response.data);
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
							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<label for="exampleFormControlInput1" className="form-label">
										Name
									</label>
									<input
										type="text"
										className="form-control"
										placeholder="Name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div align="right">
									<button
										type="button"
										className="btn btn-danger me-2"
										onClick={handleCancel}
									>
										Cancel
									</button>
									<button type="submit" className="btn btn-primary">
										Create
									</button>
								</div>
							</form>
						</div>
					</div>
				</section>
				<ToastContainer />
			</div>
		</>
	);
};

export default CategoryCreate;
