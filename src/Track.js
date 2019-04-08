import React, { Component, Text, Button } from "react";
import Draggable from "react-draggable"; // The default
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

class Track extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      isEditable: true,
      from: "1",
      to: "out-30",
      outClassName: "out-" + this.props.id,
      inClassName: "in-" + this.props.id
    });
    //this.props.geteventlist(1);
  }

  toggleEdit() {
    //console.log("toggle edit " + this.state.isEditable);

    this.setState({
      isEditable: !this.state.isEditable
    });
  }
  handleDrag(e, d) {}

  handleStop(e, d) {
    //    this.props.onChangePosition(d.x, d.y);

    //this.props.changeTrackById(this.props.id);
    this.onChangeTrackById();
    this.props.onChangePosition(this.props.id, d.x, d.y);
  }

  onChangeTrackById(event) {
    this.props.changeTrackById(this.props.id);
  }

  getInClassName() {
    return "in-" + this.props.id;
  }

  getNextInClassName(nextid) {
    return "in-" + nextid;
  }

  render() {
    const style = {
      delay: true,
      borderColor: "#055",
      borderStyle: "solid",
      borderWidth: 3
    };
    return (
      <div>
        <Draggable
          axis="both"
          handle=".handle"
          defaultPosition={{ x: this.props.x, y: this.props.y }}
          position={null}
          grid={[5, 5]}
          scale={1}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop.bind(this)}
        >
          <div>
            <div className="handle" style={canvasTrack}>
              <div className={this.state.inClassName} style={inputPortStyle} />
              <div>
                <br />
                {this.props.title}
                <br />
                {this.getOptionList(this.props.id).length}
                {this.getOptionList(this.props.id).map((item, index) => (
                  <div>
                    <SteppedLineTo
                      from={this.state.outClassName}
                      to={this.getNextInClassName(item.nextid)}
                      orientation="v"
                      zIndex={100}
                      {...style}
                    />
                  </div>
                ))}
              </div>

              <button onClick={this.props.onOpenModal} style={editStyle}>
                <FaPencilAlt />
              </button>

              <div
                className={this.state.outClassName}
                style={outputPortStyle}
              />
            </div>
          </div>
        </Draggable>
      </div>
    );
  }

  getEventList(pid) {
    return this.props.geteventlist(pid);
    //return [{ id: 2, text: "Test" }];
  }

  getChooseList(pid) {
    let chooseList = [];
    this.getEventList(pid).forEach(function(item, index) {
      if (item.type === "choose") {
        chooseList.push(item);
      }
    });
    return chooseList;
  }

  getOptionList(pid) {
    let optionList = [];
    this.getChooseList(pid).forEach(function(item, index) {
      item.options.forEach(function(o, id) {
        optionList.push(o);
      });
    });
    return optionList;
  }
}

const eventStyle = {
  color: "#a0a0a0",
  backgroundColor: "#ffffff",
  padding: "3px",
  margin: "2px",
  border: "0px solid #808080"
};

const textareaStyle = {
  color: "black",
  backgroundColor: "#e0ffe0",
  width: "100%",
  border: "1px solid #a0e0a0",
  height: "28px",
  marginRight: "0%"
};

const textareaOptionStyle = {
  color: "black",
  backgroundColor: "#e0e0ff",
  width: "100%",
  border: "1px solid #a0a0e0",
  height: "28px",
  marginLeft: "0%"
};

const idinputStyle = {
  color: "black",
  backgroundColor: "#e0ffe0",
  width: "120px",
  border: "1px solid #a0e0a0",
  height: "16px"
};

const plotStyle = {
  color: "black",
  backgroundColor: "#f0f0f0",
  padding: "5px",
  margin: "4px",
  border: "1px solid #808080"
};

const chooseStyle = {
  color: "black",
  backgroundColor: "#ffffff",
  padding: "5px 5px 5px 5px",
  margin: "4px",
  border: "1px dotted #808080",
  //display: "flex",
  flexDirection: "column"
};

const optionStyle = {
  color: "black",
  backgroundColor: "#fff",
  padding: "2px",
  margin: "4px 0px 0px 0px",
  border: "0px solid #808080"
};

const canvasTrack = {
  fontSize: 10,
  textAlign: "center",
  backgroundColor: "#ededed",
  border: "1px solid #808080",
  borderWidth: "1px 1px 1px 1px",
  width: "100px",
  padding: "0px"
};

const inputPortStyle = {
  width: "100%",
  height: "2px",
  backgroundColor: "#055",
  float: "left"
};
const outputPortStyle = {
  width: "100%",
  height: "2px",
  backgroundColor: "#055",
  float: "right"
};

const editStyle = {
  textAlign: "center",
  border: "1px solid #055",
  backgroundColor: "#ffefef",
  padding: "4px",
  margin: "-1px"
};
export default Track;
