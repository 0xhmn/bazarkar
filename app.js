/**
 * read the last 10 tweets // by default it reads 15 tweets
 * query limit in twitter for search: 180 queries per 15 minute 
 */

var Twitter = require("twit");
    
var T = new Twitter( {
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: ''
});

var last_ten_ids = [];
var base_array =[];

// making the first set of ids
get_last_ten_id();	

function main() {
	retweet();
}

function get_last_ten_id() {
	base_array = last_ten_ids.slice();
	T.get('search/tweets', {q: 'javascript', count: 10}, function(error, tweets, response){	
		if (!error) {
			for (var i = 0; i < 10; i++) {			
				last_ten_ids[i]= tweets.statuses[i].id_str;
			}
		} else {
			console.log(error);
		}
	});
}

var count = 0;
function retweet() {	
	
	for (var i = 0 ; i < 10; i ++) {
		for (var j = 0 ; j < 10; j++) {
			if (last_ten_ids[i] === base_array[j]) {
				count++;
			}
		}
		if (count == 0) {	// means the tweet is new -> has not been retweeted yet
			console.log(last_ten_ids[i] + ' is a new tweet id');
//			get_tweet_by_id(last_ten_ids[i]);
			retweet_by_id(last_ten_ids[i]);
		} else {
			// todo:
		}
		count = 0;
	}
	get_last_ten_id();
}

function retweet_by_id(id_num) {
	T.post('statuses/retweet/:id', { id: id_num }, function (err, tweet, response) {
		if (!err) {
	 		console.log(tweet.text);
		} else {
			console.log(err);
		}
	});
}

function get_tweet_by_id(id_num) {
	T.get('statuses/show/:id', { id: id_num }, function(err, tweet, response) {
	  console.log(tweet.text);
	});
}

function check_identical_array(arr1, arr2) {
	if(arr1.length !== arr2.length) return false;
	for (var i = 0 ; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;
}

setInterval(main, 20000);
