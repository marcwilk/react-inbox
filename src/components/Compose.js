import React from 'react'

export default class Messages extends React.Component {
  render() {
    return (
    <div>
      <form onSubmit={this.props.sendMessage} class="form-horizontal well">
        <div class="form-group">
          <div class="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div class="form-group">
          <label for="subject" class="col-sm-2 control-label">Subject</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="subject" placeholder="Enter a subject" name="subject">
              </input>
            </div>
          </div>
        <div class="form-group">
          <label for="body" class="col-sm-2 control-label">Body</label>
            <div class="col-sm-8">
              <textarea name="body" id="body" class="form-control"></textarea>
            </div>
          </div>
        <div class="form-group">
          <div class="col-sm-8 col-sm-offset-2">
            <input type="submit" value="Send" class="btn btn-primary">
            </input>
          </div>
        </div>
      </form>
    </div>
    )
  }
}
