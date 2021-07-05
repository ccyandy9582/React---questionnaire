import './App.css';
import React from 'react'
// import Pubsub from 'pubsub'

// const pubsub = Pubsub.create()

class Questionnire extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {toAnswer:questions.length}
  }
  answerHandler = (ans) => {
    this.setState({toAnswer:ans})
  }
  render() {
    return (
      <div>
        <QuesTitle toAnswer={this.state.toAnswer}/>
        <DynamicQuesList questions={questions} answerHandler={this.answerHandler}/>
      </div>
    )
  }
}

class QuesTitle extends React.Component {
  render() {
    return (
      <div>
        <h1>Questionnire</h1>
        <small>remain {this.props.toAnswer} questions</small>
      </div>
    )
  }
}

class QuesItem extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {option: ''}
  }
  onChange = (option) => {
    if (this.state.option==='')
      this.props.handleAnswer()

    this.setState({option: option})
  }
  generateOpts() {
    const self = this
    return (
      this.props.options.map((option, i) => {
        return (
          <label key={"option"+i}>
            <RadioInput 
              key={'opt'+i}
              option={option}
              checked={self.state.option===option}
              onChange={self.onChange}
            /><br/>
          </label>
          
        )
      })
    )
  }
  render() {
    return (
      <div>
        <li>{this.props.question}</li>
        {this.generateOpts()}
        <br />
      </div>
    )
  }
}

var questions = [
  {
    question: 'Gender',
    options: ['Male', 'Female']
  },
  {
    question: 'Age',
    options: ['Under 18', '18 - 25', '26 - 35', 'Over 35']
  },
  {
    question: 'Marital Status',
    options: ['Single', 'Married', 'Other']
  }
]
class DynamicQuesList extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {answered: 0}
  }
  handleAnswer = () => {
    var newAnswer = this.state.answered+1,
        toAnswer = this.props.questions.length - newAnswer

    this.setState({answered: newAnswer})
    this.props.handleAnswer(toAnswer)
  }
  render() {
    const self = this
    var quesItem = this.props.questions.map((quesInfo, i) => {
      return (
        <QuesItem 
          key={i}
          question={quesInfo.question}
          options={quesInfo.options}
          handleAnswer={self.handleAnswer}
        />
      )
    })
    return (
      <div>
        <hr />
        <p>please fill all the questions</p>
        {quesItem}
      </div>
    )
  }
}

//using callback to communication from sun to parent
class RadioInput extends React.Component {
  constructor(props, context) {
    super(props, context)
  }
  onChange = (event) => {
    if (event.target.checked)
      this.props.onChange(this.props.option)
  }
  render() {
    return (
      <label>
        <input 
          type='radio'
          onChange={this.onChange}
        /> {this.props.option}
      </label>
    )
  }
}

// class MessageBox extends React.Component {
//   constructor(props, context) {
//     super(props, context)
//     this.state = {messages: []}
//   }
//   componentDidMount() {
//     const self = this
//     this.token = pubsub.subscribe('addMsg', (context, msg)=>{
//       self.state.messgae.push(msg)
//       self.setState({messages: self.state.messages})
//     })
//   }
//   componentWillUnmount() {
//     pubsub.unsubscribe(this.token)
//   }
//   render() {
//     const msgField = this.state.messages.map((msg, i)=>{
//       return <p key={'msg'+i}>{msg}</p>
//     })
//     return (
//       <div>
//         <div>{msgField}</div>
//         <p>please enter a message</p>
//         <Message />
//       </div>
//     )
//   }
// }

// class Message extends React.Component {
//   constructor(props, context) {
//     super(props, context)
//     this.state = {messages: ''}
//   }
//   onChange = (event) => {
//     this.setState({messages: event.target.value})
//   }
//   onSubmit = (event) => {
//     event.preventDefault()
//     pubsub.publish('addMsg', null, this.state.messages)
//   }
//   render() {
//     return (
//       <div>
//         <form onSubmit={this.onSubmit}>
//           <input value={this.state.messages} onChange={this.value.onChange}/>
//           <input type='submit' value='Enter'/>
//         </form>
//       </div>
//     )
//   }
// }

function App() {
  return (
    <div style={{margin: 10+'%'}}>
      <Questionnire />
      {/* <MessageBox /> */}
    </div>
  )
}

export default App;
