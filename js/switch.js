function CoffeeMachine(power)
{
	this.waterAmount = 0;
 // расчёт времени для кипячения
	function getBoilTime() {
    	return 1000; // точная формула расчета будет позже
  }

  // что делать по окончании процесса
  function onReady() {
    console.log('Кофе готово!')
  }

  this.run = function() {
    // setTimeout - встроенная функция,
    // она запустит onReady через getBoilTime() миллисекунд
    setTimeout(onReady, getBoilTime());
  };
}

var coffeeMachine = new CoffeeMachine(100);
coffeeMachine.waterAmount = 200;

coffeeMachine.run();


/*
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Введите  ', (answer) => {
  // TODO: Log the answer in a database
  console.log('Thank you for your valuable feedback:', answer);

  rl.close();
});*/