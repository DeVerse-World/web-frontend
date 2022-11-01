import { TimeFilter } from "../data/enum/time_filter";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function timeStampToString(timestamp: number) {
    const day = new Date(timestamp);
    return getDateString(day);
}

export function getDateString(date: Date) {
    let month = (date.getMonth() + 1).toString();
    if (month.length == 1) {
        month = `0${month}`
    }
    let day = date.getDate().toString();
    if (day.length == 1) {
        day = `0${day}`
    }
    return `${month}\/${day}\/${date.getFullYear()}`;
}

export function getTimeString(date: Date) {
    // let minute = date.getMinutes();
    // if (minute.toString().length == 1) {
    //     minute = `0${minute}`
    // }
    // let hour = date.getHours();
    // if (hour.toString().length == 1) {
    //     hour = `0${hour}`
    // }
    let month = (date.getMonth() + 1).toString();
    if (month.length == 1) {
        month = `0${month}`
    }
    let day = date.getDate().toString();
    if (day.length == 1) {
        day = `0${day}`
    }
    return `${month}\/${day}\/${date.getFullYear()}`;
}

export function getDateLabel() {

}

export function timestampToLabel(timestamp: number, filterType: TimeFilter) {
    let date = new Date(timestamp);
    let res;
    switch (filterType) {
        case TimeFilter.HOUR:
            res = date.getHours();
            break;
        case TimeFilter.DAY:
            res = date.getDate();
            break;
        case TimeFilter.WEEK:

            break;
        case TimeFilter.MONTH:
            res = months[date.getMonth()];
            break;
        case TimeFilter.YEAR:
            res = date.getFullYear();
            break;
        default:
            break;
    }
    return res;
}