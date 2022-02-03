import "./app-filter.css";

const  AppFilter = (props) =>{

    const buttonsData = [
        {name:'allEmp', label:'Все сотрудники'},
        {name:'rise', label:'На повышение'},
        {name:'more1000', label:'З/П больше 1000$'},
        {name:'increase', label:'Получают премию'}
    ]

    const buttons = buttonsData.map(({name, label}) => {
        const active = props.filter === name
        const clazz = active ? 'btn-light' : 'btn-outline-light';

        return (
        <button type="button"
                className={`btn ${clazz}`}
                key={name}
                onClick={() => props.onFilterSelect(name)}>
            {label}
        </button>
        )
    })


        return (
            <div className="btn-group">
                {buttons}
            </div>
        )


}

export default AppFilter;