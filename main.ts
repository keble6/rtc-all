let date = ""
let time = ""
let dateTime = ""
let stringIn = ""
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
serial.onDataReceived(serial.delimiters(Delimiters.CarriageReturn), function () {
    stringIn = serial.readUntil(serial.delimiters(Delimiters.CarriageReturn))
    if (stringIn.length >= 2) {
        command = stringIn.substr(0, 2)
        if (command == "st") {
            DS3231.dateTime(
            DS3231.year(),
            DS3231.month(),
            DS3231.date(),
            DS3231.day(),
            parseFloat(stringIn.substr(2, 2)),
            parseFloat(stringIn.substr(4, 2)),
            0
            )
            basic.showNumber(DS3231.hour())
            basic.showNumber(DS3231.minute())
        }
        if (command == "sd") {
            DS3231.dateTime(
            parseFloat(stringIn.substr(6, 4)),
            parseFloat(stringIn.substr(4, 2)),
            parseFloat(stringIn.substr(2, 2)),
            DS3231.day(),
            DS3231.hour(),
            DS3231.minute(),
            0
            )
            basic.showNumber(DS3231.date())
            basic.showNumber(DS3231.month())
            basic.showNumber(DS3231.year())
        }
    }
})
