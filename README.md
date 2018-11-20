# node-apis
REST APIs examples

1. GET /read-file returns this file, i.e., reads out the entire README file

2. GET /product accepts two paramenters num1 and num2 as query strings in the URL and prints the product of the two numbers.
EX: http://localhost:3003/product?num1=2&num2=37

3. GET /non-repeat-char accepts one parameter str and prints the non repeating char in str as output

4. GET /file-upload uploads a file(html page accepting a file hosted at http://localhost:3003/) and writes it into src/uploads folder.

5. crawler.js - Run node src/crawler.js to crawl through wiprodigital.com