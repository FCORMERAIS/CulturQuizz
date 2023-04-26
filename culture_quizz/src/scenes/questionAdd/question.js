import React from "react";

class App extends React.Component {
    constructor(props){
        super(props) 
        this.state={
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
        this.AddQuestion = this.AddQuestion.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }



    handleChange (e) {
        const name = e.target.name
        const type = e.target.type
        if(type === "select-one" ){
            this.state.type = e.target.value
            this.state.bonneRep1 = false;
            this.state.bonneRep2 = false;
            this.state.bonneRep3 = false;
            this.state.bonneRep4 = false;
        }
        if (type === 'checkbox') {
            this.state.bonneRep1 = false;
            this.state.bonneRep2 = false;
            this.state.bonneRep3 = false;
            this.state.bonneRep4 = false;
        }
        const value = type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({
            [name] : value,
        })
    }

    AddQuestion(e) {
        let optionsChoices= [];
        if (this.state.type === "Question4choices" || this.state.type==="") {
            optionsChoices= [
                { id: 0, text: this.state.reponse1, isCorrect: this.state.bonneRep1 },
                { id: 1, text: this.state.reponse2, isCorrect: this.state.bonneRep2 },
                { id: 2, text: this.state.reponse3, isCorrect: this.state.bonneRep3 },
                { id: 3, text: this.state.reponse4, isCorrect: this.state.bonneRep4 },
              ]
            }
        else if (this.state.type === "Question3choices") {
            optionsChoices= [
                { id: 0, text: this.state.reponse1, isCorrect: this.state.bonneRep1 },
                { id: 1, text: this.state.reponse2, isCorrect: this.state.bonneRep2 },
                { id: 2, text: this.state.reponse3, isCorrect: this.state.bonneRep3 },
              ]
        }else if (this.state.type === "TrueFalse") {
            optionsChoices= [
                { id: 0, text: "Vrai", isCorrect: this.state.bonneRep1 },
                { id: 1, text: "Faux", isCorrect: this.state.bonneRep2 },
              ]
        }
        let newQuestion = {}
        if (this.state.type === "") {
            newQuestion = {type: "Question4choices", question: this.state.question, options: optionsChoices };
        }else {
            newQuestion = {type: this.state.type, question: this.state.question, options: optionsChoices };
        }
        let xhr = new XMLHttpRequest();
        xhr.open("POST","http://localhost:3000/questions",true);
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onload = function () {
            console.log("Connected");
        };
        xhr.send(JSON.stringify(newQuestion));
    }

    DisplayAnswerByType() {
        if (this.state.type === "Question3choices") {return (
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
        if (this.state.type === "TrueFalse") {
        return(<div>
            <p>vrai</p>
            <input type="checkbox" checked = {this.state.bonneRep1} onChange={this.handleChange} id="bonneRep1" name="bonneRep1"/>
            <p>faux</p>
            <input type="checkbox" checked = {this.state.bonneRep2} onChange={this.handleChange} id="bonneRep2" name="bonneRep2"/>
            </div>);
        }
        if (this.state.type === "Text") {
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
            <form name="QuestionAdd" mathod="post" className="question_form" data-netlify="true">
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

                <button type="submit" onClick={this.AddQuestion}> Envoyez </button>
            </form>
        </div>
        )
    }
}

export default App;