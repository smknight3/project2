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
    $('#negative').empty();
    $('#chartContainer').empty();
    $('.spinner-border').removeClass('d-none');

    getTwitterHashTagData($("#tag-input").val(), processTwitterData);
}

function processTwitterData(tweets) {
    const twitterData = [];
    $.each(tweets, function(index, tweet) {
        const tweet_text = tweet.full_text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
        twitterData.push({
            tweet: tweet_text
        });
    });
    console.log(twitterData);
    $('.spinner-border').addClass('d-none');
    displayTweets(twitterData);
    $('#tweet-list').removeClass('d-none');
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