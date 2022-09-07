// Your code here
const createEmployeeRecord = (array) => {
    const object = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return object;
}


const createEmployeeRecords = (arraysOfArrays) => {
    let newArray = [];
    for (const a of arraysOfArrays) {
        const object = {
            firstName: a[0],
            familyName: a[1],
            title: a[2],
            payPerHour: a[3],
            timeInEvents: [],
            timeOutEvents: [],
        }
        newArray.push(object);
    }
    return newArray;
}

const createTimeInEvent = (record, date) => {
    let newArray = record.timeInEvents;
    const obj = {
        type: 'TimeIn',
        hour: Number(date.split(' ')[1]),
        date: date.split(' ')[0],
    };
    newArray.push(obj);
    record.timeInEvents = newArray;
    return record;
}

const createTimeOutEvent = (record, date) => {
    let newArray = record.timeOutEvents;
    const obj = {
        type: 'TimeOut',
        hour: Number(date.split(' ')[1]),
        date: date.split(' ')[0],
    };
    newArray.push(obj);
    record.timeOutEvents = newArray;
    return record;
}

const hoursWorkedOnDate = (record, date) => {
    const timedOutEvent = record.timeOutEvents;
    const timedInEvent = record.timeInEvents;
    const currentDate = new Date(date).getDate();
    let timeIn
    let timeOut
    for (const a of timedInEvent) {
        if (Number(a.date.split('-')[2]) === currentDate) {
            timeIn = Number(a.hour.toString().split('0')[0])
        }
    }
    for (const a of timedOutEvent) {
        if (Number(a.date.split('-')[2]) === currentDate) {
            timeOut = Number(a.hour.toString().split('0')[0])
        }
    }
    return timeOut - timeIn;
}

const wagesEarnedOnDate = (record, date) => {
    const hoursWorked = hoursWorkedOnDate(record, date);
    return hoursWorked * record.payPerHour;
}

const allWagesFor = (record) => {
      let forAllDates = 0;
      for(const a of record.timeInEvents){
        forAllDates += wagesEarnedOnDate(record, a.date);
      }
      return forAllDates;
}

const calculatePayroll = (employees) => {
    let payRoll = 0;
    for (const a of employees) {
        payRoll += allWagesFor(a);
    };
    return payRoll;
}