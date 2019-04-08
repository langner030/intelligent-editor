import React, { Component, Text, Button } from "react";
import Track from "./Track";
import { FaChevronRight, FaPencilAlt } from "react-icons/fa";

class Output extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditable: true
    };
  }

  toggleEdit() {
    console.log("toggle edit " + this.state.isEditable);

    this.setState({
      isEditable: !this.state.isEditable
    });
  }

  onChangeText(event) {
    // for a regular input field, read field name and value from the event
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    console.log("Event " + fieldName + " " + fieldValue);

    this.props.onChangeText(fieldName, fieldValue);
  }

  render() {
    return <textarea value={JSON.stringify(this.props.json)} />;
  }
}

export default Output;
