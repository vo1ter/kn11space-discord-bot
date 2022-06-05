const moment = require('moment')
console.log(moment().locale("uk").add("1", "d").format('dddd'))