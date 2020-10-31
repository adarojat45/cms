import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import ReactHowler from "react-howler";
import DataTable from "react-data-table-component";
import { updateOrder } from "../../../../store/actions/orderAction";

const columns = [
  {
    name: "No",
    selector: "no",
    sortable: true,
    center: true,
  },
  {
    name: "Title",
    selector: "title",
    sortable: true,
    left: true,
  },
  {
    name: "Artist",
    selector: "artist",
    sortable: true,
    center: true,
  },
  {
    name: "Active",
    selector: "isActive",
    sortable: true,
    center: true,
  },
  {
    name: "Toggle Play",
    selector: "isPlay",
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
  const [song, setSong] = useState({ url: "test.mp3" });
  const [index, setIndex] = useState(null);
  const [songs, setSongs] = useState([]);
  const dispatch = useDispatch();

  const toggleActive = useCallback(
    (i, songEdit) => {
      const newSong = { ...songEdit, isActive: !songEdit.isActive };
      const newOrder = {
        ...order,
        detail: {
          ...order.detail,
          songs: [
            ...order.detail.songs.slice(0, i),
            {
              ...order.detail.songs[i],
              ...newSong,
            },
            ...order.detail.songs.slice(i + 1),
          ],
        },
      };
      dispatch(updateOrder(order.id, newOrder));
    },
    [dispatch, order]
  );

  const onDelete = useCallback(
    async (index) => {
      const newSongs = songs.filter((song, i) => i !== index);
      const newOrder = {
        ...order,
        detail: { ...order.detail, songs: newSongs },
      };
      dispatch(updateOrder(order.id, newOrder));
    },
    [songs, dispatch, order]
  );

  const onPlay = useCallback(
    (i, newSong) => {
      if (i === index) {
        setIndex(!index);
        setSong({ url: "test.mp3" });
      } else {
        setIndex(i);
        setSong(newSong);
      }
    },
    [index]
  );

  const renderTable = useCallback(() => {
    const newRow =
      songs &&
      songs.map((feature, i) => {
        var data = {};
        data.no = i + 1;
        data.title = feature.title;
        data.artist = feature.artist;
        data.url = feature.url;
        data.path = feature.path;
        data.thumbnailUrl = feature.thumbnailUrl;
        data.isActive = (
          <label className="custom-toggle">
            <input
              defaultChecked={feature.isActive}
              value={feature.isActive}
              type="checkbox"
              onChange={() => toggleActive(i, feature)}
            />
            <span className="custom-toggle-slider rounded-circle" />
          </label>
        );
        data.isPlay = (
          <div
            className="btn btn-sm bg-primary text-white rounded-circle shadow"
            onClick={() => onPlay(i, feature)}
          >
            {i === index ? (
              <i className="fas fa-pause" />
            ) : (
              <i className="fas fa-play" />
            )}
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
                <DropdownItem onClick={() => onDelete(i)}>Delete</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </>
        );
        return data;
      });
    setDataTable(newRow);
  }, [onDelete, songs, toggleActive, onPlay, index]);

  useEffect(() => {
    if (order) {
      setSongs(order.detail.songs);
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
      <ReactHowler src={song.url} playing={true} />
    </>
  );
};
