import React, { Component } from "react";
import ScreenForm from "./ScreenForm";
import { BASE_URL, config, userID } from "./helpers.js";
import axios from "axios";
import getYouTubeID from "get-youtube-id";
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
    this.addVideo = this.addVideo.bind(this);
    this.addDone = this.addDone.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  addVideo(url) {
    let youtubeID = getYouTubeID(url);
    return axios
      .post(
        `${BASE_URL}/api/videos`,
        {
          url,
          youtube_id: youtubeID,
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

  addDone(url) {
    if (url) {
      this.addVideo(url).then(
        function(response) {
          this.props.history.push("/dashboard");
        }.bind(this)
      );
    }
    this.props.history.push("/dashboard");
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
          this.setState({ screenData: response.data });
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
        <h3 className="">Add Videos and Questions</h3>
        <SortableList
          screenData={this.state.screenData}
          onSortEnd={this.onSortEnd}
        />
        <ScreenForm
          addQuestion={this.addQuestion}
          addVideo={this.addVideo}
          addDone={this.addDone}
          addFile={this.addFile}
        />
      </div>
    );
  }
}

ScreenWrapper.propTypes = {
  playlistID: PropTypes.number.isRequired,
  editPlaylist: PropTypes.bool.isRequired
};

export default withRouter(ScreenWrapper);
