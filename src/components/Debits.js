import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import DebitsItem from './DebitsItem';
import {Link} from 'react-router-dom';

class Debits extends Component {
    constructor(){
        super();
        this.state = {
            debit:{
                id: "",
                description: "",
                amount: "",
                date: ""
            }
        }
    }
    

    
    handleChange = (e) => {
        const newDebit = {...this.state.debit};
        const input = e.target.name;
        const value = e.target.value;
        newDebit[input] = value;
        if(input === "amount"){
            newDebit.amount = Number(value);
        }
        this.setState({debit: newDebit})
    }
    
    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.addDebit(this.state.debit)
    }

    getData = () =>{
        const results = this.props.debits;
        let data;

        data = results.map((items)=>{
            return <DebitsItem debits={items} key={items.id}/>
        });
        return data;
    }

    render() {
        return (
            <div className="container">
                <Link to="/">
                <img src="bank.png" alt="bankimage" className="logo"/>
                </Link> 
                <h1>Debits</h1>
                <div className="linkContainer container">
                <Link className="linkItem" to="/userProfile">User Profile</Link>
                </div>
                <AccountBalance accountBalance={this.props.accountBalance} debitTotal={this.props.debitTotal} creditTotal={this.props.creditTotal}/>
                <p>Add Purchase</p>
                <form onSubmit={this.handleSubmit}>
                <input
                    onChange={this.handleChange}
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={this.state.debit.description}
                ></input>
                <input
                    onChange={this.handleChange}
                    type="number"
                    step="any"
                    name="amount"
                    placeholder="Amount"
                    value={this.state.debit.amount}
                ></input>
                <input type="submit"></input>
                </form>

                <div className='debtContainer'>
                    {this.getData()}
                </div>
            </div>
        )
    }
}
export default Debits;