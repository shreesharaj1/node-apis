var Crawler = require("crawler");
const domain = "wiprodigital";
var c = new Crawler();
let obselete = []; // Array of what was crawled already
function crawlAllUrls(url) {
    console.log(`Crawling ${url}`);
    c.queue({
        uri: url,
        callback: function (err, res, done) {
            if (err) throw err;
            let $ = res.$;
            try {
                let urls = $("a");
                Object.keys(urls).forEach((item) => {
                    if (urls[item].type === 'tag') {
                        let href = urls[item].attribs.href;
                        const hrefDomain = extractHostname(href);
                        if (href && !obselete.includes(href) && hrefDomain.includes(domain)) {
                            href = href.trim();
                            obselete.push(href);
                            // Slow down the
                            setTimeout(function() {
                                href.startsWith('http') ? crawlAllUrls(href) : crawlAllUrls(`${url}${href}`) // The latter might need extra code to test if its the same site and it is a full domain with no URI
                            }, 5000)

                        }
                    }
                });
            } catch (e) {
                console.error(`Encountered an error crawling ${url}. Aborting crawl.${e}`);
                done()

            }
            done();
        }
    })
}

function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}
    
crawlAllUrls('https://www.wiprodigital.com');