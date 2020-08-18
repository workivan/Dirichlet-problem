import React, {Component} from 'react';
import DecisionServices from './DecisionServices';
import {FormErrors} from './FormErrors';
import axios from "axios"


class CreateDecision extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left_function: '',
            number_steps: '',
            right_function: '',
            down_function: '',
            up_function: '',
            formsErrors: {
                left_function: '',
                right_function: '',
                down_function: '',
                up_function: '',
                number_steps: '',
            },
            formValid: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formsErrors;
        let functions = {
            left: true, right: true, up: true, down: true, numberSteps: true
        }
        switch (fieldName) {
            case 'left_function':
                functions.left = value.match(/^\S+$/);
                fieldValidationErrors.left_function = functions.left ? '' : ' не корректная функция';
                break;
            case 'right_function':
                functions.right = value.match(/^\S+$/);
                fieldValidationErrors.right_function = functions.right ? '' : ' не корректная функция';
                break;
            case 'down_function':
                functions.down = value.match(/^\S+$/);
                fieldValidationErrors.down_function = functions.down ? '' : ' не корректная функция';
                break;
            case 'up_function':
                functions.up = value.match(/^\S+$/);
                fieldValidationErrors.up_function = functions.up ? '' : ' не корректная функция';
                break;
            case 'number_steps':
                functions.numberSteps = value > 0;
                fieldValidationErrors.password = functions.numberSteps ? '' : 'не может быть отрицательного числа';
                break;
            default:
                break;
        }
        this.setState({
            formsErrors: fieldValidationErrors,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: !this.state.formsErrors.right_function &&
                !this.state.formsErrors.left_function &&
                !this.state.formsErrors.up_function &&
                !this.state.formsErrors.down_function &&
                !this.state.formsErrors.number_steps
        });
    }

    handleCreate = () =>  {
        let decisionData =             {
                "left_function": this.state["left_function"],
                "up_function": this.state["up_function"],
                "right_function": this.state["right_function"],
                "down_function": this.state["down_function"],
                "number_steps": parseInt(this.state["number_steps"])
            };
        axios.post(DecisionServices.createDecision(),decisionData
        ).then(() => {
            this.props.updateDecisions();
            console.log("!");
        }).catch((result)=>{
            console.log(result);
        });
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => {
                this.validateField(name, value)
            });
    }

    handleSubmit(event) {
        this.handleCreate();
        event.preventDefault();
    }

    render() {
        return (
            <div className="col-md-8 order-md-1">
                <h3 className="mb-3">Новое решение</h3>
                <form className="needs-validation" noValidate onSubmit={event => this.handleSubmit(event)}>
                    <div className="col-md-3 mb-3">
                        <div className="item-name col-md-6 mb-3">
                            <label htmlFor="firstName">Функция на левой границе</label>
                        </div>
                        <div className="item-name col-md-6 mb-3">
                            <label htmlFor="firstName">Функция на верхней границе</label>
                        </div>
                        <div className="item-name col-md-6 mb-3">
                            <label htmlFor="firstName">Функция на правой границе</label>
                        </div>
                        <div className="item-name col-md-6 mb-3">
                            <label htmlFor="lastName">Функция на нижней границе</label>
                        </div>
                        <div className="item-name col-md-6 mb-3">
                            <label htmlFor="lastName">Количество шагов</label>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="col-md-6 mb-3">
                            <input type="text" onChange={this.handleUserInput} name="left_function"
                                   className="form-control"
                                   value={this.state.left_function} required/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <input type="text" onChange={this.handleUserInput} name="up_function"
                                   className="form-control"
                                   value={this.state.up_function} required/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <input type="text" onChange={this.handleUserInput} name="right_function"
                                   className="form-control"
                                   value={this.state.right_function} required/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <input type="text" onChange={this.handleUserInput} name="down_function"
                                   className="form-control"
                                   value={this.state.down_function} required/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <input type="text" onChange={this.handleUserInput} name="number_steps"
                                   className="form-control"
                                   value={this.state.number_steps} required/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <button className="button1 button" disabled={!this.state.formValid} type="submit">
                                <span>Решить</span></button>
                        </div>
                        <div className="panel panel-default">
                            <FormErrors formErrors={this.state.formsErrors}/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateDecision;