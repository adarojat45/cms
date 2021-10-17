import { useEffect, useState } from "react";

const CategoryCreate = ({ onSubmit, onCancel, data }) => {
	const [name, setName] = useState("");

	useEffect(() => {
		if (data) {
			setName(data.name);
		}
	}, [data]);

	const handleCancel = () => {
		onCancel && onCancel();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		onSubmit && onSubmit({ name });
	};

	return (
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
					Save
				</button>
			</div>
		</form>
	);
};

export default CategoryCreate;
