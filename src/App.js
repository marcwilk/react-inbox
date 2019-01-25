import React, { Component } from 'react'
import './App.css'
import Messages from './components/Messages.js'
import Toolbar from './components/Toolbar.js'

class App extends Component {

  state = { messages: [] }

  async componentDidMount() {
    const response = await fetch('https://collective-api-mww.herokuapp.com/api/messages')
    const json = await response.json()
    this.setState ({messages: json})
  }

  starMessage = (id) => {
    let messages=this.state.messages
    let starred=messages.filter(message=> message.id===id)[0]
    let newmessages= {...starred, starred: (!starred.starred)}
    let selectedindex=messages.indexOf(starred)
    this.setState({
      messages: [...this.state.messages.slice(0, selectedindex), newmessages ,...this.state.messages.slice(selectedindex+1)]
    })
    fetch('https://collective-api-mww.herokuapp.com/api/messages', {
      method: 'PATCH',
      body: JSON.stringify ({
        "messageIds": [id],
        "command": "star"
      }),
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      }
    })
  }

  readMessage = (id) => {
    let messages=this.state.messages
    let read=messages.filter(message=> message.id===id)[0]
    let newmessages= {...read, read: (!read.read)}
    let selectedindex=messages.indexOf(read)
    this.setState({
      messages: [...this.state.messages.slice(0, selectedindex), newmessages ,...this.state.messages.slice(selectedindex+1)]
    })
    fetch('https://collective-api-mww.herokuapp.com/api/messages', {
      method: 'PATCH',
      body: JSON.stringify ({
        "messageIds": [id],
        "command": "read",
        "read": !read.read
      }),
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      }
    })
  }

  selectMessage = (id) => {
    let messages=this.state.messages
    let selected=messages.filter(message=> message.id===id)[0]
    let newmessages= {...selected, selected: (!selected.selected)}
    let selectedindex=messages.indexOf(selected)
    this.setState({
      messages: [...this.state.messages.slice(0, selectedindex), newmessages ,...this.state.messages.slice(selectedindex+1)]
    })
  }

  bulkSelect = () => {
    let checkboxes = [...document.getElementsByClassName("bulkCheck")]
    checkboxes.map(checkbox => checkbox.checked = "checked")
    let newState = this.state.messages.map(message => message.selected = true)
    this.setState(newState)
  }

  bulkDeselect = () => {
    let checkboxes = [...document.getElementsByClassName("bulkCheck")]
    checkboxes.map(checkbox => checkbox.checked = "")
    let newState = this.state.messages.map(message => message.selected = false)
    this.setState(newState)
  }

  messageCounter = () => {
    let counter = this.state.messages.filter(e => e.read === false).length
    return counter
  }

  markAsRead = () => {
    let messagesCopy = Array.from(this.state.messages)
    let indexes = messagesCopy.filter(message => message.selected === true)
    indexes.map(selected => selected.read = true)
    this.setState(indexes)
  }

  markAsUnread = () => {
    let messagesCopy = Array.from(this.state.messages)
    let indexes = messagesCopy.filter(message => message.selected === true)
    indexes.map(selected => selected.read = false)
    this.setState(indexes)
  }

  deleteMessage = async () => {
    let messagesCopy = Array.from(this.state.messages)
    await fetch('https://collective-api-mww.herokuapp.com/api/messages', {
      method: 'PATCH',
      body: JSON.stringify ({
        "messageIds": messagesCopy.filter(message => message.selected === true).map(message => message.id),
        "command": "delete"
      }),
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      }
    })
    const response = await fetch('https://collective-api-mww.herokuapp.com/api/messages')
    const json = await response.json()
    this.setState ({messages: json})
  }

  applyLabel = (e) => {
    const newState = {...this.state}
    let newLabel = e.target.value
    let selectedMessages = newState.messages.filter(message => message.selected === true)
    selectedMessages.map(message => message.labels.push(newLabel))
    this.setState(selectedMessages)
  fetch('https://collective-api-mww.herokuapp.com/api/messages', {
    method: 'PATCH',
    body: JSON.stringify ({
      "messageIds": this.state.messages.filter(message => message.selected === true).map(message => message.id),
      "command": "addLabel",
      "label": e.target.value
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  }

  removeLabel = (e) => {
    const newState = {...this.state}
    let newLabel = e.target.value
    let selectedMessages = newState.messages.filter(message => message.selected === true)
    selectedMessages.map(message => message.labels.splice(message.labels.indexOf(newLabel), 1))
    this.setState(selectedMessages)
  fetch('https://collective-api-mww.herokuapp.com/api/messages', {
    method: 'PATCH',
    body: JSON.stringify ({
      "messageIds": this.state.messages.filter(message => message.selected === true).map(message => message.id),
      "command": "removeLabel",
      "label": e.target.value
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  }

  sendMessage=(e)=>{
    let subject = e.target.subject.value
    let body = e.target.body.value
    fetch('https://collective-api-mww.herokuapp.com/api/messages', {
      method: 'POST',
      body: JSON.stringify({
        subject: e.target.subject.value,
        body: e.target.body.value,
        selected: false,
        read: false,
        starred: false,
        labels: [],
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }

  render() {
    return (
      <main>
        <Toolbar
          messages={this.state.messages}
          bulkSelect={this.bulkSelect}
          bulkDeselect={this.bulkDeselect}
          messageCounter={this.messageCounter}
          markAsRead={this.markAsRead}
          markAsUnread={this.markAsUnread}
          deleteMessage={this.deleteMessage}
          applyLabel={this.applyLabel}
          removeLabel={this.removeLabel}
          sendMessage={this.sendMessage}
        />
        <Messages
          messages={this.state.messages}
          starMessage={this.starMessage}
          readMessage={this.readMessage}
          selectMessage={this.selectMessage}
        />
      </main>
    )
  }
}

export default App
