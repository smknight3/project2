const HOSTED_URL = {
    queryTwitter: 'http://localhost:3000/php/twitter.php?q=',
};
const LOCAL_URL = {
    queryTwitter: 'http://localhost:3000/php/twitter.php?q=',
};

wordblob()

let urls

$(".btn-search").click(function() {
    twitterStuff();
});

$(".btn-search-2").click(function() {
    twitterStuff2();
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
    getTwitterHashTagData($("#tag-input").val(), processTwitterData);
}

function twitterStuff2() {
    $('#tweet-list-2').addClass('d-none');
    getTwitterHashTagData($("#tag-input-2").val(), processTwitterData);
}

function parseDate(str) {
    var v = str.split(' ');
    return new Date(Date.parse(v[1] + " " + v[2] + ", " + v[5] + " " + v[3] + " UTC"));
}

function processTwitterData(tweets) {
    const twitterData = [];
    if (tweets) {
        $.each(tweets, function(index, tweet) {
            if (tweet.full_text) {
                const tweet_text = tweet.full_text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
                const created = parseDate(tweet.created_at);
                const createdDate = created.getDate() + '-' + (created.getMonth() + 1) + '-' + created.getFullYear() + ' at ' + created.getHours() + ':' + created.getMinutes();
                const tweet_user = tweet.user["screen_name"];
                const tweet_likes = +(tweet.favorite_count);
                const tweet_userfol = +(tweet.user["followers_count"]);
                twitterData.push({
                    tweet: tweet_text,
                    user: tweet_user,
                    date: createdDate,
                    likes: tweet_likes,
                    followers: tweet_userfol


                });
            }

        });
    }
    console.log(twitterData);
    $('.spinner-border').addClass('d-none');
    displayTweets(twitterData);
    $('#tweet-list').removeClass('d-none');
    makeChart(twitterData);
    makeWordCloud(twitterData);
}


function makeChart(data) {
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    {

        // Add X axis
        var x = d3.scaleLinear()
            .domain([0, d3.max(data.map((d) => d.followers))])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x)
                .tickFormat(d3.format("~s")));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, d3.max(data.map((d) => d.likes))])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y)
                .tickFormat(d3.format("~s")));

        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function(d) { return x(d.followers); })
            .attr("cy", function(d) { return y(d.likes); })
            .attr("r", 5)
            .style("fill", "#308ddf")

    }
}

function makeWordCloud(data) {
    var newdata = data.map((d) => d.tweet).reduce((blob, tweet) => blob + " " + tweet)
    console.log(newdata)
    drawWordCloud(newdata);
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


function drawWordCloud(text_string) {
    var common = "poop,i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall";

    var word_count = {};
    console.log(text_string)
    var words = text_string.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
    if (words.length == 1) {
        word_count[words[0]] = 1;
    } else {
        words.forEach(function(word) {
            var word = word.toLowerCase();
            if (word != "" && common.indexOf(word) == -1 && word.length > 1) {
                if (word_count[word]) {
                    word_count[word]++;
                } else {
                    word_count[word] = 1;
                }
            }
        })
    }

    var svg_location = "#chart";
    var width = $(document).width();
    var height = $(document).height();
    console.log(d3)
    var fill = d3.scaleOrdinal(d3.schemeCategory10);

    var word_entries = Object.entries(word_count);

    var xScale = d3.scaleLinear()
        .domain([0, d3.max(word_entries, function(d) {
            return d.value;
        })])
        .range([10, 100]);

    d3.layout.cloud().size([width, height])
        .timeInterval(20)
        .words(word_entries)
        .fontSize(function(d) { return xScale(+d.value); })
        .text(function(d) { return d.key; })
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        .on("end", draw)
        .start();

    function draw(words) {
        d3.select(svg_location).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return xScale(d.value) + "px"; })
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.key; });
    }

    d3.layout.cloud().stop();
}

