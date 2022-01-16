import React, { Component } from 'react';
import {Link, Navigate} from 'react-router-dom';


class SignIn extends Component {

    constructor(){
        super();
        this.state = {
            user: {
                userName: 'Bob',
                password: '1234'
            },
            redirect: true
        }
    }


    handleChange = (e) => {
        const updatedUser = {...this.state.user};
        const inputField = e.target.name;
        const inputValue = e.target.value;
        updatedUser[inputField] = inputValue;
        this.setState({user: updatedUser});
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.mockLogIn(this.state.user);
        this.setState({redirect: true});
    }


    render() {

        if(this.state.redirect){
            return (<Navigate to="/UserProfile"/>)
        }
        return (
            <div className=" marginHelper sign">
            <div className="signInCon">
            <Link to="/">
            </Link> 
            <h1 className="marginHelperSmall ">Sign In</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="marginHelperSmall">
                    <label htmlFor="userName">Username </label>
                    <input type="text" name="userName" onChange={this.handleChange} value={this.state.user.userName} />
                </div>
                <div className="marginHelperSmall">
                    <label htmlFor="password">Password </label>
                    <input type="password" name="password"/>
                </div>
                <button>Log In</button>
            </form>
            </div>

            </div>
        )
    }
}

export default SignIn;