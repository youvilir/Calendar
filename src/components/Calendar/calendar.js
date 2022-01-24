const DAYS_IN_WEEK = 7;

const DAYS_IN_MONTH = [31,28,31,30,31,30,31,31,30,31,30,31];

const Month = {
    January: 0,
    Febbruary: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10, 
    December: 11
};

export function areEqual(a, b) { // проверка на равенство даты без учета времени
    if (!a || !b) return false; // если в функцию передается одна дата, то возврат - фолс

    return(
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

export function isLeapYear(year){
    return !((year % 4) || (!(year % 100) && (year % 400)));
}

export function getDaysInMonth(date){//количество дней в месяце
    const month = date.getMonth();
    const year= date.getFullYear();
    const daysInMonth = DAYS_IN_MONTH[month];

    if(isLeapYear(year) && month === Month.Febbruary){
        
        return daysInMonth + 1;

    } else {
        return daysInMonth;
    }

}

export function getDayOfWeek(date){// получаем день недели 
    const dayOfWeek = date.getDay();

    if(dayOfWeek === 0) return 6;

    return dayOfWeek - 1;
}

export function getMonthData(year, month){
    const result = [];
    const date = new Date(year,month);
    const daysInMonth = getDaysInMonth(date);
    const monthStartsOn = getDayOfWeek(date);
    let day = 1;

    for (let i = 0; i < (daysInMonth + monthStartsOn)/ DAYS_IN_WEEK; i++) {
        result[i] = [];
 
        for (let j = 0; j < DAYS_IN_WEEK; j++) {
            if( (i === 0 && j < monthStartsOn) || day > daysInMonth){
                result[i][j] = undefined;
            } else {
                result[i][j] = new Date(year, month, day++);
            }         
        }
        
    }

    return result;
}