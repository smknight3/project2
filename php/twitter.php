<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
require_once('TwitterAPIExchange.php');

$hashtag = $_GET["q"];

$settings = array(
    'oauth_access_token' => "1336858309014544388-RVgpCxyodb7KwFlzY0l1iZcjtrEn6h",
    'oauth_access_token_secret' => "pK6p7pCyFQOUaLi637Tde1I3BBBwbkmlUh0DWDF9uB1dj",
    'consumer_key' => "ZovRG3qEzHHJSwRL4y6GXlieS",
    'consumer_secret' => "fiWhvYVJtIfvMrJIgvHDnPDuWYLRuPzYZlNakq6ObaQ0dIbZ02"
);

$url = 'https://api.twitter.com/1.1/search/tweets.json';
$getfield = '?q=#'.$hashtag.' AND -filter:retweets AND -filter:replies&lang=en&count=2&tweet_mode=extended';
$requestMethod = 'GET';
$twitter = new TwitterAPIExchange($settings);
$response = $twitter->setGetfield($getfield)
     ->buildOauth($url, $requestMethod)
     ->performRequest();

echo $response;
?>