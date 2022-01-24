import React from 'react';
import classnames from 'classnames';

import * as calendar from './calendar';

import './index1.css';

export default class Calendar extends React.Component{

    static defaultProps = {
        date: new Date(),
        years:[2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026],
        monthNames:['Яндварь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        weekDayNames:['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
        onChange: Function.prototype //пустая функция
    };

    state = {
        date: this.props.date,
        currentDate: new Date(),
        selectedDate: null
    };

    get year(){
        return this.state.date.getFullYear();
    }
    
    get month(){
        return this.state.date.getMonth();
    }

    get day(){
        return this.state.date.getDate();
    }
    

    handlePrevMonthButtonClick = () => { //обработка месяц назад
        
        const date = new Date(this.year, this.month - 1);
        console.log(date);
        this.setState({date});
    };

    handleNextMonthButtonClick = () => { //обработка месяц вперед

        const date = new Date(this.year, this.month + 1);

        this.setState({date});
    };

    handleSelectChange = () => {
        const year = this.yearSelect.value; // получаем выбранный год из <select>
        const month = this.monthSelect.value;// получаем выбранный месяц из <select>

        const date = new Date(year, month);

        console.log(date);

        this.setState({date});
    };

    handleDayClick = date => { // обработка клика на день
        
        this.setState({selectedDate: date});

        this.props.onChange(date);
    };


    render(){
        const {years, monthNames, weekDayNames} = this.props;
        const {currentDate, selectedDate}= this.state;

        const monthData = calendar.getMonthData(this.year, this.month);
        console.log(monthData);
        return(
            <div className="calendar">
                <header>
                    <button onClick={this.handlePrevMonthButtonClick}>{'<'}</button>

                    <select ref={element => this.monthSelect = element} 
                            onClick={this.handleSelectChange}
                            value={this.month}
                            onChange={this.handleSelectChange}
                    >
                        {monthNames.map((name,index) =>
                            <option key={name} value={index}>{name}</option>
                        )}
                    </select>

                    <select ref={element => this.yearSelect = element} 
                            onClick={this.handleSelectChange}
                            value={this.year}
                            onChange={this.handleSelectChange}
                    >
                        {years.map((year) => 
                            <option key={year} value={year}>{year}</option>
                        )}
                    </select>

                    <button onClick={this.handleNextMonthButtonClick}>{'>'}</button>
                </header>

                <table>
                    <thead>
                        <tr>
                            {weekDayNames.map(name =>
                                <th key={name}>{name}</th>
                                )}
                        </tr>
                    </thead>

                    <tbody>
                        {monthData.map( (week,index) => 
                            <tr key={index} className="week">
                                {week.map((date, index) => date ?
                                    <td 
                                    key={index} 
                                    className={classnames('day', {
                                        'today': calendar.areEqual(date,currentDate),
                                        'selected': calendar.areEqual(date, selectedDate)
                                    })}
                                    onClick={() => this.handleDayClick(date)}>{date.getDate()}</td>
                                    :
                                    <td key={index} />
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        );
    }
}