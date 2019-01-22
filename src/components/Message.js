import React from 'react'

export default class Message extends React.Component {
  render() {
    return (
      <div className="container">
        <div class="row message unread">
          <div class="col-xs-1">
            <div class="row">
              <div class="col-xs-2">
                <i id={this.props.id} className = {this.props.selected ? "fa fa-square":"fa fa-square-o"} onChange={(e) => this.props.selected(this.props.id)}></i>
              </div>
              <div class="col-xs-2">
                <i id={this.props.id} className = {this.props.starred ? "fa fa-star":"fa fa-star-o"} onClick={(e)=> this.props.starMessage(this.props.id)}></i>
              </div>
            </div>
          </div>
          <div class="col-xs-11">
            <a href="#">
            {this.props.subject}
            </a>
          </div>
        </div>
      </div>
    )
  }
}
