import React from 'react'
import Compose from './Compose.js'

export default class Toolbar extends React.Component {

  state = { isVisible:false }

  Hide = () => {
    this.setState( { isVisible:false } )
  }

  Show = () => {
    this.setState( {isVisible:true} )
  }

  render() {
    if(this.state.isVisible===true){
    return (
      <div>
      <Compose sendMessage={this.props.sendMessage}/>
      <div class="container">
        <div class="row toolbar">
          <div class="col-md-12">
            <p class="pull-right">
              <span class="badge badge">{this.props.messageCounter()}</span>
              unread messages
            </p>

            <button onClick={(e)=>this.Hide(e)} class="btn btn-primary" >
              <i className="fa fa-minus"></i>
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
      </div>
    )
  }
  else if(this.state.isVisible===false){
    return(
      <div class="container">
        <div class="row toolbar">
          <div class="col-md-12">
            <p class="pull-right">
              <span class="badge badge">{this.props.messageCounter()}</span>
              unread messages
            </p>

            <button class="btn btn-primary" onClick={(e)=>this.Show(e)}>
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
}
