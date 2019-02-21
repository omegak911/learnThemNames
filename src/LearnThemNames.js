import React, { Component } from 'react';
import styled from 'styled-components';

class LearnThemNames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [
        {
          name: 'Wendy',
          position: '-690px -450px',
        },
        {
          name: 'Gaby',
          position: '-1210px -450px',
        },
        {
          name: 'Nate',
          position: '-1670px -450px',
        },
        {
          name: 'Jeff',
          position: '-270px -1050px',
        },
        {
          name: 'Anne',
          position: '-710px -1050px',
        },
        {
          name: 'Albert',
          position: '-1215px -1050px',
        },
        {
          name: 'Uttej',
          position: '-1695px -1050px',
          pronunciation: 'u-tej'
        },
        {
          name: 'Liezel',
          position: '-2140px -1050px',
          pronunciation: 'liz-elle'
        },
        {
          name: 'Justin',
          position: '-250px -1630px',
        },
        {
          name: 'Fred',
          position: '-690px -1630px',
        },
        {
          name: 'Anthony',
          position: '-1215px -1630px',
        },
        {
          name: 'Jeff',
          position: '-1715px -1630px',
        },
        {
          name: 'Charlie',
          position: '-2160px -1630px',
        },
        {
          name: 'Jesse',
          position: '-240px -2160px',
        },
        {
          name: 'Daniel',
          position: '-670px -2160px',
        },
        {
          name: 'Harrison',
          position: '-1215px -2160px',
        },
        {
          name: 'Adam',
          position: '-1725px -2205px',
        },
        {
          name: 'Matt',
          position: '-2155px -2205px',
        },
        {
          name: 'Calvin',
          position: '-670px -2715px',
        },
        {
          name: 'Tracy',
          position: '-1220px -2790px',
        },
        {
          name: 'Celia',
          position: '-1720px -2790px',
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
  background-size: 900%;
  height: 320px;
  width: 280px;
`

export default LearnThemNames;