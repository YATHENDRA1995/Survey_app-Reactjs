import React , {Component} from 'react';

var firebase = require('firebase');
var uuid = require('uuid');

var config = {
  apiKey: "AIzaSyBYixfe28DcMBDKcAW15iw9w8qX_xjXR9s",
  authDomain: "usurvey-aba6a.firebaseapp.com",
  databaseURL: "https://usurvey-aba6a.firebaseio.com",
  projectId: "usurvey-aba6a",
  storageBucket: "usurvey-aba6a.appspot.com",
  messagingSenderId: "143994043646"
};
firebase.initializeApp(config);

class Usurvey extends Component {

  nameSubmit(event){
    var studentName = this.refs.name.value;
    this.setState({studentName:studentName},function(){
      console.log(this.state);
    });
  }

  answerSelected(event){
    var answers = this.state.answers;
    if(event.target.name === 'answer1'){
      answers.answer1 = event.target.value;
    }else if(event.target.name === 'answer2'){
      answers.answer2 = event.target.value;
    }else if(event.target.name === 'answer3'){
      answers.answer3 = event.target.value;
  }
  this.setState({answers:answers},function(){
    console.log(this.state);
  });
}

  questionSubmit(){
    firebase.database().ref('Usurvey/'+this.state.uid).set({
      studentName:this.state.studentName,
      answers:this.state.answers
    });
    this.setState({isSubmitted:true});
  }

  constructor(props){
    super(props);

    this.state = {
      uid:uuid.v1(),
      studentName:'',
      answers:{
        answer1:'',
        answer2:'',
        answer3:''
      },
      isSubmitted:false
    };
    this.nameSubmit = this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmit = this.questionSubmit.bind(this);
  }
  render(){
    var studentName;
    var questions;

    if(this.state.studentName === '' && this.state.isSubmitted === false){
      studentName = <div>
        <h2>Hey student please enter your name :</h2>
        <form onSubmit = {this.nameSubmit}>
          <input className = "namy" type = "text" placeholder = "Enter name" ref = "name" />
        </form>
      </div>;
      questions = ''
    }else if (this.state.studentName !=='' && this.state.isSubmitted === false) {
      studentName = <h3>Welcome to Usurvey {this.state.studentName}</h3>;
      questions = <div>
        <h2>Here are some questions :</h2>
        <form onSubmit = {this.questionSubmit}>
        <div className = "card">
          <label>What kind of courses you like most :</label><br />
          <input type = "radio" value = "Technology" name = "answer1" onChange = {this.answerSelected} />Technology
          <input type = "radio" value = "Design" name = "answer1" onChange = {this.answerSelected} />Design
          <input type = "radio" value = "Marketing" name = "answer1" onChange = {this.answerSelected} />Marketing
        </div>
        <div className = "card">
          <label>You are a :</label><br />
          <input type = "radio" value = "Student" name = "answer2" onChange = {this.answerSelected} />Student
          <input type = "radio" value = "Has job" name = "answer2" onChange = {this.answerSelected} />Has job
          <input type = "radio" value = "Looking job" name = "answer2" onChange = {this.answerSelected} />Looking job
        </div>
        <div className = "card">
          <label>Is online education good :</label><br />
          <input type = "radio" value = "Yes" name = "answer3" onChange = {this.answerSelected} />Yes
          <input type = "radio" value = "No" name = "answer3" onChange = {this.answerSelected} />No
          <input type = "radio" value = "Maybe" name = "answer3" onChange = {this.answerSelected} />Maybe
        </div>
        <input className = "feedback-button" type = "submit" value = "submit"/>
        </form>
      </div>
    }else if(this.state.isSubmitted === true){
      studentName = <h3>hey, Thank you {this.state.studentName} </h3>;
    }

    return(
      <div>
        <h3>Iam from Usurvey component.</h3>
        { studentName }
        -------------------------------------------------------------------------------------------------------------
        { questions }

      </div>
    );
  }
}

export default Usurvey;
