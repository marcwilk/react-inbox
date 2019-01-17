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

  render() {
    return (
      <main>
        <Toolbar />
        <Messages messages={this.state.messages} />
      </main>
    )
  }
}

export default App
