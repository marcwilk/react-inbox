import React from 'react'

export default class Toolbar extends React.Component {
  render() {
    return (
      <div class="container">
        <div class="row toolbar">
          <div class="col-md-12">
            <p class="pull-right">
              <span class="badge badge">{this.props.messageCounter()}</span>
              unread messages
            </p>

            <button class="btn btn-danger" onClick={this.props.sendMessage}>
              <i className="fa fa-plus"></i>
            </button>

            <button onClick={this.props.bulkSelect} class="btn btn-default">
              <i className ={this.props.messages.selected ? "fa fa-square-o":"fa fa-check-square-o"}></i>
            </button>

            <button onClick={this.props.bulkDeselect} class="btn btn-default">
              <i className={this.props.selected ? "fa fa-square-o":"fa fa-square-o"}></i>
            </button>

            <button onClick={this.props.markAsRead} class="btn btn-default" disabled={this.props.messages.filter(message => message.selected === true).length ===0 ? "disabled": ""}>Mark As Read</button>

            <button onClick={this.props.markAsUnread} class="btn btn-default">Mark As Unread</button>

            <select onChange={this.props.applyLabel} class="form-control label-select" disabled={this.props.messages.filter(message => message.selected === true).length ===0 ? "disabled": ""}>
              <option>Apply Label</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>

            <select onChange={this.props.removeLabel} class="form-control label-select" disabled={this.props.messages.filter(message => message.selected === true).length ===0 ? "disabled": ""}>
              <option>Remove label</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>

            <button onClick= {this.props.deleteMessage} class="btn btn-default">
              <i class="fa fa-trash-o"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
}
