Handlebars.registerHelper('formatCurrency', function(value) {
    var ret,
        split;

    if (!value || isNaN(value)) return '$ 0.00';

    ret = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    split = ret.split('.');

    if (split.length < 2)
        ret += '.00';
    else {
        switch (split[1].length) {
            case 0:
                ret += '00';
                break;
            case 1:
                ret += '0'
                break;
        }
    }

    ret = '$ ' + ret;

    return ret;
});

Handlebars.registerHelper('parseDate', function(val) {
    var valid = Validator.date(val, 'yyyy-mm-dd'),
        d;

    if (!valid) return '';

    d = new Date(val);

    if (!d || !d.getMonth) return '';
    
    return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
})

Handlebars.registerHelper('parseReadableDate', function(val) {
    var valid = Validator.date(val, 'yyyy-mm-dd'),
        c = new Date(new Date().toDateString()),
        ret = '',
        d;
    
    if (!valid) return '';

    d = new Date(val);

    d.setDate(d.getDate() + 1);

    if (c.getFullYear() !== d.getFullYear())
        ret = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    // else if (c.getTime() === d.getTime())
    //     ret = 'Today';
    // else if (c.getTime() - 1000*24*60*60 >= d.getTime())
    //     ret = 'Yesterday';
    else
        ret = (d.getMonth() + 1) + '/' + d.getDate();

    return ret;

})