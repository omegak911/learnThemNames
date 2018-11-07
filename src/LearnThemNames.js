import React, { Component } from 'react';
import styled from 'styled-components';


class LearnThemNames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [
        {
          name: 'Alex',
          position: '-190px -180px'
        },
        {
          name: 'Andrew',
          position: '-500px -180px'
        },
        {
          name: 'Daniel',
          position: '-830px -180px'
        },
        {
          name: 'Dustin',
          position: '-1160px -200px'
        },
        {
          name: 'Edwin',
          position: '-190px -620px'
        },
        {
          name: 'Iris',
          position: '-510px -620px'
        },
        {
          name: 'Jay',
          position: '-820px -620px'
        },
        {
          name: 'JingJing',
          position: '-1160px -640px',
          nickname: 'JJ'
        },
        {
          name: 'Jonathan',
          position: '-170px -1060px'
        },
        {
          name: 'Mali',
          position: '-500px -1060px'
        },
        {
          name: 'Martin',
          position: '-830px -1060px'
        },
        {
          name: 'Mitch',
          position: '-1170px -1100px'
        },
        {
          name: 'Sasha',
          position: '-150px -1500px'
        },
        {
          name: 'Scott',
          position: '-490px -1500px'
        },
        {
          name: 'Sris',
          position: '-830px -1500px',
          pronunciation: 'sir-iss'
        },
        {
          name: 'Tommy',
          position: '-1170px -1500px'
        },
      ],
      mutateStudents: [],
      currentStudent: null,
      guess: '',
      validateGuess: false,
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

  render() {
    let { image } = this.props;
    let { currentStudent, guess, validateGuess } = this.state;
    return (
      <div>
        <br/>
        {currentStudent ?
        <StyledColumns>
          <StyledImg style={{ backgroundImage: `url(${image})`, backgroundPosition: currentStudent.position }} alt="studentImage"/>
          {validateGuess &&
          <div>
            {guess.toLowerCase() === currentStudent.name.toLowerCase() ? 
            <div>
              You got it!  It's {currentStudent.name}
              {currentStudent.pronunciation && <p>also pronounced ({currentStudent.pronunciation})</p>}
              {currentStudent.nickname && <p>you can also say {currentStudent.nickname}</p>}
            </div>
            :
            <div>
              I'm sad you don't know my name is {currentStudent.name}
            </div>
            }
          </div>
          }
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
  background-size: 1500px;
  height: 200px;
  width: 180px;
`

export default LearnThemNames;