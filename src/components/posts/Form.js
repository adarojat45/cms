import React, { useState, useEffect } from "react";
import {
  FormGroup,
  Form,
  Input,
  InputGroup,
  Button,
  Row,
  Col,
} from "reactstrap";
import Alert from "../utilities/Alert";
// import MDEditor from "@uiw/react-md-editor";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { getCategories } from "../../store/actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import MDEditor from '@uiw/react-md-editor';

export default ({ post, onSubmit, isClear }) => {
  const [postInput, setPostInput] = useState({
    name: "",
    description: "",
    isMarkdown: true
  });
  const [isAlert, setIsAlert] = useState(false);
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
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryReducer);

  useEffect(() => {
    dispatch(getCategories());
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
  }, [post, dispatch]);

  useEffect(() => {
    const newCategories = categories.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    setCategoryOptions(newCategories);
  }, [categories]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setPostInput({ ...postInput, [name]: value });
  };

  const onDescriptionChange = (value) => {
    setPostInput({ ...postInput, description: value });
  };

  const handleIsClear = () => {
    setPostInput({
      name: "",
      description: "",
    });
    setSelectedCategories([]);
    setSelectedTags([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      postInput.name === "" ||
      postInput.description === "" ||
      selectedCategories.length < 1 ||
      selectedTags.length < 1
    ) {
      return setIsAlert(true);
    }
    const newTags = selectedTags.map((tag) => tag.value);
    const newCategories = selectedCategories.map((category) => {
      return {
        id: category.value,
        name: category.label,
      };
    });
    onSubmit({ ...postInput, tags: newTags, categories: newCategories});
    if (isClear) {
      handleIsClear();
    }
  };

  return (
    <>
      <Alert
        isShow={isAlert}
        onHide={() => setIsAlert(false)}
        message="Name, description, category and tags are require"
      />
      <Form role="form" onSubmit={handleSubmit}>
        <FormGroup className="mb-3">
          <label className="form-control-label" htmlFor="input-address">
            Name
          </label>
          <InputGroup className="input-group-alternative">
            <Input
              placeholder="Name"
              type="text"
              name="name"
              value={postInput.name}
              onChange={onChange}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <label className="form-control-label" htmlFor="input-address">
            Description
          </label>
        <MDEditor
          value={postInput.description}
          onChange={onDescriptionChange}
          height={500}
        />
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs="6">
              <label className="form-control-label" htmlFor="input-address">
                Category
              </label>
              <Select
                options={categoryOptions}
                value={selectedCategories}
                isMulti
                onChange={(newValue) => setSelectedCategories(newValue)}
              />
            </Col>
            <Col xs="6">
              <label className="form-control-label" htmlFor="input-address">
                Tags
              </label>
              <CreatableSelect
                value={selectedTags}
                options={tagsOptions}
                isMulti
                onChange={(newValue) => setSelectedTags(newValue)}
              />
            </Col>
          </Row>
        </FormGroup>
        <div className="text-right">
          <Button type="submit" className="mt-1" color="primary">
            <span className="btn-inner--icon">
              <i className="ni ni-check-bold" />
            </span>
            Save
          </Button>
        </div>
      </Form>
    </>
  );
};
