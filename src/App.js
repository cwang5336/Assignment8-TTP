import React from "react";
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Debits from './components/Debits';
import Credit from './components/Credit';
import axios from 'axios';
import {v4 as uuid} from 'uuid';

class App extends React.Component {
  constructor(){
    super();

    this.state ={
      accountBalance: 0,
      currentUser: {
        userName: 'Bob',
        memberSince: '01/13/2022',
        loggedIn: false
      },
      debits: [],
      credit: [],
      debitTotal: 0,
      creditTotal: 0 

    }
  }

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  componentDidMount(){
    this.getDebits();
    this.getCredit();
  }

  //Retrive debit data from API
  getDebits = () => {
      axios.get(`https://moj-api.herokuapp.com/debits`)
      .then(res => {
        const data = res.data.slice(0, 3);
        this.setState({debits: data});
        let tempD = 0;
        for(let i of data){
          tempD+=i.amount;
        }
        tempD = Math.round((tempD + Number.EPSILON) * 100) / 100
        this.setState({debitTotal: tempD})
      })
      .catch(err => console.log("Debit error"))
  }

  //Retrieve credit data from API
  getCredit = () =>{
    axios.get(`https://moj-api.herokuapp.com/credits`)
    .then(res => {
      const data = res.data.slice(0, 3);
      this.setState({credit: data});
      let tempC = 0;
      for(let i of data){
        tempC+=i.amount;
      }
      tempC = Math.round((tempC + Number.EPSILON) * 100) / 100
      this.setState({creditTotal: tempC})
    })
    .catch(err => console.log("Debit error"))
  }

  //Add Debit Item
  addDebit =(debit) =>{
    debit.id = uuid();
    let date = new Date();
    debit.date = date.toISOString();
    
    const newDebits = [debit, ...this.state.debits];
    let debitTotal = 0;
    for(let i =0; i< newDebits.length; i++){
      debitTotal+=newDebits[i].amount;
    }
    debitTotal = Math.round((debitTotal + Number.EPSILON) * 100) / 100
    this.setState({debits: newDebits, debitTotal: debitTotal})
  }

  //Add Credit item
  addCredit = (credit) =>{
    credit.id = uuid();
    let date = new Date();
    credit.date = date.toISOString();
    
    const newCredit = [credit, ...this.state.credit];
    let creditTotal = 0;
    for(let i =0; i< newCredit.length; i++){
      creditTotal+=newCredit[i].amount;
    }
    creditTotal = Math.round((creditTotal + Number.EPSILON) * 100) / 100
    this.setState({credit: newCredit, creditTotal: creditTotal})
  }

  LogIn = (Info) =>{
    const newUser = {...this.state.currentUser};
    newUser.userName = Info.userName;
    newUser.loggedIn = true;
    this.setState({currentUser: newUser});
  }
  render(){

    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} user={this.state.currentUser} debitTotal={this.state.debitTotal} creditTotal={this.state.creditTotal} />);
    const UserProfileComponent = () => (<UserProfile  user={this.state.currentUser} memberSince={this.state.currentUser.memberSince} accountBalance={this.state.accountBalance} debitTotal={this.state.debitTotal} creditTotal={this.state.creditTotal}/>)
    const LogInComponent = () => (<Login user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>)
    //const SignInComponent = () => (<SignIn user={this.state.currentUser} LogIn={this.LogIn} {...this.props} />)
    const DebitsComponent = () => (<Debits accountBalance={this.state.accountBalance}  user={this.state.currentUser} debits={this.state.debits} addDebit={this.addDebit} debitTotal={this.state.debitTotal} creditTotal={this.state.creditTotal}/>)
    const CreditComponent = () => (<Credit accountBalance={this.state.accountBalance}  user={this.state.currentUser} credit={this.state.credit} addCredit={this.addCredit} debitTotal={this.state.debitTotal} creditTotal={this.state.creditTotal}/>)
    return (
      <Router>
      <div className="App">
        <Routes>
        <Route exact path = "/" element={<HomeComponent/>}/>
        {/* <Route path="/login" element={<SignIn user={this.state.currentUser} mockLogIn={this.state.mockLogIn}/>}/> */}
        <Route exact path = "/Login" element={<LogInComponent/>}/>
        <Route exact path = "/userProfile" element={<UserProfileComponent/>}/>
        <Route exact path ="/debits" element={<DebitsComponent/>} />
        <Route exact path ="/credit" element={<CreditComponent/>} />
        </Routes>
      </div>
      </Router>
    );
  }
}

export default App;
