import React from "react";

class App extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            question : "",
            type : "",
            bonneRep1:false,
            reponse1 : "",
            bonneRep2:false,
            reponse2 : "",
            bonneRep3:false,
            reponse3 : "",
            bonneRep4:false,
            reponse4 : ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (e) {
        const name = e.target.name
        const type = e.target.type
        const value = type === 'checkbox' ? e.target.checked : e.target.value
        if( type === "select-one" ){
            this.type = e.target.value
            this.bonneRep1 = false;
            this.bonneRep2 = false;
            this.bonneRep3 = false;
            this.bonneRep4 = false;
        }
        this.setState({
            [name] : value,
        })
    }

    DisplayAnswerByType() {
        if (this.type === "Question3choices") {return (
        <div>
            <br/>
            <div>
                <label htmlFor="reponse1">Reponse 1</label>
                <input type="text" value={this.state.reponse1} onChange={this.handleChange} id="reponse1" name="reponse1"/>
                <input type="checkbox" checked = {this.state.bonneRep1} onChange={this.handleChange} id="bonneRep1" name="bonneRep1"/>
            </div>
            <br/>
            <div>
                <label htmlFor="reponse2">Reponse 2</label>
                <input type="text" value={this.state.reponse2} onChange={this.handleChange} id="reponse2" name="reponse2"/>
                <input type="checkbox" checked = {this.state.bonneRep2} onChange={this.handleChange} id="bonneRep2" name="bonneRep2"/>
            </div>
            <br/>
            <div>
                <label htmlFor="reponse3">Reponse 3</label>
                <input type="text" value={this.state.reponse3} onChange={this.handleChange} id="reponse3" name="reponse3"/>
                <input type="checkbox" checked = {this.state.bonneRep3} onChange={this.handleChange} id="bonneRep3" name="bonneRep3"/>
            </div>
            <br/>
        </div>)
        }
        if (this.type === "TrueFalse") {
        return(<div>
            <p>vrai</p>
            <input type="checkbox" checked = {this.state.bonneRep1} onChange={this.handleChange} id="bonneRep1" name="bonneRep1"/>
            <p>faux</p>
            <input type="checkbox" checked = {this.state.bonneRep2} onChange={this.handleChange} id="bonneRep2" name="bonneRep2"/>
            </div>);
        }
        if (this.type === "Text") {
        return (<div>
            <br/>
            <label htmlFor="reponse1">Reponse : </label>
            <input type="text" value={this.state.reponse1} onChange={this.handleChange} id="reponse1" name="reponse1"/>
            <br/>
        </div>);
        }
        return (<div>
            <br/>
            <div>
                <label htmlFor="reponse1">Reponse 1 :</label>
                <input type="text" value={this.state.reponse1} onChange={this.handleChange} id="reponse1" name="reponse1"/>
                <input type="checkbox" checked = {this.state.bonneRep1} onChange={this.handleChange} id="bonneRep1" name="bonneRep1"/>
            </div>
            <br/>
            <div>
                <label htmlFor="reponse2">Reponse 2 :</label>
                <input type="text" value={this.state.reponse2} onChange={this.handleChange} id="reponse2" name="reponse2"/>
                <input type="checkbox" checked = {this.state.bonneRep2} onChange={this.handleChange} id="bonneRep2" name="bonneRep2"/>
            </div>
            <br/>
            <div>
                <label htmlFor="reponse3">Reponse 3 :</label>
                <input type="text" value={this.state.reponse3} onChange={this.handleChange} id="reponse3" name="reponse3"/>
                <input type="checkbox" checked = {this.state.bonneRep3} onChange={this.handleChange} id="bonneRep3" name="bonneRep3"/>
            </div>
            <br/>
            <div>
                <label htmlFor="reponse4">Reponse 4 :</label>
                <input type="text" value={this.state.reponse4} onChange={this.handleChange} id="reponse4" name="reponse4"/>
                <input type="checkbox" checked = {this.state.bonneRep4} onChange={this.handleChange} id="bonneRep4" name="bonneRep4"/>
            </div>
            <br/>
        </div>)
    }

    render() {
        return (<div>
            <div>
                <label htmlFor="question">Question</label>
                <input type="text" value={this.state.question} onChange={this.handleChange} id="question" name="question"/>
            </div>
            <div>
            <label htmlFor="type">Type : </label>
                <select onChange={this.handleChange}>
                    <option value="Question4choices">Question4choices</option>
                    <option value="Question3choices">Question3choices</option>
                    <option value="TrueFalse">TrueFalse</option>
                    <option value="Text">Text</option>
                </select>
            </div>
            {this.DisplayAnswerByType()}

            <input type="submit"/>
        </div>
        )
    }
}


export default App;