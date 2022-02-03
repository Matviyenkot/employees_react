import {Component} from "react";

import './employees-list-item.css';

class  EmployeesListItem extends Component{
    constructor(props) {
        super(props);
        // this.state = {
        //   //  salary: this.props.salary
        // }
    }

    onSalaryChange = (e) =>{
        const salary = e.target.value.replace('$', '')

        this.props.salaryChange(this.props.id, salary)

        // if(this.salaryValidation(salary)){
        //     this.props.salaryChange(this.props.id, salary)
        // }
        // else{
        //     e.target.classList.add('active')
        // }
    }

    salaryValidation = (input) =>{
        // input.classList.add('active')
        // input.classList.remove('active')
        return /^(0|[1-9]\d*)$/.exec(input.target.value.replace('$', ''));
    }

    render() {

        //const {salary} = this.state
        const {name, salary, onDelete, onToggleProp, increase, rise} = this.props;

        let classNames = 'list-group-item d-flex justify-content-between';

        if(increase){
            classNames += ' increase'
        }
        if(rise){
            classNames += ' like'
        }



        return (
            <li className={classNames}>
                    <span
                        className="list-group-item-label"
                        onClick={onToggleProp} data-toggle='rise'>{name}</span>
                <input type="text"
                       onChange={this.onSalaryChange}
                       className="list-group-item-input"
                       defaultValue={salary + '$'}/>
                <div className='d-flex justify-content-center align-items-center'>
                    <button type="button"
                            className="btn-cookie btn-sm "
                            onClick={onToggleProp}
                            data-toggle='increase'>
                        <i className="fas fa-cookie"></i>
                    </button>

                    <button type="button"
                            className="btn-trash btn-sm "
                            onClick={onDelete}>
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        )}




    }

export default EmployeesListItem;