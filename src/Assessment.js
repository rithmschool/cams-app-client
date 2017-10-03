import React, { Component } from "react";

class Assessment extends Component {
	render() {
		let {
			download_url,
			recording_url,
			handlelUnselect,
			handleSelect,
			handleEvaluated,
			patient_email,
			playlist_name,
			date_added,
			date_assessed,
			date_evaluated
		} = this.props;
		let completed = <h6>Completed: No</h6>;
		let className = "playlist-card";

		if (download_url) {
			completed = (
				<div>
					<div>
						<video
							className="playlist-video"
							src={download_url}
							preload="metadata"
							controls="true"
						/>
					</div>
					<button
						className="button button-hover"
						onClick={handlelUnselect}
					>
						Close
					</button>
					<button
						className="button button-hover"
						type="submit"
						value="Submit"
					>
						<a href={download_url}>Download</a>
					</button>
					<button
						className="button button-hover"
						type="submit"
						value="Submit"
						onClick={handleEvaluated}
					>
						Completed
					</button>
				</div>
			);
			className = "selected";
		} else if (recording_url) {
			completed = (
				<button className="button button-hover" onClick={handleSelect}>
					Get Video
				</button>
			);
		}

		return (
			<div className={`${className} button-hover playlist-card-contents`}>
				<h5 className="playlist-name-title">{patient_email}</h5>
				<h6>{playlist_name}</h6>
				<h6>Added: {date_added}</h6>
				<h6>Assessment: {date_assessed}</h6>
				<h6>Evaluated: {date_evaluated}</h6>
				{completed}
			</div>
		);
	}
}

export default Assessment;
