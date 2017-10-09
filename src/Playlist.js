import React, { Component } from "react";

class Playlist extends Component {
  render() {
    const { id, name, videos } = this.props;
    let videoList = videos.map((v, i) => (
      <tr key={`Playlist:${id}_Screen${v.id}_index:${i}`} className="Videos">
        <td colSpan="2">{v.title}</td>
      </tr>
    ));
    return (
      <tbody className="Playlist">
        <tr>
          <td>{name}</td>
          <td>
            <form>
              <input type="email" />
              <button type="submit">Send</button>
            </form>
          </td>
        </tr>
        {videoList}
      </tbody>
    );
  }
}
export default Playlist;
