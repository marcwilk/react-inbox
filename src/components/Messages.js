import React from 'react'
import Message from './Message.js'

export default class Messages extends React.Component {
  render() {
    return (
    <div>
      {this.props.messages.map(message =>
        <Message
          key = {message.id}
          subject = {message.subject}
          read = {message.read}
          starred = {message.starred}
          labels = {message.labels}
          body = {message.body}
          starMessage = {this.props.starMessage}
          id = {message.id}
          selectMessage = {this.props.selectMessage}
          selected = {this.props.selected}
        />
      )}
    </div>
    )
  }
}
