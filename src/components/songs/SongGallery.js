import React, { useEffect, useState } from "react";
import { Button, Modal, Card, CardBody, Row, Col, CardTitle } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getSongs, addSong } from "../../store/actions/songAction";
import ReactHowler from "react-howler";
import { SongForm } from "./index";

export default (props) => {
  const { songs } = useSelector((state) => state.songReducer);
  const dispatch = useDispatch();
  const [song, setSong] = useState({ id: "", url: "test.mp3" });
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);

  const onPlay = (newSong) => {
    if (newSong.id !== song.id) {
      setSong(newSong);
    } else {
      setSong({ id: "", url: "test.mp3" });
    }
  };

  const onAdd = () => {
    setIsModal(!isModal);
  };

  const onSubmit = (newSong) => {
    dispatch(addSong(newSong));
    setIsModal(false);
  };

  return (
    <div>
      <Modal
        style={{ maxWidth: "90%" }}
        className="modal-dialog-centered"
        isOpen={props.isOpen}
        toggle={() => props.toggle()}
      >
        <div className="modal-header">
          <h3 className="modal-title" id="exampleModalLabel">
            Song Gallery
          </h3>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => props.toggle()}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <div
            className="card-group"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Row>
              {songs &&
                songs.map((songItem, i) => {
                  return (
                    <Col
                      onDoubleClick={() => props.onSelect(songItem)}
                      style={{ marginBottom: "5px" }}
                      key={i}
                    >
                      <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody
                          className={
                            props.selectedSongs &&
                            props.selectedSongs.some(
                              (selectedSong) =>
                                selectedSong.url === songItem.url
                            )
                              ? "selected"
                              : ""
                          }
                        >
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h6"
                                className="text-uppercase text-muted mb-0"
                              >
                                {songItem.title}
                              </CardTitle>
                              <span className="h5 font-weight-bold mb-0">
                                {songItem.artist}
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div
                                className="icon icon-shape bg-primary text-white rounded-circle shadow"
                                onClick={() => onPlay(songItem)}
                              >
                                {song.id === songItem.id ? (
                                  <i className="fas fa-pause" />
                                ) : (
                                  <i className="fas fa-play" />
                                )}
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          </div>
        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => props.toggle()}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-times-circle" />
            </span>
            <span className="btn-inner--text"> Close</span>
          </Button>
          <Button color="primary" onClick={onAdd}>
            <span className="btn-inner--icon">
              <i className="fas fa-plus-circle" />
            </span>
            <span className="btn-inner--text">Add Song</span>
          </Button>
        </div>
      </Modal>
      <ReactHowler src={song.url} playing={true} />
      <SongForm
        isOpen={isModal}
        onSubmit={onSubmit}
        toggle={() => setIsModal(!isModal)}
      />
    </div>
  );
};
