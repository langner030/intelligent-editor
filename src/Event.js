import React, { Component, Text, Button } from "react";
import Track from "./Track";
import Draggable from "react-draggable"; // The default

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
  FaCommentAlt,
  FaNintendoSwitch
} from "react-icons/fa";

class Event extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      isEditable: true
    });
  }

  toggleEdit() {
    //console.log("toggle edit " + this.state.isEditable);

    this.setState({
      isEditable: !this.state.isEditable
    });
  }

  onChangeText(event) {
    // for a regular input field, read field name and value from the event
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    //console.log("Event " + fieldName + " " + fieldValue);

    this.props.onChangeText(fieldName, fieldValue);

    //this.forceUpdate();
  }

  onChangeWait(event) {
    // for a regular input field, read field name and value from the event
    const fieldId = event.target.name;
    const fieldValue = event.target.value;
    //console.log("Event " + fieldName + " " + fieldValue);

    this.props.onChangeWait(fieldId, fieldValue);

    //this.forceUpdate();
  }

  onChangeId(event) {
    // for a regular input field, read field name and value from the event
    const fieldId = event.target.id;
    const fieldValue = event.target.value;
    //console.log("Event " + fieldId + " -> " + fieldValue);

    this.props.onChangeId(fieldId, fieldValue);

    //this.forceUpdate();
  }

  onChangeNext(event) {
    // for a regular input field, read field name and value from the event
    const fieldId = event.target.id;
    const fieldValue = event.target.value;
    //console.log("Event " + fieldId + " -> " + fieldValue);

    this.props.onChangeNext(fieldId, fieldValue);

    //this.forceUpdate();
  }

  createNewFollowingEvent(event) {
    let newEvent = this.getNewEvent(0);

    // save current nextid of this event
    let previousNextId = this.props.nextid;
    //console.log("previousNextId " + previousNextId);

    // change nextid of current event to newly generated event.id
    this.props.onChangeNext(this.props.id, newEvent.id);

    // change nextid of generated event to old next id
    newEvent.nextid = previousNextId;
    newEvent.wait = 500;

    //console.log(newEvent);
    this.props.pushNewEvent(newEvent);
  }

  switchEventType(event) {
    const fieldName = event.target.name;

    const fieldValue = event.target.value;
    //console.log("Event " + fieldName + " " + fieldValue);

    if (this.props.type === "plot") {
      this.props.switchEventType(this.props.id, "receive");
    } else {
      this.props.switchEventType(this.props.id, "plot");
    }
  }

  createNewFollowingChoose(event) {
    let newEvent = this.getNewChoose();

    // save current nextid of this event
    //let previousNextId = this.props.nextid;
    //console.log("previousNextId " + previousNextId);

    // change nextid of current event to newly generated event.id
    this.props.onChangeNext(this.props.id, newEvent.id);

    // change nextid of generated event to old next id
    //newEvent.nextid = previousNextId;

    console.log("createNewFollowingChoose");
    console.log(newEvent);
    this.props.pushNewEvent(newEvent);
  }

  createNewOptionToChoose(event) {
    this.props.addOptionToChoose(this.props.id);
  }

  // generate Event
  getNewEvent(seed) {
    console.log("getNewEvent");
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime + seed);
    return {
      id: timestamp,
      type: "receive",
      nextid: null,
      text: " text ",
      contactid: 1
    };
  }

  // generate Choose-Event
  getNewChoose() {
    console.log("getNewChoose 1");
    console.log("getNewChoose 2");
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime);
    let newChoose = {
      id: timestamp,
      type: "choose",
      options: [{ id: this.getNewEvent(1).id, text: "dummy", nextid: -100 }]
    };
    return newChoose;
  }

  handleDrag() {
    console.log("dragiing");
  }
  render() {
    if (this.props.mode !== undefined) {
      return (
        <Draggable
          axis="both"
          handle=".handle"
          defaultPosition={{ x: 0, y: 0 }}
          position={null}
          grid={[5, 5]}
          scale={1}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}
        >
          <div className="handle" style={canvasReceive}>
            <FaPencilAlt />
            <div>{this.props.text}</div>
          </div>
        </Draggable>
      );
    } else {
      if (this.props.type === "receive" && this.state.isEditable) {
        return (
          <div style={eventStyle}>
            <img src={this.props.contact.img_url} width="20" />
            <select
              onChange={e => {
                this.props.editEventContact(this.props.id, e.target.value);
              }}
              value={this.props.contact.id}
            >
              {this.props.contacts.map((c, index) => (
                <option value={c.id}>{c.name}</option>
              ))}
            </select>
            <br />
            <textarea
              name={this.props.id}
              value={this.props.text}
              style={textareaStyle}
              onChange={this.onChangeText.bind(this)}
            />
            <button onClick={this.createNewFollowingEvent.bind(this)}>
              <FaCommentAlt />
            </button>
            <button
              name={this.props.id}
              onClick={this.switchEventType.bind(this)}
            >
              <FaNintendoSwitch /> Receive
            </button>
            <input
              type="text"
              style={waitStyle}
              name={this.props.id}
              value={this.props.wait}
              onChange={this.onChangeWait.bind(this)}
            />
            <div style={{ float: "right" }}>
              <FaTrash onClick={this.toggleEdit.bind(this)} />
            </div>
            {String(this.props.nextid) === "-100" && (
              <button onClick={this.createNewFollowingChoose.bind(this)}>
                <FaSitemap />
              </button>
            )}
          </div>
        );
      } else if (this.props.type === "plot") {
        return (
          <div style={plotStyle}>
            <textarea
              name={this.props.id}
              value={this.props.text}
              style={textareaPlotStyle}
              onChange={this.onChangeText.bind(this)}
            />
            <button onClick={this.createNewFollowingEvent.bind(this)}>
              <FaCommentAlt />
            </button>
            <button
              name={this.props.id}
              onClick={this.switchEventType.bind(this)}
            >
              <FaNintendoSwitch />
              Plot
            </button>
            <input
              type="text"
              style={waitStyle}
              name={this.props.id}
              value={this.props.wait}
              onChange={this.onChangeWait.bind(this)}
            />
          </div>
        );
      }
      if (this.props.type === "choose") {
        return (
          <div style={chooseStyle}>
            <div>
              <FaSitemap />
            </div>
            <small>
              <button
                style={{ float: "right" }}
                onClick={this.props.dropEvent.bind(this)}
                id={this.props.id}
              >
                <FaTrash />
              </button>
              {this.props.id} - {this.props.type}
            </small>
            {this.props.options.map((item, index) => (
              <div style={optionStyle} key={index}>
                <div>
                  <small>
                    Option ID :{item.id}{" "}
                    <textarea
                      name={this.props.id}
                      id={item.id}
                      value={item.text}
                      style={textareaOptionStyle}
                      onChange={this.props.changeOptionText.bind(this)}
                    />
                    <select
                      id={item.id}
                      value={item.nextid}
                      onChange={this.props.changeOptionNext.bind(this)}
                    >
                      {this.props.tracks.map((track, index) => (
                        <option value={track.id}>{track.title} </option>
                      ))}
                    </select>
                    <button>
                      <FaSignInAlt />
                    </button>
                  </small>
                </div>
              </div>
            ))}
            <button onClick={this.createNewOptionToChoose.bind(this)}>
              <FaRegPlusSquare />
            </button>
          </div>
        );
      }
    }
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
const textareaPlotStyle = {
  color: "black",
  backgroundColor: "#e0e0e0",
  width: "100%",
  border: "1px solid #a0a0a0",
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
  width: "100px",
  border: "1px solid #a0e0a0",
  height: "16px"
};

const waitStyle = {
  color: "black",
  backgroundColor: "#e0ffe0",
  width: "32px",
  fontSize: 10,
  border: "1px solid #a0e0a0",
  height: "10px"
};

const plotStyle = {
  color: "black",
  backgroundColor: "#f0f0f0",
  padding: "3px",
  margin: "2px",
  border: "0px solid #808080"
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

const canvasReceive = {
  fontSize: 10,
  backgroundColor: "#e0fff0",
  border: "1px solid #808080",
  borderWidth: "12px 1px 1px 1px",
  width: "80px",
  height: "45px"
};
export default Event;