function wordblob() {
    d3.rebind = function(target, source) {
        var i = 1,
            n = arguments.length,
            method;
        while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
        return target;
    };

    d3.functor = function functor(v) {
        return typeof v === "function" ? v : function() {
            return v;
        };
    };

    // Method is assumed to be a standard D3 getter-setter:
    // If passed with no arguments, gets the value.
    // If passed with arguments, sets the value and returns the target.
    function d3_rebind(target, source, method) {
        return function() {
            var value = method.apply(source, arguments);
            return value === source ? target : value;
        };
    }

    function cloud() {
        var size = [256, 256],
            text = cloudText,
            font = cloudFont,
            fontSize = cloudFontSize,
            fontStyle = cloudFontNormal,
            fontWeight = cloudFontNormal,
            rotate = cloudRotate,
            padding = cloudPadding,
            spiral = archimedeanSpiral,
            words = [],
            timeInterval = Infinity,
            event = d3.dispatch("word", "end"),
            timer = null,
            cloud = {};

        cloud.start = function() {
            var board = zeroArray((size[0] >> 5) * size[1]),
                bounds = null,
                n = words.length,
                i = -1,
                tags = [],
                data = words.map(function(d, i) {
                    d.text = text.call(this, d, i);
                    d.font = font.call(this, d, i);
                    d.style = fontStyle.call(this, d, i);
                    d.weight = fontWeight.call(this, d, i);
                    d.rotate = rotate.call(this, d, i);
                    d.size = ~~fontSize.call(this, d, i);
                    d.padding = padding.call(this, d, i);
                    return d;
                }).sort(function(a, b) { return b.size - a.size; });

            if (timer) clearInterval(timer);
            timer = setInterval(step, 0);
            step();

            return cloud;

            function step() {
                var start = +new Date,
                    d;
                while (+new Date - start < timeInterval && ++i < n && timer) {
                    d = data[i];
                    d.x = (size[0] * (Math.random() + .5)) >> 1;
                    d.y = (size[1] * (Math.random() + .5)) >> 1;
                    cloudSprite(d, data, i);
                    if (d.hasText && place(board, d, bounds)) {
                        tags.push(d);
                        event.call("word", cloud, d);
                        if (bounds) cloudBounds(bounds, d);
                        else bounds = [{ x: d.x + d.x0, y: d.y + d.y0 }, { x: d.x + d.x1, y: d.y + d.y1 }];
                        // Temporary hack
                        d.x -= size[0] >> 1;
                        d.y -= size[1] >> 1;
                    }
                }
                if (i >= n) {
                    cloud.stop();
                    event.call("end", cloud, tags, bounds);
                }
            }
        }

        cloud.stop = function() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
            return cloud;
        };

        cloud.timeInterval = function(x) {
            if (!arguments.length) return timeInterval;
            timeInterval = x == null ? Infinity : x;
            return cloud;
        };

        function place(board, tag, bounds) {
            var perimeter = [{ x: 0, y: 0 }, { x: size[0], y: size[1] }],
                startX = tag.x,
                startY = tag.y,
                maxDelta = Math.sqrt(size[0] * size[0] + size[1] * size[1]),
                s = spiral(size),
                dt = Math.random() < .5 ? 1 : -1,
                t = -dt,
                dxdy,
                dx,
                dy;

            while (dxdy = s(t += dt)) {
                dx = ~~dxdy[0];
                dy = ~~dxdy[1];

                if (Math.min(dx, dy) > maxDelta) break;

                tag.x = startX + dx;
                tag.y = startY + dy;

                if (tag.x + tag.x0 < 0 || tag.y + tag.y0 < 0 ||
                    tag.x + tag.x1 > size[0] || tag.y + tag.y1 > size[1]) continue;
                // TODO only check for collisions within current bounds.
                if (!bounds || !cloudCollide(tag, board, size[0])) {
                    if (!bounds || collideRects(tag, bounds)) {
                        var sprite = tag.sprite,
                            w = tag.width >> 5,
                            sw = size[0] >> 5,
                            lx = tag.x - (w << 4),
                            sx = lx & 0x7f,
                            msx = 32 - sx,
                            h = tag.y1 - tag.y0,
                            x = (tag.y + tag.y0) * sw + (lx >> 5),
                            last;
                        for (var j = 0; j < h; j++) {
                            last = 0;
                            for (var i = 0; i <= w; i++) {
                                board[x + i] |= (last << msx) | (i < w ? (last = sprite[j * w + i]) >>> sx : 0);
                            }
                            x += sw;
                        }
                        delete tag.sprite;
                        return true;
                    }
                }
            }
            return false;
        }

        cloud.words = function(x) {
            if (!arguments.length) return words;
            words = x;
            return cloud;
        };

        cloud.size = function(x) {
            if (!arguments.length) return size;
            size = [+x[0], +x[1]];
            return cloud;
        };

        cloud.font = function(x) {
            if (!arguments.length) return font;
            font = d3.functor(x);
            return cloud;
        };

        cloud.fontStyle = function(x) {
            if (!arguments.length) return fontStyle;
            fontStyle = d3.functor(x);
            return cloud;
        };

        cloud.fontWeight = function(x) {
            if (!arguments.length) return fontWeight;
            fontWeight = d3.functor(x);
            return cloud;
        };

        cloud.rotate = function(x) {
            if (!arguments.length) return rotate;
            rotate = d3.functor(x);
            return cloud;
        };

        cloud.text = function(x) {
            if (!arguments.length) return text;
            text = d3.functor(x);
            return cloud;
        };

        cloud.spiral = function(x) {
            if (!arguments.length) return spiral;
            spiral = spirals[x + ""] || x;
            return cloud;
        };

        cloud.fontSize = function(x) {
            if (!arguments.length) return fontSize;
            fontSize = d3.functor(x);
            return cloud;
        };

        cloud.padding = function(x) {
            if (!arguments.length) return padding;
            padding = d3.functor(x);
            return cloud;
        };


        return d3.rebind(cloud, event, "on");
    }

    function cloudText(d) {
        return d.text;
    }

    function cloudFont() {
        return "serif";
    }

    function cloudFontNormal() {
        return "normal";
    }

    function cloudFontSize(d) {
        return Math.sqrt(d.value);
    }

    function cloudRotate() {
        return (~~(Math.random() * 6) - 3) * 30;
    }

    function cloudPadding() {
        return 1;
    }

    // Fetches a monochrome sprite bitmap for the specified text.
    // Load in batches for speed.
    function cloudSprite(d, data, di) {
        if (d.sprite) return;
        c.clearRect(0, 0, (cw << 5) / ratio, ch / ratio);
        var x = 0,
            y = 0,
            maxh = 0,
            n = data.length;
        --di;
        while (++di < n) {
            d = data[di];
            c.save();
            c.font = d.style + " " + d.weight + " " + ~~((d.size + 1) / ratio) + "px " + d.font;
            var w = c.measureText(d.text + "m").width * ratio,
                h = d.size << 1;
            if (d.rotate) {
                var sr = Math.sin(d.rotate * cloudRadians),
                    cr = Math.cos(d.rotate * cloudRadians),
                    wcr = w * cr,
                    wsr = w * sr,
                    hcr = h * cr,
                    hsr = h * sr;
                w = (Math.max(Math.abs(wcr + hsr), Math.abs(wcr - hsr)) + 0x1f) >> 5 << 5;
                h = ~~Math.max(Math.abs(wsr + hcr), Math.abs(wsr - hcr));
            } else {
                w = (w + 0x1f) >> 5 << 5;
            }
            if (h > maxh) maxh = h;
            if (x + w >= (cw << 5)) {
                x = 0;
                y += maxh;
                maxh = 0;
            }
            if (y + h >= ch) break;
            c.translate((x + (w >> 1)) / ratio, (y + (h >> 1)) / ratio);
            if (d.rotate) c.rotate(d.rotate * cloudRadians);
            c.fillText(d.text, 0, 0);
            if (d.padding) c.lineWidth = 2 * d.padding, c.strokeText(d.text, 0, 0);
            c.restore();
            d.width = w;
            d.height = h;
            d.xoff = x;
            d.yoff = y;
            d.x1 = w >> 1;
            d.y1 = h >> 1;
            d.x0 = -d.x1;
            d.y0 = -d.y1;
            d.hasText = true;
            x += w;
        }
        var pixels = c.getImageData(0, 0, (cw << 5) / ratio, ch / ratio).data,
            sprite = [];
        while (--di >= 0) {
            d = data[di];
            if (!d.hasText) continue;
            var w = d.width,
                w32 = w >> 5,
                h = d.y1 - d.y0;
            // Zero the buffer
            for (var i = 0; i < h * w32; i++) sprite[i] = 0;
            x = d.xoff;
            if (x == null) return;
            y = d.yoff;
            var seen = 0,
                seenRow = -1;
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var k = w32 * j + (i >> 5),
                        m = pixels[((y + j) * (cw << 5) + (x + i)) << 2] ? 1 << (31 - (i % 32)) : 0;
                    sprite[k] |= m;
                    seen |= m;
                }
                if (seen) seenRow = j;
                else {
                    d.y0++;
                    h--;
                    j--;
                    y++;
                }
            }
            d.y1 = d.y0 + seenRow;
            d.sprite = sprite.slice(0, (d.y1 - d.y0) * w32);
        }
    }

    // Use mask-based collision detection.
    function cloudCollide(tag, board, sw) {
        sw >>= 5;
        var sprite = tag.sprite,
            w = tag.width >> 5,
            lx = tag.x - (w << 4),
            sx = lx & 0x7f,
            msx = 32 - sx,
            h = tag.y1 - tag.y0,
            x = (tag.y + tag.y0) * sw + (lx >> 5),
            last;
        for (var j = 0; j < h; j++) {
            last = 0;
            for (var i = 0; i <= w; i++) {
                if (((last << msx) | (i < w ? (last = sprite[j * w + i]) >>> sx : 0)) &
                    board[x + i]) return true;
            }
            x += sw;
        }
        return false;
    }

    function cloudBounds(bounds, d) {
        var b0 = bounds[0],
            b1 = bounds[1];
        if (d.x + d.x0 < b0.x) b0.x = d.x + d.x0;
        if (d.y + d.y0 < b0.y) b0.y = d.y + d.y0;
        if (d.x + d.x1 > b1.x) b1.x = d.x + d.x1;
        if (d.y + d.y1 > b1.y) b1.y = d.y + d.y1;
    }

    function collideRects(a, b) {
        return a.x + a.x1 > b[0].x && a.x + a.x0 < b[1].x && a.y + a.y1 > b[0].y && a.y + a.y0 < b[1].y;
    }

    function archimedeanSpiral(size) {
        var e = size[0] / size[1];
        return function(t) {
            return [e * (t *= .1) * Math.cos(t), t * Math.sin(t)];
        };
    }

    function rectangularSpiral(size) {
        var dy = 4,
            dx = dy * size[0] / size[1],
            x = 0,
            y = 0;
        return function(t) {
            var sign = t < 0 ? -1 : 1;
            // See triangular numbers: T_n = n * (n + 1) / 2.
            switch ((Math.sqrt(1 + 4 * sign * t) - sign) & 3) {
                case 0:
                    x += dx;
                    break;
                case 1:
                    y += dy;
                    break;
                case 2:
                    x -= dx;
                    break;
                default:
                    y -= dy;
                    break;
            }
            return [x, y];
        };
    }

    // TODO reuse arrays?
    function zeroArray(n) {
        var a = [],
            i = -1;
        while (++i < n) a[i] = 0;
        return a;
    }

    var cloudRadians = Math.PI / 180,
        cw = 1 << 11 >> 5,
        ch = 1 << 11,
        canvas,
        ratio = 1;

    if (typeof document !== "undefined") {
        canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 1;
        ratio = Math.sqrt(canvas.getContext("2d").getImageData(0, 0, 1, 1).data.length >> 2);
        canvas.width = (cw << 5) / ratio;
        canvas.height = ch / ratio;
    } else {
        // Attempt to use node-canvas.
        canvas = new Canvas(cw << 5, ch);
    }

    var c = canvas.getContext("2d"),
        spirals = {
            archimedean: archimedeanSpiral,
            rectangular: rectangularSpiral
        };
    c.fillStyle = c.strokeStyle = "red";
    c.textAlign = "center";

    if (typeof module === "object" && module.exports) module.exports = cloud;
    else(d3.layout || (d3.layout = {})).cloud = cloud;
};


init();