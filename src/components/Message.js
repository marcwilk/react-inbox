import React from 'react'

export default class Message extends React.Component {
  render() {
    return (
      <div className="container">
        <div class="row message unread">
          <div class="col-xs-1">
            <div class="row">
              <div class="col-xs-2">
                <input type="checkbox" />
              </div>
              <div class="col-xs-2">
                <i id={this.props.id} class="star fa fa-star-o" onClick={this.props.starMessage}></i>
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
