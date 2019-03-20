require('dotenv').config();
const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN, );
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const apiRequests = require('./apiRequests');

bot.start((ctx) => {
    ctx.reply('Welcome to the Hackalist bot !');
    ctx.reply('Search by : /month + month number of hackathon')
});

bot.command('month', (ctx) => {
    let parameter = ctx.message.text.replace('/month ', '');

    apiRequests.getMonthData(parameter)
        .then(data => {
            let results = data[monthNames[normalizeMonthNumber(parameter) - 1]];
            results.forEach(element => {
                ctx.reply(
                    "Event : " + element.title + 
                    "\nDates : " + element.startDate + " - " + element.endDate +
                    "\nCity : " + element.city +
                    "\nCost : " + element.cost +
                    "\nURL : " + element.url
                );
            });
            if (results.length === 0)
                ctx.reply("No hackathons found for this month !")
        })
        .catch((reason) => {
            ctx.reply("Invalid parameter\nUse /help if you need some ;)");
            //console.log(reason)
        });
    }
);

bot.help((ctx) => ctx.reply('Example : "/month 04" will get you the hackathons in april'));
  
bot.launch();
