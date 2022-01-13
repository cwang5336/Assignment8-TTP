import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import CreditItem from './CreditItem';
import {Link} from 'react-router-dom';

class Credit extends Component {
    constructor(){
        super();
        this.state = {
            credit:{
                id: "",
                description: "",
                amount: "",
                date: ""
            }
        }
    }
    
    handleChange = (e) => {
        const newCredit = {...this.state.credit};
        const input = e.target.name;
        const value = e.target.value;
        newCredit[input] = value;
        if(input === "amount"){
            newCredit.amount = Number(value);
        }
        this.setState({credit: newCredit})
    }
    
    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.addCredit(this.state.credit)
    }

    getData = () =>{
        const results = this.props.credit;
        let data;

        data = results.map((items)=>{
            return <CreditItem credit={items} key={items.id}/>
        });
        return data;
    }

    render() {
        return (
            <div className="container">
                <Link to="/">
                <img src="bank.png" alt="bankimage" className="logo"/>
                </Link> 
                <h1>Credit</h1>
                <div className="linkContainer">
                <Link className="linkItem" to="/userProfile">Profile</Link>
                </div>
                <AccountBalance accountBalance={this.props.accountBalance} debitTotal={this.props.debitTotal} creditTotal={this.props.creditTotal}/>
                <p>Add Purchase</p>
                <form onSubmit={this.handleSubmit}>
                <input
                    onChange={this.handleChange}
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={this.state.credit.description}
                ></input>
                <input
                    onChange={this.handleChange}
                    type="number"
                    step="any"
                    name="amount"
                    placeholder="Amount"
                    value={this.state.credit.amount}
                ></input>
                
                <input type="submit"></input>
                </form>

                <div className='CreditContainer'>
                    {this.getData()}
                    
                </div>
            </div>
        )
    }
}
export default Credit;