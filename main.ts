let date = ""
let time = ""
let dateTime = ""
let stringIn = ""
let month = ""
let year = ""
let minute = ""
let hour = ""
let command = ""
function readTime () {
    date = "" + DS3231.date() + "/" + DS3231.month() + "/" + DS3231.year()
    time = "" + DS3231.hour() + ":" + DS3231.minute() + ":" + DS3231.second()
    dateTime = "" + date + " " + time
}
input.onButtonPressed(Button.A, function () {
    readTime()
    basic.showString(dateTime)
    serial.writeLine(dateTime)
})
function setDate () {
    // the first 2 characters after command
    date = stringIn.substr(2, 2)
    // the next 2 characters
    month = stringIn.substr(4, 2)
    // the last 4 characters
    year = stringIn.substr(6, 4)
    DS3231.dateTime(
    parseFloat(year),
    parseFloat(month),
    parseFloat(date),
    DS3231.day(),
    DS3231.hour(),
    DS3231.minute(),
    0
    )
    basic.showNumber(DS3231.date())
    basic.showNumber(DS3231.month())
    basic.showNumber(DS3231.year())
}
function setTime () {
    // the first 2 characters after command
    minute = stringIn.substr(2, 2)
    // the next 2 characters command
    hour = stringIn.substr(4, 2)
    DS3231.dateTime(
    DS3231.year(),
    DS3231.month(),
    DS3231.date(),
    DS3231.day(),
    parseFloat(hour),
    parseFloat(minute),
    0
    )
    basic.showNumber(DS3231.hour())
    basic.showNumber(DS3231.minute())
}
serial.onDataReceived(serial.delimiters(Delimiters.CarriageReturn), function () {
    stringIn = serial.readUntil(serial.delimiters(Delimiters.CarriageReturn))
    command = stringIn.substr(0, 2)
    if (command == "st") {
        setTime()
    }
    if (command == "sd") {
        setDate()
    }
})
