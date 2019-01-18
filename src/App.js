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

  starMessage = (e) => {
    e.preventDefault()
    let id = e.target.id
    console.log(id)
    console.log("star")
    let messagesCopy = Array.from(this.state.messages)
    let index = messagesCopy.filter(e => e.id === id)
    console.log(index)
    messagesCopy[index].starred = !messagesCopy[index].starred
    this.setState ({messages: messagesCopy})
  }

  render() {
    return (
      <main>
        <Toolbar />
        <Messages messages={this.state.messages} starMessage={this.starMessage} />
      </main>
    )
  }
}

export default App
