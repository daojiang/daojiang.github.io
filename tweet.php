<?php 				
/* Simple PHP Wrapper for Twitter API v1.1 calls
https://github.com/J7mbo/twitter-api-php
-------------------------*/
require_once('TwitterAPIExchange.php');

$settings = array(
	'oauth_access_token' => "1512612433-Wo1YELqvWm3zhyoMT5csHpuPp9PcBc0yqPAXYdK",
	'oauth_access_token_secret' => "VmzYRIUHQoiam6m6wBFHY2rOzc6pAax0a8flqGPXf8g",
	'consumer_key' => "pyhsdzvE11IVTwmlJTvWvQ",
	'consumer_secret' => "YTXTiziSPTJw9Hc91uLYkxBcQio51yjiPJyhYkg5J0c"
);

// https://dev.twitter.com/docs/api/1.1/get/statuses/user_timeline
$screenname = "envato"; // The screen name of the user for whom to return results for.
$count = 2; // Specifies the number of tweets to try and retrieve, up to a maximum of 200 per distinct request

$url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
$getfield = '?screen_name='.$screenname.'&count='.$count;
$requestMethod = 'GET';

$twitter = new TwitterAPIExchange($settings);
$response = $twitter->setGetfield($getfield)
                    ->buildOauth($url, $requestMethod)
                    ->performRequest();

// http://www.johnbhartley.com/2013/twitter-feed-with-php-and-json-v1-1/
$decode = json_decode($response, true); //getting the file content as array
 
// Show Slideshow if you want to retrieve more than one tweet ($count is at least 2)
if ($count > 1) {
	echo '<ul class="slideshow-fade list-unstyled">';
}
else {
	echo '<ul class="list-unstyled">';
}
foreach ($decode as $tweet) {
  $tweet_text = $tweet["text"]; //get the tweet
  
  // http://saturnboy.com/2010/02/parsing-twitter-with-regexp/
  // Parse links: "http", "https"
	$tweet_text = preg_replace(
  '@(http?://([-\w\.]+)+(/([\w/_\.]*(\?\S+)?(#\S+)?)?)?)@',
   '<a href="$1">$1</a>',
  $tweet_text);
	
	// Parse usernames: "@"    
	$tweet_text = preg_replace(
  '/@(\w+)/',
  '<a href="http://twitter.com/$1">@$1</a>',
  $tweet_text);
	    
	// Parse hashtags: "#"
	$tweet_text = preg_replace(
  '/\s+#(\w+)/',
  ' <a href="http://twitter.com/search?q=%23$1">#$1</a>',
  $tweet_text);

  // display each tweet in a list item
  echo "<li>" . $tweet_text . "</li>";
} 
echo '</ul>';				
?>