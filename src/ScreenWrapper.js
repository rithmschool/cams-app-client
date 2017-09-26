import React, { PropTypes, Component } from "react";
import ScreenForm from "./ScreenForm";
import { BASE_URL, config, userID } from "./helpers.js";
import axios from "axios";
import getYouTubeID from "get-youtube-id";
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";

class ScreenWrapper extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      screenData: []
    };
    this.addVideo = this.addVideo.bind(this);
    this.addDone = this.addDone.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.addFile = this.addFile.bind(this);
  }

  addFile(target) {
    //var blob = new Blob([file], { type: "video/mp4" });
    var form_data = new FormData(target);
    debugger;
    return axios
      .post(
        `${BASE_URL}/api/files`,
        {
          data: form_data,
          contentType: false,
          processData: false,
          dataType: "json"
          //playlist_id: this.props.playlistID,
          //order: this.state.screenData.length + 1
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
            title: question,
            playlist_id: this.props.playlistID,
            order: this.state.screenData.length + 1
          },
          config()
        )
        .then(response => {
          this.setState({
            screenData: this.state.screenData.concat([
              {
                title: question,
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
          this.context.router.history.push("/dashboard");
        }.bind(this)
      );
    }
    this.context.router.history.push("/dashboard");
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      screenData: arrayMove(this.state.screenData, oldIndex, newIndex)
    });
  };

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

export default ScreenWrapper;
