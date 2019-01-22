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

  selectMessage = (id) => {
    let messagesCopy = Array.from(this.state.messages)
    let index = messagesCopy.filter(message => message.id === id)[0]
    let chosenIndex = index.id-1
    let currentStatus = index.read
    messagesCopy[chosenIndex].read = !currentStatus
    this.setState ({messages: messagesCopy})
  }

  render() {
    return (
      <main>
        <Toolbar />
        <Messages messages={this.state.messages} starMessage={this.starMessage} selectMessage={this.selectMessage}/>
      </main>
    )
  }
}

export default App
