import {Component} from "react";

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import dataJSON from '../../data.json'


import './app.css';


class WhoAmI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            years:27,
            position: ''
        }
    }

    nextYear = () => {
        this.setState(state => ({
            years:  state.years +1
        }))
    }

    prevYear = () => {
        this.setState(state => ({
            years:  state.years -1
        }))
    }

    commitInputChanges = (e) =>{
        console.log(e.target.value)
        this.setState({
            position: e.target.value
        })
    }


    render(){
        const {name, surname, link} = this.props;
        const {position, years} = this.state;
        return(
            <div>
                <button onClick={this.nextYear}>+++</button>
                <button onClick={this.prevYear}>---</button>
                <h1>My Name is {name}, surname - {surname}, age - {years}, duty - {position}</h1>
                <a href={link}>My Profile</a>
                <form>
                    <span>Enter Duty</span>
                    <input onChange={this.commitInputChanges}/>
                </form>
            </div>
        )
    }

}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : dataJSON,
            //     [
            //     {name: 'John Smith', salary: 800, increase: true, id:1, rise: false},
            //     {name: 'Alex Clay', salary: 1000, increase: false, id:2, rise: false},
            //     {name: 'Conor Dre', salary: 1200, increase: true, id:3, rise: false}
            // ],
            term: '',
            filter: 'allEmp'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) =>{
            return{
                data: data.filter(elem => elem.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            id: this.maxId++,
            rise: false
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem]
            return{
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) =>{
        this.setState(({data}) =>({
            data: data.map(item => {
                if(item.id === id){
                    return{...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    salaryChange = (id, salary) =>{
        this.setState(({data}) =>{
            return {
                data: data.map(item => {
                    if (item.id === id) {
                        return {...item, salary: +salary}
                    }
                    return item;
                })
            }

        })
    }

    onSetSalaryFromInput = (getSalary, getId) => {
        /*console.log('onSetSalaryFromInput')
        console.log('getSalary', getSalary)
        console.log('getId', getId)*/



        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === getId) {
                    return {...item, id: getId, salary: +getSalary}
                }
                return item
            })
        }))
    }


    searchEmp = (items, term) =>{
        if(term.length === 0){
            return items;
        }

        return items.filter(item =>{
            const lowerName = item.name.toLowerCase();
            return lowerName.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) =>{
        this.setState({term});
    }

    filterPost = (items, filter) => {

        switch (filter){
            case ('rise'):
                return items.filter(item => item.rise)
            case ('more1000'):
                return items.filter(item => item.salary >1000)
            case ('increase'):
                return items.filter(item => item.increase)
            default:
                return items
        }

    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }


    render(){
        const {term, data, filter} = this.state;
        const increased = this.state.data.filter(elem => elem.increase).length;
        const employees = this.state.data.length;

        let visibleData = this.filterPost(this.searchEmp(data, term), filter);


        return (
            <div className="app">
                {/*<WhoAmI name='John' surname='Smith' link='facebook.com'/>*/}
                {/*<WhoAmI name='Alexius' surname='Leroy' link='instagram.com'/>*/}


                <AppInfo
                    increased={increased}
                    employees={employees}/>

                <div className="search-panel">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter
                        onFilterSelect={this.onFilterSelect}
                        filter={filter}/>
                </div>

                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    salaryChange={this.salaryChange}
                />
                <EmployeesAddForm
                    addItem={this.addItem}/>
            </div>
        );
    }


}

export default App;
