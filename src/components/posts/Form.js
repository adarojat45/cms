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
import { Editor } from "@tinymce/tinymce-react";

export default ({ post, onSubmit, isClear }) => {
  const [postInput, setPostInput] = useState({
    name: "",
    description: "",
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
    onSubmit({ ...postInput, tags: newTags, categories: newCategories });
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
          {/* <MDEditor
            value={postInput.description}
            onChange={onDescriptionChange}
            height={300}
          /> */}
          <Editor
            apiKey={process.env.REACT_APP_TINY_API_KEY}
            initialValue={postInput.description}
            value={postInput.description}
            init={{
              selector: "textarea#full-featured-non-premium",
              plugins:
                "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
              imagetools_cors_hosts: ["picsum.photos"],
              menubar: "file edit view insert format tools table help",
              toolbar:
                "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
              toolbar_sticky: true,
              autosave_ask_before_unload: true,
              autosave_interval: "30s",
              autosave_prefix: "{path}{query}-{id}-",
              autosave_restore_when_empty: false,
              autosave_retention: "2m",
              image_advtab: true,
              link_list: [
                { title: "My page 1", value: "https://www.tiny.cloud" },
                { title: "My page 2", value: "http://www.moxiecode.com" },
              ],
              image_list: [
                { title: "My page 1", value: "https://www.tiny.cloud" },
                { title: "My page 2", value: "http://www.moxiecode.com" },
              ],
              image_class_list: [
                { title: "None", value: "" },
                { title: "Some class", value: "class-name" },
              ],
              importcss_append: true,
              file_picker_callback: function (callback, value, meta) {
                /* Provide file and text for the link dialog */
                if (meta.filetype === "file") {
                  callback("https://www.google.com/logos/google.jpg", {
                    text: "My text",
                  });
                }

                /* Provide image and alt text for the image dialog */
                if (meta.filetype === "image") {
                  callback("https://www.google.com/logos/google.jpg", {
                    alt: "My alt text",
                  });
                }

                /* Provide alternative source and posted for the media dialog */
                if (meta.filetype === "media") {
                  callback("movie.mp4", {
                    source2: "alt.ogg",
                    poster: "https://www.google.com/logos/google.jpg",
                  });
                }
              },
              templates: [
                {
                  title: "New Table",
                  description: "creates a new table",
                  content:
                    '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
                },
                {
                  title: "Starting my story",
                  description: "A cure for writers block",
                  content: "Once upon a time...",
                },
                {
                  title: "New list with dates",
                  description: "New List with dates",
                  content:
                    '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
                },
              ],
              template_cdate_format:
                "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
              template_mdate_format:
                "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
              height: 400,
              image_caption: true,
              quickbars_selection_toolbar:
                "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
              noneditable_noneditable_class: "mceNonEditable",
              toolbar_mode: "sliding",
              contextmenu: "link image imagetools table",
              // skin: useDarkMode ? "oxide-dark" : "oxide",
              // content_css: useDarkMode ? "dark" : "default",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onDescriptionChange}
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
