import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { StoryForm } from "../../index";
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
    name: "Title",
    selector: "title",
    sortable: true,
    center: true,
  },
  {
    name: "Date",
    selector: "date",
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
  const [story, setStory] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [index, setIndex] = useState(null);
  const [stories, setStories] = useState([]);
  const dispatch = useDispatch();

  const onEdit = useCallback(
    (i, editStory) => {
      setStory(editStory);
      setIsModal(!isModal);
      setIndex(i);
    },
    [isModal]
  );

  const toggleModalForm = useCallback(() => {
    setIsModal(!isModal);
  }, [isModal]);

  const onSubmit = useCallback(
    (newStory) => {
      const newOrder = {
        ...order,
        detail: {
          ...order.detail,
          stories: [
            ...order.detail.stories.slice(0, index),
            {
              ...order.detail.stories[index],
              ...newStory,
            },
            ...order.detail.stories.slice(index + 1),
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
      const newStories = stories.filter((couple, i) => i !== index);
      const newOrder = {
        ...order,
        detail: { ...order.detail, stories: newStories },
      };
      dispatch(updateOrder(order.id, newOrder));
    },
    [stories, dispatch, order]
  );

  const renderTable = useCallback(() => {
    const newRow =
      stories &&
      stories.map((feature, i) => {
        var data = {};
        data.no = i + 1;
        data.title = feature.title;
        data.date = feature.date;
        data.description = feature.description;
        data.images = (
          <div className="avatar-group">
            {feature.images.map((image, i) => {
              return (
                <React.Fragment key={i}>
                  <a
                    className="avatar avatar-sm"
                    href="#pablo"
                    id={`tooltip742438047${image.id}`}
                    onClick={(e) => e.preventDefault()}
                  >
                    <img
                      alt="..."
                      className="rounded-circle"
                      src={image.thumbnailUrl}
                    />
                  </a>
                </React.Fragment>
              );
            })}
          </div>
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
  }, [onDelete, onEdit, stories]);

  useEffect(() => {
    if (order) {
      setStories(order.detail.stories);
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
        <StoryForm
          toggle={toggleModalForm}
          isOpen={isModal}
          story={story}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};
