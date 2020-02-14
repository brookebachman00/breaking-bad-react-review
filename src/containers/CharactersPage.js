import React, {Component} from 'react'
import Characters from '../containers/Characters.js'
import FavCharacters from '../containers/FavCharacters.js'


// https://www.breakingbadapi.com/api/characters


class CharactersPage extends Component {

    state = {
        characters: [],
        favCharacters: [],
        character: null
    }

    componentDidMount() {
        fetch('https://www.breakingbadapi.com/api/characters')
            .then(resp => resp.json())
            .then(characters => this.setState({characters: characters}))
    }

    addToFavorites = (char) => {
        this.setState(prevState => ({
            favCharacters: [...prevState.favCharacters, char]
        }))
    }

    handleCharacterClick = (char) => {
        console.log(char)
        this.setState({
            character: char
        })
    }

    removeChar = () => {
        this.setState({
            character: null
        })
    }

    removeFromFavorites = (character) => {
       const updatedFavs = this.state.favCharacters.filter(char => char !== character)
       this.setState({
           favCharacters: updatedFavs
       })
    }
    

    render() {
        const {characters, favCharacters, character} = this.state
        return (
            <div>
                <FavCharacters characters={favCharacters} handleCharClick={this.removeFromFavorites} />
                <Characters characters={characters} char={character} addToFavorites={this.addToFavorites} handleCharClick={this.handleCharacterClick} removeChar={this.removeChar}/>
            </div>
        )
    }
}

export default CharactersPage