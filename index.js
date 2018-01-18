const restify = require('restify');
const builder = require('botbuilder');

const libraries = require('./dialogs');

// Setup Restify Server
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

//=========================================================
// Bot Setup
//=========================================================
  
// Create chat bot
let connector = new builder.ChatConnector({
    appId: process.env.APP_ID,
    appPassword: process.env.APP_PASSWORD
});
let bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// add libraries
for(let libName in libraries) {
  console.log(libName);
  bot.library(libraries[libName]);
}

// root dialog
bot.dialog('/', [
  (session, results, next) => {
    builder.Prompts.choice(session, ['maths', 'other'], ['maths', 'other']);
  },
  (session, results, next) => {
    console.log(results.result);
  }

])