import React, { Component } from 'react';
import styled from 'styled-components';
import students from './asset/students';

class LearnThemNames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: students,
      mutateStudents: [],
      currentStudent: null,
      guess: '',
      validateGuess: false,
      specialGuest: {
        name: 'pikachu',
        positionGuess: '0px 110px',
        positionSolution: '0px -210px',
      }
    }
  }

  componentDidMount() {
    this.randomizer();
  }

  randomizer = () => {
    let mutateStudents = this.state.students.slice();

    for (let i = 0; i < mutateStudents.length; i++) {
      let randomIndex = Math.floor(Math.random() * mutateStudents.length);
      let temp = mutateStudents[i];
      mutateStudents[i] = mutateStudents[randomIndex];
      mutateStudents[randomIndex] = temp;
    }

    let pickRandomIndex = Math.floor(Math.random() * mutateStudents.length);
    let currentStudent = mutateStudents.splice(pickRandomIndex, 1)[0];
    this.setState({ currentStudent, mutateStudents });
  }

  nextStudent = () => {
    let mutateStudents = this.state.mutateStudents.slice();
    let randomIndex = Math.floor(Math.random() * mutateStudents.length);
    let currentStudent = mutateStudents.splice(randomIndex, 1)[0];
    this.setState({ currentStudent, mutateStudents, guess: '', validateGuess: false });
  }

  updateGuess = (e) => {
    let guess = e.target.value;
    this.setState({ guess });
  }

  submitGuess = (e) => {
    e.preventDefault();
    this.setState({ validateGuess: true });
    let context = this;
    setTimeout(() => context.nextStudent(), 2000);
  }

  renderView = () => {

  }

  renderStudentGuessResult = () => {
    let { currentStudent, guess } = this.state;
    let guessResult;
    if (guess.toLowerCase() === currentStudent.name.toLowerCase()) {
      guessResult = (
        <div>
          You got it!  It's {currentStudent.name}
          {currentStudent.pronunciation && <p>also pronounced ({currentStudent.pronunciation})</p>}
          {currentStudent.nickname && <p>you can also say {currentStudent.nickname}</p>}
        </div>
      )
    } else {
      guessResult = (
        <div>
          I'm sad you don't know my name is {currentStudent.name}
        </div>
      )
    }
    
    return guessResult;
  }

  renderSpecialGuessResult = () => {
    let { guess, specialGuest } = this.state;
    return guess.toLowerCase() === specialGuest.name ?
      <div>
        You got it!  It's Pikachu
      </div>
      :
      <div>
        Nope, it's Pikachu
      </div>;
  }

  render() {
    let { image, pokemon } = this.props;
    let { currentStudent, guess, validateGuess, specialGuest } = this.state;
    return (
      <div>
        <br/>
        {currentStudent ?
        <StyledColumns>
          <StyledImg style={{ 
            backgroundImage: `url(${image})`, 
            backgroundPosition: currentStudent.position }} 
            alt="studentImage"
          />

          {validateGuess && <div>{this.renderStudentGuessResult()}</div>}

          <form action="" onSubmit={this.submitGuess}>
            <input type="text" value={guess} onChange={this.updateGuess}/>
            <button type="submit" onClick={this.submitGuess}>GUESS</button>
          </form>
          <br/>
          <button type="button" onClick={this.nextStudent}>NEXT</button>
        </StyledColumns>
        :
        <StyledColumns>
          <button type="button" onClick={this.randomizer}>RESET</button>
          <StyledImg style={{ 
            backgroundImage: `url(${pokemon})`, 
            backgroundSize: '165%',
            backgroundPosition: validateGuess ? specialGuest.positionSolution : specialGuest.positionGuess
            }}
            alt="studentImage"
          />

          {validateGuess && this.renderSpecialGuessResult()}
          
          <form action="" onSubmit={this.submitGuess}>
            <input type="text" value={guess} onChange={this.updateGuess}/>
            <button type="submit" onClick={this.submitGuess}>GUESS</button>
          </form>

        </StyledColumns>
        }
      </div>
    )
  }
}

const StyledColumns = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledImg = styled.div`
  background-repeat: no-repeat;
  background-size: 700%;
  height: 320px;
  width: 280px;
`

export default LearnThemNames;