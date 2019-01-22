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
    let messages=this.state.messages
    let starred=messages.filter(message=> message.id===id)[0]
    let newmessages= {...starred, starred: (!starred.starred)}
    let selectedindex=messages.indexOf(starred)
    this.setState({
      messages: [...this.state.messages.slice(0, selectedindex), newmessages ,...this.state.messages.slice(selectedindex+1)]
    })
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
    let messages=this.state.messages
    let read=messages.filter(message=> message.id===id)[0]
    let newmessages= {...read, read: (!read.read)}
    let selectedindex=messages.indexOf(read)
    this.setState({
      messages: [...this.state.messages.slice(0, selectedindex), newmessages ,...this.state.messages.slice(selectedindex+1)]
    })
    fetch('http://localhost:8082/api/messages', {
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
    await fetch('http://localhost:8082/api/messages', {
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
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState ({messages: json})
  }

  render() {
    return (
      <main>
        <Toolbar messages={this.state.messages} bulkSelect={this.bulkSelect} bulkDeselect={this.bulkDeselect} messageCounter={this.messageCounter} markAsRead={this.markAsRead} markAsUnread={this.markAsUnread} deleteMessage={this.deleteMessage}/>
        <Messages messages={this.state.messages} starMessage={this.starMessage} readMessage={this.readMessage} selectMessage={this.selectMessage}/>
      </main>
    )
  }
}

export default App
