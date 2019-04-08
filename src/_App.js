import React, { Component } from "react";
import Event from "./Event";
import Track from "./Track";
import Editor from "./Editor";
import Output from "./Output";

import { Accordion, AccordionItem } from "react-light-accordion";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      editevent: [{ id: 8 }],
      json: "[ empty ]",
      events: [
        {
          id: 1550346865,
          type: "receive",
          text: "A",
          nextid: 55
        },
        {
          id: 66,
          type: "receive",
          text: "C",
          nextid: 1550341999
        },
        {
          id: 55,
          type: "receive",
          text: "B",
          nextid: 80
        },
        {
          id: 25,
          type: "choose",
          options: [
            {
              text: "Ja, gehe in das Hotel",
              nextid: 30
            },
            {
              text: "Nein, lieber nicht",
              nextid: 40
            }
          ]
        }
      ]
    });
  }

  editEventText(pid, pvalue) {
    // copy game:

    let events_tmp = this.state.events;

    events_tmp.forEach(function(et) {
      if (String(et.id) === String(pid)) {
        et.text = pvalue;
      }
    });

    //console.log(events_tmp);
    this.setState({
      events: events_tmp,
      json: JSON.stringify(events_tmp)
    }); /*.then(function () {
      //this.props.didSelect(this.state.selected);
      //console.log(this.state.json);
    });
*/

    setTimeout(() => {
      //console.log(this.state.json);
      //this.forceUpdate();
    }, 10);
  }

  editEventId(pid, pvalue) {
    // copy game:

    //console.log(pid+ " - "+pvalue);

    let events_tmp = this.state.events;

    events_tmp.forEach(function(et) {
      if (String(et.id) === String(pid)) {
        et.id = pvalue;
      }
    });

    //console.log(events_tmp);
    this.setState({
      events: events_tmp,
      json: JSON.stringify(events_tmp)
    }); /*.then(function () {
      //this.props.didSelect(this.state.selected);
      //console.log(this.state.json);
    });
*/

  }

  editNextId(pid, pvalue) {
    // copy game:

    //console.log("next: " + pid + " - " + pvalue);

    let events_tmp = this.state.events;

    events_tmp.forEach(function(et) {
      if (String(et.id) === String(pid)) {
        et.nextid = pvalue;
      }
    });

    //console.log(events_tmp);
    this.setState({
      events: events_tmp,
      json: JSON.stringify(events_tmp)
    }); /*.then(function () {
      //this.props.didSelect(this.state.selected);
      //console.log(this.state.json);
    });
*/ 
  }

  pushNewEvent(pevent) {
    console.log("pushing event ...");
    console.log(pevent);
    this.setState({      
      json: JSON.stringify(this.state.events)
    }); 
  /*  
    this.setState({
      
    }, () => { console.log('The state has been updated.') });
*/
  console.log("reaching this?");

  }

  render() {
    return (
      <div style={appStyle}>
        <div style={{ width: "100%" }}>
          <Track
            events={this.state.events}
            eventid="1550346865"
            editEvent={this.editEvent}
            onChangeText={this.editEventText}
            onChangeId={this.editEventId}
            onChangeNext={this.editNextId}
            pushNewEvent={this.pushNewEvent}
          />
        </div>
      </div>
    );
  }
}

const appStyle = {
  color: "black",
  backgroundColor: "#ffffff",
  fontFamily: "Arial",
  display: "flex"
};

export default App;
