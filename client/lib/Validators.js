window.Validator = {

    date: function (value, userFormat) {
        var userFormat,
            delimiter,
            theFormat,
            theDate;

        if (typeof value === 'undefined') return false;

        userFormat = userFormat || 'mm/dd/yyyy',
        delimiter = /[^mdy]/.exec(userFormat)[0],
        theFormat = userFormat.split(delimiter),
        theDate = value.split(delimiter),

            isDate = function (date, format) {
                var m, d, y
                for (var i = 0, len = format.length; i < len; i++) {
                    if (/m/.test(format[i])) m = date[i]
                    if (/d/.test(format[i])) d = date[i]
                    if (/y/.test(format[i])) y = date[i]
                }
                return (
                    m > 0 && m < 13 &&
                    y && y.length === 4 &&
                    d > 0 && d <= (new Date(y, m, 0)).getDate()
                )
            }

        return isDate(theDate, theFormat);

    }
}