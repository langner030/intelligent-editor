import React, { Component } from "react";
import Event from "./Event";
import Track from "./Track";
import Output from "./Output";
import Canvas from "./Canvas";
import ErrorBoundary from "./ErrorBoundary";
import { FaFolder, FaSitemap, FaRegPlusSquare, FaSave } from "react-icons/fa";
import Modal from "react-responsive-modal";

import { Accordion, AccordionItem } from "react-light-accordion";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      open: false,
      showTracks: false,
      openFileModal: false,
      currenttrack: 1,
      currentContact: {},
      game: {
        title: "Rob's Quest",
        startEventId: 1,
        events: [
          {
            id: 1,
            type: "receive",
            text: "Welcome to my new chatbot!",
            nextid: 2,
            contactid: 1
          },
          {
            id: 2,
            type: "receive",
            text: "I hobe you will enjoy thos new experience.",
            nextid: 50,
            contactid: 1
          },
          {
            id: 30,
            type: "receive",
            text: "Okay, here is a short introduction! :)",
            nextid: 1550568044692,
            contactid: 1
          },
          {
            id: 40,
            type: "receive",
            text: "Good decicion?",
            nextid: 1550525787131,
            contactid: 1
          },
          {
            id: 50,
            type: "receive",
            nextid: 1550567987270,
            contactid: 1,
            text:
              "Do you need an introduction or do you want to start directly?"
          },
          {
            id: 22150970584,
            type: "receive",
            nextid: -100,
            text: "...",
            contactid: 1
          },
          {
            id: 1550567987270,
            type: "choose",
            contactid: 1,
            options: [
              {
                id: 1550567987271,
                text: "Please give me a short introduction",
                nextid: "30"
              },
              {
                id: 22150971452,
                text: "Let's just start!",
                nextid: "22150970584"
              }
            ]
          },
          {
            id: 1550568044692,
            type: "receive",
            nextid: 1550568046109,
            contactid: 1,
            text: "Do you have any more questions?"
          },
          {
            id: 1550568046109,
            type: "choose",
            contactid: 1,
            options: [
              {
                id: 1550568046110,
                text: "No, let's start!",
                nextid: "22150970584"
              }
            ]
          }
        ],
        contacts: [
          {
            id: 1,
            name: "Alex",
            img_url: "https://randomuser.me/api/portraits/men/86.jpg",
            messages: [
              {
                id: 1,
                type: "plot",
                text:
                  "Alex ist Architekturstudent aus Berlin. Nach einer anstrengenden Zeit freut er sich auf seinen ersten Urlaub seit langem."
              }
            ]
          },
          {
            id: 99,
            name: "Elli",
            img_url: "https://randomuser.me/api/portraits/women/0.jpg",
            messages: [
              {
                id: 1,
                type: "plot",
                text:
                  "Elli ist Alex' beste Freundin. Sie lebt in Amsterdam. Alex und Elli haben sich bei einem gemeinsamen Austausch während des Studiums kennengelernt. "
              }
            ]
          },
          {
            id: 9,
            name: "Jeff",
            img_url: "https://randomuser.me/api/portraits/men/95.jpg",
            messages: [
              {
                id: 1,
                type: "plot",
                text:
                  "Elli ist Alex' beste Freundin. Sie lebt in Amsterdam. Alex und Elli haben sich bei einem gemeinsamen Austausch während des Studiums kennengelernt. "
              }
            ]
          }
        ],

        tracks: [
          { id: 1, title: "welcome", x: "80", y: "0" },
          { id: 30, title: "introduction", x: "150", y: "100" },
          { id: 22150970584, title: "let's start!", x: "80", y: "200" }
        ]
      }
    });
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onOpenFileModal = () => {
    this.setState({ openFileModal: true });
  };

  onCloseFileModal = () => {
    this.setState({ openFileModal: false });
  };

  onOpenContactModal = e => {
    let c = this.findArrayElementById(this.state.game.contacts, e.target.id);
    this.setState({ openContactModal: true, currentContact: c });
  };

  onCloseContactModal = () => {
    this.setState({ openContactModal: false });
  };

  componentWillUpdate() {
    //console.log("will TRID: " + JSON.stringify(this.state.currenttrack));
  }

  componentDidUpdate() {
    /* 
    console.log(" did TRID: " + JSON.stringify(this.state.currenttrack));
    console.log("JSON: " + JSON.stringify(this.state.game.events));
    console.log("JSON: " + JSON.stringify(this.state.game.tracks));
*/
  }

  render() {
    const { open } = this.state;
    const { openContactModal } = this.state;
    return (
      <div style={appStyle}>
        <div>
          <button onClick={this.onOpenFileModal}>Load/Save</button>
          <button onClick={this.createNewTrack.bind(this)}>
            <FaRegPlusSquare /> add track
          </button>
          {this.state.game.contacts.map(c => (
            <p>
              <img src={c.img_url} width="24" />
              <br />
              <button onClick={this.onOpenContactModal} id={c.id}>
                {c.name}
              </button>
            </p>
          ))}
          <button onClick={this.createNewContact.bind(this)}>
            <FaRegPlusSquare /> add contact
          </button>
          <Modal open={openContactModal} onClose={this.onCloseContactModal}>
            <h3>Edit Contact</h3>
            <input
              type="text"
              id={this.state.currentContact.id}
              value={this.state.currentContact.name}
              onChange={e => {
                this.editContactName(e.target.id, e.target.value);
              }}
            />
            <br />
            <img src={this.state.currentContact.img_url} />
            <br />
            <input
              type="text"
              id={this.state.currentContact.id}
              value={this.state.currentContact.img_url}
              onChange={e => {
                this.editContactImgUrl(e.target.id, e.target.value);
              }}
            />
          </Modal>
          <Modal open={open} onClose={this.onCloseModal} center>
            <div style={{ width: "40%" }}>
              track-id: {this.state.currenttrack}{" "}
              <input
                type="text"
                value={this.getCurrentTrackTitle()}
                id={this.state.currenttrack}
                onChange={this.onChangeTrackTitle.bind(this)}
              />
              {this.getEventList(this.state.currenttrack).map((item, index) => (
                <Event
                  text={item.text}
                  type={item.type}
                  id={item.id}
                  nextid={item.nextid}
                  wait={item.wait}
                  options={item.options}
                  game={this.props.game}
                  contacts={this.state.game.contacts}
                  onChangeText={this.editEventText.bind(this)}
                  //onChangeId={this.props.onChangeId.bind(this)}
                  onChangeNext={this.editNextId.bind(this)}
                  //onAddReceive={this.addReceive.bind(this)}
                  onChangeWait={this.editEventWait.bind(this)}
                  pushNewEvent={this.pushNewEvent.bind(this)}
                  addOptionToChoose={this.addOptionToChoose.bind(this)}
                  dropEvent={this.dropEvent.bind(this)}
                  tracks={this.state.game.tracks}
                  changeOptionText={this.changeOptionText.bind(this)}
                  changeOptionNext={this.changeOptionNext.bind(this)}
                  switchEventType={this.editEventType.bind(this)}
                  contactid={item.contactid}
                  contact={this.getContact(item.contactid)}
                  editEventContact={this.editEventContact.bind(this)}
                />
              ))}
            </div>
          </Modal>
        </div>
        <div style={leftEditStyle}>
          <pre>
            Game: {this.state.game.title} <br />
            Start Event: {this.state.game.startEventId}
            <br />
            Events: {this.state.game.events.length} <br />
          </pre>
          <Modal open={this.state.showTracks}>
            <div style={trackListStyle}>
              tracks
              <br />
              {this.state.game.tracks.map((item, index) => (
                <div key={index}>
                  <button
                    style={
                      item.id === this.state.currenttrack
                        ? trackButtonSelectedStyle
                        : trackButtonStyle
                    }
                    onClick={this.changeTrackByEvent.bind(this)}
                    id={item.id}
                  >
                    <small>{item.id}</small>
                    <br /> {item.title}
                  </button>
                </div>
              ))}
              <br />
              <center>
                <button onClick={this.createNewTrack.bind(this)}>
                  <FaRegPlusSquare /> add track
                </button>
              </center>
            </div>
          </Modal>
        </div>

        <div style={{ width: "100%" }}>
          <Canvas
            eventlist={this.state.game.events}
            tracklist={this.state.game.tracks}
            geteventlist={this.getEventList.bind(this)}
            changeTrackById={this.changeTrackById.bind(this)}
            onTrackChangePosition={this.onTrackChangePosition.bind(this)}
            onOpenModal={this.onOpenModal.bind(this)}
          />
        </div>

        <Modal
          open={this.state.openFileModal}
          onClose={this.onCloseFileModal}
          center
        >
          <div>
            <textarea
              style={jsonStyle}
              value={JSON.stringify(this.state.game)}
            />
            <br />

            <button onClick={this.saveGameToFile.bind(this)}>
              <FaSave />
            </button>
            <textarea
              style={jsonStyle}
              value={""}
              onChange={this.loadGameFromString.bind(this)}
            />
            <br />
            <select>
              <option value="story1">Story 1</option>
            </select>
            <button>Load</button>
          </div>
        </Modal>
      </div>
    );
  }

  loadGameFromString(event) {
    console.log(JSON.parse(event.target.value));
    let new_game = JSON.parse(event.target.value);
    // make some corrections:
    new_game.tracks.forEach(function(tr) {
      if (tr.x === undefined) {
        tr.x = 100;
      }
      if (tr.y === undefined) {
        tr.y = 100;
      }
    });

    new_game.events.map((e, index) => {
      if (e.contactid === undefined) {
        e.contactid = 1;
      }
    });

    this.setState({
      game: new_game
    });
  }

  editEventContact(eventid, contactid) {
    console.log("e" + eventid + " c" + contactid);
    //console.log("change track title");
    let events_tmp = this.state.game.events;
    let e = this.findArrayElementById(events_tmp, eventid);
    if (e !== undefined) {
      e.contactid = contactid;
      this.setState({
        game: {
          ...this.state.game,
          events: events_tmp
        }
      });
    } else {
      console.log("track not found with id " + event.target.id);
    }
  }

  getContacts() {
    return this.state.contacts;
  }

  getContact(cid) {
    return this.findArrayElementById(this.state.game.contacts, cid);
  }

  changeTrackByEvent(event) {
    //console.log("switch to track " + event.target.id);
    if (event.target.id > 0) {
      this.setState({
        currenttrack: Number(event.target.id)
      });
    }
  }

  changeTrackById(pid) {
    //    console.log("switch to track " + pid);
    if (pid > 0) {
      this.setState({
        currenttrack: Number(pid)
      });
    }
  }

  onTrackChangePosition(trackid, dx, dy) {
    let tracks_tmp = this.state.game.tracks;
    tracks_tmp.forEach(function(tr) {
      if (String(tr.id) === String(trackid)) {
        tr.x = dx;
        tr.y = dy;
      }
    });

    //console.log(events_tmp);
    this.setState({
      game: {
        ...this.state.game,
        tracks: tracks_tmp
      }
    });
  }

  createNewTrack(event) {
    //console.log("create new track");
    let pevent = this.getNewEvent();
    pevent.nextid = -100;
    this.setState({
      game: {
        ...this.state.game,
        events: [...this.state.game.events, pevent],
        tracks: [
          ...this.state.game.tracks,
          { id: pevent.id, title: pevent.text, x: 100, y: 100 }
        ]
      }
    });
    this.changeTrackById(pevent.id);
  }

  createNewContact(event) {
    //console.log("create new track");
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime / 70);
    this.setState({
      game: {
        ...this.state.game,
        //        events: [...this.state.game.events, pevent],
        contacts: [
          ...this.state.game.contacts,
          { id: timestamp, name: "Harrold" }
        ]
      }
    });
    this.changeTrackById(pevent.id);
  }

  onChangeTrackTitle(event) {
    //console.log("change track title");
    let tracks_tmp = this.state.game.tracks;
    let track = this.findArrayElementById(tracks_tmp, event.target.id);
    if (track !== undefined) {
      //console.log("track edit: " + track.title);
      track.title = event.target.value;
      this.setState({
        game: {
          ...this.state.game,
          events: this.state.game.events,
          tracks: tracks_tmp
        }
      });
    } else {
      console.log("track not found with id " + event.target.id);
    }
  }

  getCurrentTrackTitle() {
    return this.findArrayElementById(
      this.state.game.tracks,
      this.state.currenttrack
    ).title;
    //return "track title"
  }

  findArrayElementById(array, id) {
    return array.find(element => {
      return String(element.id) === String(id);
    });
  }

  dropEvent(e) {
    //console.log(e.target.id);
    console.log("dropping " + e.target.id);
  }

  getEventList(starteventid) {
    let e = this.findArrayElementById(this.state.game.events, starteventid);

    let list = [e];
    //console.log(list);

    /*
    if (e === undefined) {
      return list;
    }
*/
    while (e.nextid > -100) {
      e = this.findArrayElementById(this.state.game.events, e.nextid);
      list.push(e); //console.log(e);
    }

    return list;
  }

  pushNewEvent(pevent) {
    //console.log("pushing new event in App...");
    this.setState({
      game: {
        ...this.state.game,
        events: [...this.state.game.events, pevent]
      }
    });
  }

  addOptionToChoose(pid) {
    let events_tmp = this.state.game.events;
    let options_tmp;

    // find: choose-event by id :
    events_tmp.forEach(function(et) {
      if (String(et.id) === String(pid)) {
        const dateTime = Date.now();
        const timestamp = Math.floor(dateTime / 70);
        let newOption = {
          id: timestamp,
          nextid: -100,
          text: "?"
        };

        //this.getNewOption();
        //console.log(newOption);
        et.options.push({ id: newOption.id, text: newOption.text });
      }
    });

    this.setState({
      game: {
        ...this.state.game,
        events: events_tmp
      }
    });
  }

  changeOptionText(pevent) {
    // option.id:
    let pid = pevent.target.id;
    let ptext = pevent.target.value;
    //console.log(pid + " " + ptext);

    let events_tmp = this.state.game.events;

    events_tmp.forEach(function(et) {
      if (String(et.type) === String("choose")) {
        et.options.forEach(function(ot) {
          if (String(ot.id) === String(pid)) {
            ot.text = ptext;
          }
        });
      }
    });

    //console.log(events_tmp);
    this.setState({
      game: {
        ...this.state.game,
        events: events_tmp
      }
    });
  }

  changeOptionNext(pevent) {
    // option.id:
    let pid = pevent.target.id;
    let pnext = pevent.target.value;
    //console.log(pid + " " + ptext);

    let events_tmp = this.state.game.events;

    events_tmp.forEach(function(et) {
      if (String(et.type) === String("choose")) {
        et.options.forEach(function(ot) {
          if (String(ot.id) === String(pid)) {
            ot.nextid = pnext;
          }
        });
      }
    });

    //console.log(events_tmp);
    this.setState({
      game: {
        ...this.state.game,
        events: events_tmp
      }
    });
  }
  // generate Event
  getNewEvent() {
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime / 70);
    return {
      id: timestamp,
      type: "receive",
      nextid: null,
      text: "...",
      contactid: 1
    };
  }

  editContactName(pid, pvalue) {
    let contacts_tmp = this.state.game.contacts;

    contacts_tmp.forEach(function(ct) {
      if (String(ct.id) === String(pid)) {
        ct.name = pvalue;
      }
    });

    //console.log(events_tmp);
    this.setState({
      game: {
        ...this.state.game,
        contacts: contacts_tmp
      }
    });
  }

  editContactImgUrl(pid, pvalue) {
    let contacts_tmp = this.state.game.contacts;

    contacts_tmp.forEach(function(ct) {
      if (String(ct.id) === String(pid)) {
        ct.img_url = pvalue;
      }
    });

    //console.log(events_tmp);
    this.setState({
      game: {
        ...this.state.game,
        contacts: contacts_tmp
      }
    });
  }

  editEventText(pid, pvalue) {
    // copy events:

    let events_tmp = this.state.game.events;

    events_tmp.forEach(function(et) {
      if (String(et.id) === String(pid)) {
        et.text = pvalue;
      }
    });

    //console.log(events_tmp);
    this.setState({
      game: {
        ...this.state.game,
        events: events_tmp
      }
    });
  }

  editEventWait(pid, pvalue) {
    // copy game:

    let events_tmp = this.state.game.events;

    events_tmp.forEach(function(et) {
      if (String(et.id) === String(pid)) {
        et.wait = pvalue;
      }
    });

    //console.log(events_tmp);
    this.setState({
      game: {
        ...this.state.game,
        events: events_tmp
      }
    });
  }

  editEventType(pid, pvalue) {
    // copy game:

    console.log(pid, pvalue);
    let events_tmp = this.state.game.events;

    events_tmp.forEach(function(et) {
      if (String(et.id) === String(pid)) {
        et.type = pvalue;
      }
    });

    //console.log(events_tmp);
    this.setState({
      game: {
        ...this.state.game,
        events: events_tmp
      }
    });
  }

  editNextId(pid, pvalue) {
    // copy game:

    let events_tmp = this.state.game.events;

    events_tmp.forEach(function(et) {
      if (String(et.id) === String(pid)) {
        et.nextid = pvalue;
      }
    });

    //console.log(events_tmp);
    this.setState({
      game: {
        events: events_tmp
      }
    });
  }

  saveGameToFile() {
    this.postStoryToServer("codesandbox1", this.state.game);
    /*
    console.log("saving game to file...");
    const writeJsonFile = require("write-json-file");
    (async () => {
      await writeJsonFile("game.json", this.state.game);
    })();
    var fs = require("fs");
    fs.writeFile("test.txt", this.state.game, function(err) {
      if (err) {
        console.log(err);
      }
    });
*/
  }
}

const appStyle = {
  color: "black",
  backgroundColor: "#ffffff",
  fontFamily: "Courier",
  display: "flex"
};

const jsonStyle = {
  color: "black",
  backgroundColor: "#ffffff",
  fontFamily: "Courier",
  fontSize: "8px",
  width: "100%",
  height: "100%"
};

const trackListStyle = {
  width: "100%",
  backgroundColor: "#ffffff"
};

const trackButtonStyle = {
  width: "100%",
  backgroundColor: "#ffffff"
};

const trackButtonSelectedStyle = {
  width: "100%",
  backgroundColor: "#e0e0e0"
};

const leftEditStyle = {
  float: "right",
  backgroundColor: "#ffffff"
};
export default App;
