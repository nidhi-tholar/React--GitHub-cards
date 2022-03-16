// const App = ({title}) =>(
// <div>{title}</div>
// )

import React from "react";
import axios from 'axios';


// const testData = [
//   {name:"Nidhi", company:"EY"},
//   {name:"John", company:"Google"}
// ];

const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}

    {/* {testData.map(profile => <Card {...profile}/>)} */}

    {/* <Card {...testData[0]}/>
    <Card {...testData[1]}/> */}

  </div>
)

class Card extends React.Component{
  render(){
    const profile = this.props;
    return (
      <div>
        <img src={profile.avatar_url}/>
        <div>
          <div style={{fontSize:'42px'}}>{profile.name}</div>
          <div>{profile.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component{

  // userNameInput = React.createRef(); //not using Ref
  state = {userName:''};
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`); //axios.get returns a promise
    this.props.onSubmit(resp.data);
    this.setState({userName:''});
  };

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <input type="text" placeholder="Github username" ref={this.userNameInput} required></input> */}
        <input type="text" placeholder="Github username" value={this.state.userName} onChange={event => this.setState({userName:event.target.value})} required></input>
        <button>Add Card</button>
      </form>
    );
  }
}

class App extends React.Component{
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     profiles: testData
  //   };
  // }

  state = {
    profiles:[]
  };

  addNewProfile = (profileData) => {
    console.log('App', profileData)
    this.setState(prevState=>({
      profiles:[...prevState.profiles, profileData]
    }));
  }

  render(){
    return (
    <div>
      <div>{this.props.title}</div>
      <Form onSubmit={this.addNewProfile}/>
      <CardList profiles={this.state.profiles}/>
    </div>
    );
  }
}

export default App;

