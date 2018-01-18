// module.exports

const builder = require('botbuilder');

let library = new builder.Library('maths');

library.dialog('sum',[
  (session, results, next) => {
    builder.Prompts.number(session, 'Tell me the first number');
  },
  (session, results, next) => {
    session.dialogData.firstNumber = results.result;
    builder.Prompts.number(session, 'Tell me the second number');
  },
  (session, results, next) => {
    session.dialogData.secondNumber = results.result;
    let sumResult = session.dialogData.firstNumber + session.dialogData.secondNumber;

    session.endDialog(`Sum result: ${sumResult}`);
  }
]);

module.exports = library;