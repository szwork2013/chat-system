/*
 * jiangyukun on 2016-07-29 19:25
 */
import React, {Component} from 'react'
import classnames from 'classnames'

class Message extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="col-xs-12">
				<div className="row">
					<div className={classnames({
						"pull-left": this.props.dir == 'left',
						"pull-right": this.props.dir == 'right'
					})}>
						<div className="col-xs-12">
							<div className="row">{this.props.username}</div>
						</div>
						<div className="col-xs-12">
						 	<div className="row">{this.props.content}</div>
						</div>
	                </div>
				</div>
			</div>
		)
	}
}

export default Message
