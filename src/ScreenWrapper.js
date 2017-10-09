import React, { Component } from "react";
import ScreenForm from "./ScreenForm";
import { BASE_URL, config, userID } from "./helpers.js";
import axios from "axios";
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class ScreenWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenData: []
    };
    this.addVideoFile = this.addVideoFile.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  addVideoFile(file) {
    return axios
      .post(
        `${BASE_URL}/api/videofiles`,
        {
          title: file,
          playlist_id: this.props.playlistID,
          order: this.state.screenData.length + 1
        },
        config()
      )
      .then(response => {
        this.setState({
          screenData: this.state.screenData.concat([
            {
              title: response.data.title,
              entity_id: response.data.id,
              type: "video"
            }
          ])
        });
      });
  }

  addQuestion(question) {
    if (question) {
      return axios
        .post(
          `${BASE_URL}/api/questions`,
          {
            title: question.title,
            timer: question.timer,
            playlist_id: this.props.playlistID,
            order: this.state.screenData.length + 1
          },
          config()
        )
        .then(response => {
          this.setState({
            screenData: this.state.screenData.concat([
              {
                title: question.title,
                timer: question.timer,
                entity_id: response.data.id,
                type: "question"
              }
            ])
          });
        });
    }
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.setState({
      screenData: arrayMove(this.state.screenData, oldIndex, newIndex)
    });
  }

  componentWillMount() {
    if (this.props.editPlaylist) {
      axios
        .get(
          `${BASE_URL}/api/users/${userID()}/playlists/${this.props
            .playlistID}`,
          config()
        )
        .then(response => {
          this.setState({ screenData: response.data.screens });
        });
    }
  }

  componentDidUpdate() {
    this.state.screenData.forEach((value, index) => {
      axios.patch(
        `${BASE_URL}/api/screens`,
        {
          entity_id: value.entity_id,
          playlist_id: this.props.playlistID,
          order: index + 1,
          type: value.type
        },
        config()
      );
    });
  }

  render() {
    const SortableVideo = SortableElement(({ value, key }) => (
      <li className="grabbable" key={key}>
        {value}
      </li>
    ));

    const SortableList = SortableContainer(({ screenData }) => {
      return (
        <ol>
          {screenData.map((value, index) => (
            <SortableVideo key={index + 1} index={index} value={value.title} />
          ))}
        </ol>
      );
    });

    return (
      <div>
        <div className="sortablelist">
          <h3>{this.props.playlistName}</h3>
          <p>
            <small>Order of items can be changed via drag and drop</small>
          </p>
          <SortableList
            screenData={this.state.screenData}
            onSortEnd={this.onSortEnd}
          />
        </div>
        <ScreenForm
          addQuestion={this.addQuestion}
          addVideo={this.addVideo}
          addVideoFile={this.addVideoFile}
        />
      </div>
    );
  }
}

ScreenWrapper.propTypes = {
  playlistID: PropTypes.number.isRequired,
  playlistName: PropTypes.string.isRequired,
  editPlaylist: PropTypes.bool.isRequired
};

export default withRouter(ScreenWrapper);
