import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

class UserProfile extends Component {
    render() {
        return (
            <div className="container">
                <Link to="/">
                </Link> 
                <h1>Bank of Hakiamato's Republic</h1>
                <div className="marginHelperSmall">Username: {this.props.user.userName}</div>
                <div>Member Since: {this.props.memberSince}</div>
                <AccountBalance className="marginHelperSmall" accountBalance={this.props.accountBalance} debitTotal={this.props.debitTotal} creditTotal={this.props.creditTotal}/>
                <div className="linkContainer marginHelperSmall">
                <div>{this.props.user.loggedIn ? <Link className="linkItem" to="/debits"> Debit Account</Link> : ""}</div>
                <div>{this.props.user.loggedIn ? <Link  className="linkItem"to="/credit"> Credit Account</Link> : ""}</div>
                </div>
            </div>
        )
    }
}

export default UserProfile;