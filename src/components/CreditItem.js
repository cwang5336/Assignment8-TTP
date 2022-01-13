import React, { Component } from 'react'
import "./../App.css"

class CreditItem extends Component {
    render() {
        return (
            <div className="CreditItem">
                <u>Name</u>: {this.props.credit.description}
                <br/>
                <u>Amount</u>: {this.props.credit.amount}
                <br/>
                <u>Date</u>: {this.props.credit.date}
            </div>
        )
    }
}

export default CreditItem;