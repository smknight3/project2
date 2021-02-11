const HOSTED_URL = {
    queryTwitter: 'http://0.0.0.0:8000?q=',
};
const LOCAL_URL = {
    queryTwitter: 'http://0.0.0.0:8000?q=',
};

let urls

$(".btn-search").click(function() {
    twitterStuff();
});

function init() {
    if (window.location.hostname == 'localhost') {
        urls = LOCAL_URL;
    } else {
        urls = HOSTED_URL;
    }
}

function twitterStuff() {
    $('#tweet-list').addClass('d-none');
    $('#positive').empty();
    $('#neutral').empty();
    $('#negative ').empty();
    $('#chartContainer').empty();
    $('.spinner-border').removeClass('d-none');

    getTwitterHashTagData($("#tag-input").val(), processTwitterData);
}

function parseDate(str) {
    var v = str.split(' ');
    return new Date(Date.parse(v[1] + " " + v[2] + ", " + v[5] + " " + v[3] + " UTC"));
}



function processTwitterData(tweets) {
    const twitterData = [];
    $.each(tweets, function(index, tweet) {
        const tweet_text = tweet.full_text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
        const created = parseDate(tweet.created_at);
        const createdDate = created.getDate() + '-' + (created.getMonth() + 1) + '-' + created.getFullYear() + ' at ' + created.getHours() + ':' + created.getMinutes();
        const tweet_user = tweet.user["screen_name"];
        const tweet_likes = String(tweet.favorite_count);
        const tweet_userfol = String(tweet.user["followers_count"]);
        twitterData.push({
            tweet: tweet_text,
            user: tweet_user,
            date: createdDate,
            likes: tweet_likes,
            followers: tweet_userfol
        });
    });
    console.log(twitterData);
    $('.spinner-border').addClass('d-none');
    displayTweets(twitterData);
    $('#tweet-list').removeClass('d-none');
}


function loadLatestTweet() {
    $.getJSON(url, function(data) {
        var tweet = data[0].text;
        var created = parseDate(data[0].created_at);
        var createdDate = created.getDate() + '-' + (created.getMonth() + 1) + '-' + created.getFullYear() + ' at ' + created.getHours() + ':' + created.getMinutes();
        tweet = tweet.parseURL().parseUsername().parseHashtag();
        tweet += '<div class="tweeter-info"><div class="uppercase bold"><a href="https://twitter.com/#!/CypressNorth" target="_blank" class="black">@CypressNorth</a></div><div class="right"><a href="https://twitter.com/#!/CypressNorth/status/' + data[0].id_str + '">' + createdDate + '</a></div></div>'
        $("#twitter-feed").html('<p>' + tweet + '</p>');
    });
}

function getTwitterHashTagData(query, callback) {
    $.getJSON(urls.queryTwitter + query, function(result) {
        console.log(result);
        if (result !== null && result.statuses !== null) {
            callback(result.statuses);
        }
    });
}

function displayTweets(twitterData) {
    var tbl = document.createElement('table');
    var tr = tbl.insertRow();

    for (var i = 0; i < twitterData.length; i++) {
        var tr = tbl.insertRow();
        for (var j in twitterData[i]) {

            var td = tr.insertCell();
            var text = twitterData[i][j];
            td.appendChild(document.createTextNode(text));

        }
    }
    tbl.setAttribute('class', 'tweet-table')
    $('#positive').append(tbl);
}


init();