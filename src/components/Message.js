import React from 'react'
import Toolbar from './Toolbar.js'

export default class Message extends React.Component {
  render() {
    return (
      <div className="container">
        <div class={`row message ${this.props.read ? "read": "unread"} ${this.props.selected ? "selected": ""}`}>
          <div class="col-md-1">
            <div class= "row">
              <div class="col-md-2">
                <input id={this.props.id} className="bulkCheck" type="checkbox" onClick={(e)=> this.props.selectMessage(this.props.id)} ></input>
              </div>
              <div class="col-md-2">
                <i id={this.props.id} className = {this.props.starred ? "fa fa-star":"fa fa-star-o"} onClick={(e)=> this.props.starMessage(this.props.id)}></i>
              </div>
            </div>
          </div>
          <div class="col-md-9" onClick={(e) => this.props.readMessage(this.props.id)}>
            <a href="#">
            {this.props.subject}
            </a>
          </div>
          <div class="col-md-1 label label-warning">
          {this.props.labels}
          </div>
        </div>
      </div>
    )
  }
}
