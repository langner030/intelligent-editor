import React, { Component, Text, Button } from "react";
import Event from "./Event";
import Track from "./Track";
import { SteppedLineTo } from "react-lineto";

import {
  FaChevronRight,
  FaPencilAlt,
  FaTrash,
  FaSignInAlt
} from "react-icons/fa";
import {
  FaFolder,
  FaSitemap,
  FaRegPlusSquare,
  FaCommentAlt
} from "react-icons/fa";

import Draggable from "react-draggable"; // The default

class Canvas extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      isEditable: true
    });
  }
  onTrackChangePosition(trackid, dx, dy) {
    this.props.onTrackChangePosition(trackid, dx, dy);
    //console.log("Cnvas " + trackid + " x:" + dx + " y:" + dy);
  }

  render() {
    const style = {
      delay: true,
      borderColor: "#ddd",
      borderStyle: "solid",
      borderWidth: 3
    };
    return (
      <div>
        <div>Canvas</div>

        {this.props.tracklist.map((item, index) => (
          <Track
            mode="canvas"
            id={item.id}
            title={item.title}
            onChangePosition={this.onTrackChangePosition.bind(this)}
            events={[this.props.eventlist]}
            geteventlist={this.props.geteventlist.bind(this)}
            changeTrackById={this.props.changeTrackById.bind(this)}
            onOpenModal={this.props.onOpenModal.bind(this)}
            x={parseInt(item.x)}
            y={parseInt(item.y)}
          />
        ))}
      </div>
    );
  }
}

class Block extends Component {
  render() {
    const { top, left, color, className } = this.props;
    const style = { top, left, backgroundColor: color };
    return (
      <div
        className={`block ${className}`}
        style={style}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Canvas;
