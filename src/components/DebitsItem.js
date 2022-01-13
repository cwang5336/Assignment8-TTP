import React, { Component } from 'react'
import "./../App.css"

class DebitsItem extends Component {
    render() {
        return (
            <div className="DebitItem">
                <u>Name</u>: {this.props.debits.description}
                <br/>
                <u>Amount</u>: {this.props.debits.amount}
                <br/>
                <u>Date</u>: {this.props.debits.date}
            </div>
        )
    }
}

export default DebitsItem;