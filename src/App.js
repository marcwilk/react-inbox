import React, { Component } from 'react'
import './App.css'
import Messages from './components/Messages.js'
import Toolbar from './components/Toolbar.js'

class App extends Component {

  state = { messages: [] }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState ({messages: json})
  }

  starMessage = (id) => {
    let messagesCopy = Array.from(this.state.messages)
    let index = messagesCopy.filter(message => message.id === id)[0]
    let chosenIndex = index.id-1
    let currentStatus = index.starred
    messagesCopy[chosenIndex].starred = !currentStatus
    this.setState ({messages: messagesCopy})
    fetch('http://localhost:8082/api/messages', {
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
    let messagesCopy = Array.from(this.state.messages)
    let index = messagesCopy.filter(message => message.id === id)[0]
    let chosenIndex = index.id-1
    let currentStatus = index.read
    messagesCopy[chosenIndex].read = !currentStatus
    this.setState ({messages: messagesCopy})
    fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify ({
        "messageIds": [id],
        "command": "read",
        "read": index.read
      }),
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      }
    })
  }

  selectMessage = (id) => {
    let messagesCopy = Array.from(this.state.messages)
    let index = messagesCopy.filter(message => message.id === id)[0]
    let chosenIndex = index.id-1
    let currentStatus = index.selected
    messagesCopy[chosenIndex].selected = !currentStatus
    this.setState ({messages: messagesCopy})
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

  render() {
    return (
      <main>
        <Toolbar messages={this.state.messages} bulkSelect={this.bulkSelect} bulkDeselect={this.bulkDeselect} messageCounter={this.messageCounter}/>
        <Messages messages={this.state.messages} starMessage={this.starMessage} readMessage={this.readMessage} selectMessage={this.selectMessage}/>
      </main>
    )
  }
}

export default App
