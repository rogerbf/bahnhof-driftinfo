var request = require('request');
var cheerio = require('cheerio');
var str = require('underscore.string');
var chalk = require('chalk');

request('https://www.bahnhof.se/kundservice/driftinfo', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    processBody(body);
  }
});

function processBody(body) {
	var $ = cheerio.load(body);
	var tickets = $('.list-driftinfo-open .content');
	tickets.each(function(index, element) {
		console.log(chalk.inverse($(element).find('h3').text()));
		console.log(
			str(
				$(element)
				.find('.details p')
				.text()
				.trim()
			)
			.clean()
			.value()
		);
		console.log(chalk.dim($(element).find('h4').text() + '\n'));
	});
}