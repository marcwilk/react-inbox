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

            <a class="btn btn-danger">
              <i class="fa fa-plus"></i>
            </a>

            <button onClick= {this.props.bulkSelect} class="btn btn-default">
              <i className = {this.props.messages.selected ? "fa fa-square-o":"fa fa-check-square-o"}></i>
            </button>

            <button onClick= {this.props.bulkDeselect} class="btn btn-default">
              <i className = {this.props.selected ? "fa fa-square-o":"fa fa-square-o"}></i>
            </button>

            <button class="btn btn-default">Mark As Read</button>

            <button class="btn btn-default">Mark As Unread</button>

            <select class="form-control label-select">
              <option>Apply label</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>

            <select class="form-control label-select">
              <option>Remove label</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>

            <button class="btn btn-default">
              <i class="fa fa-trash-o"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
}
