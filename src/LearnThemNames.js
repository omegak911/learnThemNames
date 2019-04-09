import React, { Component } from 'react';
import styled from 'styled-components';

class LearnThemNames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [
        {
          name: 'Angela',
          position: '-0px -450px',
        },
        {
          name: 'Calvin',
          position: '-500px -450px',
        },
        {
          name: 'Dustin',
          position: '-1000px -450px',
        },
        {
          name: 'Gaby',
          position: '-1550px -450px',
        },
        {
          name: 'James',
          position: '-0px -1250px',
        },
        {
          name: 'Jeff',
          position: '-500px -1250px',
        },
        {
          name: 'Kathleen',
          position: '-1030px -1250px',
        },
        {
          name: 'Li',
          position: '-1560px -1250px',
        },
        {
          name: 'Mark',
          position: '-50px -530px',
        },
        {
          name: 'Matthew',
          position: '-550px -530px',
        },
        {
          name: 'Matthew',
          position: '-1000px -530px',
        },
        {
          name: 'Morgan',
          position: '-1500px -530px',
        },
        {
          name: 'Ramin',
          position: '-50px -1230px',
          pronunciation: 'Raw-meen'
        },
        {
          name: 'Ufuk',
          position: '-550px -1230px',
          pronunciation: 'U-fook'
        },
        {
          name: 'Wayne',
          position: '-1000px -1230px',
        },
        {
          name: 'Wendy',
          position: '-1500px -1230px',
        }
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
    let { image1, image2, dog } = this.props;
    let { currentStudent, guess, validateGuess } = this.state;
    return (
      <div>
        <br/>
        {currentStudent ?
        <StyledColumns>
          {/* probably render image based on first letter of name and weight of letter */}
          <StyledImg style={{ backgroundImage: `url(${currentStudent.name[0].charCodeAt() < 77 ? image1 : image2})`, backgroundPosition: currentStudent.position }} alt="studentImage"/>
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
          <StyledImg style={{ backgroundImage: `url(${dog})`, backgroundSize: 'contain' }} alt="studentImage"/>
          <form action="" onSubmit={this.submitGuess}>
            <input type="text" value={guess} onChange={this.updateGuess}/>
            <button type="submit" onClick={this.submitGuess}>GUESS</button>
          </form>
          {validateGuess &&
            <div>
              {guess.toLowerCase() === 'nightwing' ? 
              <div>
                You got it!  It's Nightwing
              </div>
              :
              <div>
                I'm sad you don't know my name is Nightwing
              </div>
              }
            </div>
          }
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