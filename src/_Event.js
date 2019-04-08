import React, { Component, Text, Button } from "react";
import Track from "./Track";
import { FaChevronRight, FaPencilAlt } from "react-icons/fa";
import { FaFolder, FaRegPlusSquare } from "react-icons/fa";

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
    const fieldId = event.target.id;
    //const fieldValue = event.target.value;
    //console.log("Event " + fieldId + " -> " + fieldValue);

    //this.props.onChangeNext(fieldId, fieldValue);

    // Pseudo Code:
    // create new Event with new ID
    let newEvent = this.getNewEvent();
    console.log(newEvent);

    // save current nextid of this event
    let previousNextId = this.props.nextid;
    console.log("previousNextId " + previousNextId);

    // change nextid of current event to newly generated event.id
    this.props.onChangeNext(this.props.id, newEvent.id);

    // change nextid of generated event to old next id
    newEvent.nextid = previousNextId;
    console.log(newEvent);
    // generate new ID:

    // push new Event to global events
    this.props.pushNewEvent(newEvent);
  }

  // generate Event
  getNewEvent() {
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime / 1000);
    return {
      id: timestamp,
      type: "receive",
      nextid: null,
      text: " text "
    };
  }

  render() {
    if (this.props.type === "receive" && !this.state.isEditable) {
      return (
        <div style={eventStyle}>
          <small>
            <i>
              {this.props.id} - {this.props.type}
            </i>
          </small>
          <br />
          <b>{this.props.text}</b>
          <br />
          <small>
            <i>next: {this.props.nextid}</i>
          </small>
          <div style={{ float: "right" }}>
            <FaPencilAlt onClick={this.toggleEdit.bind(this)} />
          </div>
        </div>
      );
    }
    if (this.props.type === "receive" && this.state.isEditable) {
      return (
        <div style={eventStyle}>
          <small>
            <i>
              <input
                type="text"
                id={this.props.id}
                value={this.props.id}
                onChange={this.onChangeId.bind(this)}
              />{" "}
              -
              <select value={this.props.type}>
                <option selected>plot</option>
                <option selected>receive</option>
                <option selected>choose</option>
              </select>
            </i>
          </small>
          <br />
          <textarea
            name={this.props.id}
            value={this.props.text}
            onChange={this.onChangeText.bind(this)}
          />
          <br />
          <small>
            <i>
              next:{" "}
              <input
                type="text"
                value={this.props.nextid}
                id={this.props.id}
                onChange={this.onChangeNext.bind(this)}
              />
            </i>
          </small>
          <div style={{ float: "right" }}>
            <FaPencilAlt onClick={this.toggleEdit.bind(this)} />
          </div>
          <button onClick={this.createNewFollowingEvent.bind(this)}>
            <FaRegPlusSquare />
          </button>
        </div>
      );
    }
    if (this.props.type === "plot") {
      return (
        <div style={plotStyle}>
          <small>
            <i>
              {this.props.id} - {this.props.type}
            </i>
          </small>
          <center>{this.props.text}</center>
          <small>
            <i>next: {this.props.nextid}</i>
          </small>
        </div>
      );
    }
    if (this.props.type === "choose") {
      return (
        <div style={chooseStyle}>
          <small>
            <i>
              {this.props.id} - {this.props.type}
            </i>
          </small>
          <br />
          {this.props.options.map((item, index) => (
            <div style={optionStyle}>
              <div>
                <b>{item.text}</b>
              </div>
              <Track
                game={this.props.game}
                eventid={item.nextid}
                onChangeText={this.props.onChangeText.bind(this)}
              />
            </div>
          ))}
          <input type="submit" value="+ add option" />
        </div>
      );
    }
  }
}

const eventStyle = {
  color: "black",
  backgroundColor: "#e0ffe0",
  padding: "5px",
  margin: "4px",
  border: "0px solid #808080"
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
  backgroundColor: "#e0e0e0",
  padding: "5px 5px 5px 15px",
  margin: "4px",
  border: "0px solid #808080",
  display: "flex",
  flexDirection: "column"
};

const optionStyle = {
  color: "black",
  backgroundColor: "#e0efff",
  padding: "5px",
  margin: "0px 0px 10px 0px",
  border: "0px solid #808080"
};
export default Event;
