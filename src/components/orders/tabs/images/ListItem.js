import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { ImageForm } from "../../index";
import { updateOrder } from "../../../../store/actions/orderAction";

const columns = [
  {
    name: "No",
    selector: "no",
    sortable: true,
    center: true,
  },
  {
    name: "Image",
    selector: "images",
    sortable: false,
    center: true,
  },
  {
    name: "Caption",
    selector: "caption",
    sortable: true,
    left: true,
  },
  {
    name: "Cover",
    selector: "isCover",
    sortable: true,
    center: true,
  },
  {
    name: "Gallery",
    selector: "isGallery",
    sortable: true,
    center: true,
  },
  {
    name: "",
    selector: "action",
    sortable: true,
    center: true,
    allowOverflow: true,
    button: true,
  },
];

export default () => {
  const { order } = useSelector((state) => state.orderReducer);
  const [dataTable, setDataTable] = useState([]);
  const [image, setImage] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [index, setIndex] = useState(null);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const onEdit = useCallback(
    (i, editQuote) => {
      setImage(editQuote);
      setIsModal(!isModal);
      setIndex(i);
    },
    [isModal]
  );

  const toggleModalForm = useCallback(() => {
    setIsModal(!isModal);
  }, [isModal]);

  const toggleCover = useCallback(
    (i, imageEdit) => {
      const newImage = { ...imageEdit, isCover: !imageEdit.isCover };
      const newOrder = {
        ...order,
        detail: {
          ...order.detail,
          images: [
            ...order.detail.images.slice(0, i),
            {
              ...order.detail.images[i],
              ...newImage,
            },
            ...order.detail.images.slice(i + 1),
          ],
        },
      };
      dispatch(updateOrder(order.id, newOrder));
    },
    [dispatch, order]
  );

  const toggleGallery = useCallback(
    (i, imageEdit) => {
      const newImage = { ...imageEdit, isGallery: !imageEdit.isGallery };
      const newOrder = {
        ...order,
        detail: {
          ...order.detail,
          images: [
            ...order.detail.images.slice(0, i),
            {
              ...order.detail.images[i],
              ...newImage,
            },
            ...order.detail.images.slice(i + 1),
          ],
        },
      };
      dispatch(updateOrder(order.id, newOrder));
    },
    [dispatch, order]
  );

  const onSubmit = useCallback(
    (newImage) => {
      const newOrder = {
        ...order,
        detail: {
          ...order.detail,
          images: [
            ...order.detail.images.slice(0, index),
            {
              ...order.detail.images[index],
              ...newImage,
            },
            ...order.detail.images.slice(index + 1),
          ],
        },
      };
      dispatch(updateOrder(order.id, newOrder));
      toggleModalForm();
    },
    [dispatch, order, toggleModalForm, index]
  );

  const onDelete = useCallback(
    async (index) => {
      const newImages = images.filter((couple, i) => i !== index);
      const newOrder = {
        ...order,
        detail: { ...order.detail, images: newImages },
      };
      dispatch(updateOrder(order.id, newOrder));
    },
    [images, dispatch, order]
  );

  const renderTable = useCallback(() => {
    const newRow =
      images &&
      images.map((feature, i) => {
        var data = {};
        data.no = i + 1;
        data.caption = feature.caption;
        data.images = (
          <div className="avatar-group">
            <React.Fragment key={i}>
              <a
                className="avatar avatar-sm"
                href="#pablo"
                id={`tooltip742438047${feature.id}`}
                onClick={(e) => e.preventDefault()}
              >
                <img
                  alt="..."
                  className="rounded-circle"
                  src={feature.thumbnailUrl}
                />
              </a>
            </React.Fragment>
          </div>
        );
        data.isCover = (
          <label className="custom-toggle">
            <input
              defaultChecked={feature.isCover}
              value={feature.isCover}
              type="checkbox"
              onChange={() => toggleCover(i, feature)}
            />
            <span className="custom-toggle-slider rounded-circle" />
          </label>
        );
        data.isGallery = (
          <label className="custom-toggle">
            <input
              defaultChecked={feature.isGallery}
              value={feature.isGallery}
              type="checkbox"
              onChange={() => toggleGallery(i, feature)}
            />
            <span className="custom-toggle-slider rounded-circle" />
          </label>
        );
        data.action = (
          <>
            <UncontrolledDropdown>
              <DropdownToggle
                className="btn-icon-only text-light"
                href="#"
                role="button"
                size="sm"
                color=""
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-ellipsis-v" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem onClick={() => onEdit(i, feature)}>
                  Edit
                </DropdownItem>
                <DropdownItem onClick={() => onDelete(i)}>Delete</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </>
        );
        return data;
      });
    setDataTable(newRow);
  }, [onDelete, onEdit, images, toggleGallery, toggleCover]);

  useEffect(() => {
    if (order) {
      setImages(order.detail.images);
      renderTable();
    }
  }, [renderTable, order]);

  return (
    <>
      <DataTable
        noHeader
        columns={columns}
        data={dataTable}
        defaultSortField="no"
        striped={true}
        dense={true}
        pagination
      />
      {isModal && (
        <ImageForm
          toggle={toggleModalForm}
          isOpen={isModal}
          image={image}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};
