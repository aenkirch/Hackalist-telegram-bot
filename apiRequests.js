const request = require('request-promise');
const baseUrl = 'https://raw.githubusercontent.com/Hackalist/Hackalist.github.io/master/api/1.0/';

normalizeMonthNumber = (x) => {
    if (x < 10)
        return x.replace('0', '');
    return x;
}

module.exports = {
    getMonthData: (param) => {
        return request.get({
            uri: baseUrl + new Date().getFullYear() + '/' + param + '.json',
            json: true
        })
    }
}