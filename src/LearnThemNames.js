import React, { Component } from 'react';
import styled from 'styled-components';


class LearnThemNames extends Component {
  constructor(props) {
    super(props);
    this.state = {
           students: [
        {
          name: 'Aqil',
          position: '-120px -70px',
          pronunciation: 'ah-keel'
        },
        {
          name: 'Bryan',
          position: '-460px -70px',
        },
        {
          name: 'Bryant',
          position: '-810px -70px',
        },
        {
          name: 'Caroline',
          position: '-1140px -70px',
        },
        {
          name: 'Eugenia',
          position: '-120px -500px',
          pronunciation: 'you-genie-uh'
        },
        {
          name: 'Gabriella',
          position: '-1190px -1460px',
          nickname: 'Gaby'
        },
        {
          name: 'Jennifer',
          position: '-810px -1460px',
        },
        {
          name: 'Jun',
          position: '-480px -500px',
          pronunciation: 'jyun'
        },
        {
          name: 'Justin',
          position: '-810px -500px',
        },
        {
          name: 'Kweon',
          position: '-120px -1000px',
          pronunciation: 'kwon',
          nickname: 'Michael'
        },
        {
          name: 'Mali',
          position: '-1150px -500px',
        },
        {
          name: 'Mina',
          position: '-460px -1000px',
          pronunciation: 'mee-na'
        },
        {
          name: 'Scott',
          position: '-810px -1000px',
        },
        {
          name: 'Steven',
          position: '-1170px -1000px',
        },
        {
          name: 'Taylor',
          position: '-120px -1460px',
        },
        {
          name: 'Xialin',
          position: '-460px -1460px',
          pronunciation: 'sha-lin'
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