import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const PostForm = ({ onSubmit, onCancel, post, categories }) => {
	const [postInput, setPostInput] = useState({
		name: "",
		excerpt: "",
		description: "",
		isMarkdown: true,
	});

	const [categoryOptions, setCategoryOptions] = useState([]);
	const [tagsOptions] = useState([
		{ value: "inspirasi", label: "inspirasi" },
		{ value: "rekomendasi buku", label: "rekomendasi buku" },
		{ value: "motivasi", label: "motivasi" },
		{ value: "tutorial", label: "tutorial" },
		{ value: "personal", label: "personal" },
	]);
	const [selectedTags, setSelectedTags] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);

	useEffect(() => {
		if (post) {
			// set input
			setPostInput({
				name: post.name,
				description: post.description,
				isMarkdown: post.isMarkdown,
			});
			// setTags
			const newTags = post.tags.map((tag) => {
				return {
					value: tag,
					label: tag,
				};
			});
			setSelectedTags(newTags);
			// set category
			const newCategories = post.categories.map((category) => {
				return {
					value: category.id,
					label: category.name,
				};
			});
			setSelectedCategories(newCategories);
		}
	}, [post]);

	useEffect(() => {
		if (categories) {
			const newCategories = categories?.map((item) => {
				return {
					value: item.id,
					label: item.name,
				};
			});
			setCategoryOptions(newCategories);
		}
	}, [categories]);

	const onChange = (e) => {
		const { name, value } = e.target;
		setPostInput({ ...postInput, [name]: value });
	};

	const onDescriptionChange = (value) => {
		setPostInput({ ...postInput, description: value });
	};

	const handleCancel = () => {
		onCancel && onCancel();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (onSubmit) {
			const payload = {
				...postInput,
				categories: selectedCategories,
				tags: selectedTags.map((tag) => tag.label),
			};
			onSubmit(payload);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="mb-3">
				<label for="exampleFormControlInput1" className="form-label">
					Title
				</label>
				<input
					type="text"
					className="form-control"
					placeholder="Title"
					value={postInput.name}
					onChange={onChange}
					name="name"
				/>
			</div>
			<div class="mb-3">
				<label for="Excerpt" class="form-label">
					Excerpt
				</label>
				<textarea
					class="form-control"
					rows="3"
					placeholder="Excerpt"
					value={postInput.excerpt}
					onChange={onChange}
					name="excerpt"
				/>
			</div>
			<div class="mb-3">
				<label for="Description" class="form-label">
					Description
				</label>
				<MDEditor
					value={postInput.description}
					onChange={onDescriptionChange}
					height={500}
				/>
			</div>
			<div class="mb-3 row">
				<div class="col-6">
					<label for="Category" class="form-label">
						Category
					</label>
					<Select
						options={categoryOptions}
						value={selectedCategories}
						isMulti
						onChange={(newValue) => setSelectedCategories(newValue)}
					/>
				</div>
				<div class="col-6">
					<label for="Tags" class="form-label">
						Tags
					</label>
					<CreatableSelect
						value={selectedTags}
						options={tagsOptions}
						isMulti
						onChange={(newValue) => setSelectedTags(newValue)}
					/>
				</div>
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

export default PostForm;
