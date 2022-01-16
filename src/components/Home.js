import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="container marginHelper">
                <div className="bor">Bank of Hakiamato's Republic</div>
                <div className="linkContainer">
                <div className="linkItem">{this.props.user.loggedIn ? <Link className="textDecor" to="/userProfile">Profile</Link> : <Link className="textDecor" to="/Login">Go to Accounts</Link>}
                </div>
                <div className="linkItem">{this.props.user.loggedIn ? <Link className="textDecor" to="/debits"> Debit </Link> : ""}</div>
                <div className="linkItem">{this.props.user.loggedIn ? <Link className="textDecor" to="/credit"> Credit </Link> : ""}</div>
                </div>
                <div>{this.props.user.loggedIn ? <AccountBalance accountBalance={this.props.accountBalance} debitTotal={this.props.debitTotal} creditTotal={this.props.creditTotal}/> : ""}</div>
            </div>
        )
    }
}

export default Home;