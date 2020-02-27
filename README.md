# mongoose-hw

TODO: There is a bug where comments aren't saved when more than one comment box is open. need to fix this.
Check it out at https://superfuturescraper.herokuapp.com/
UI is simple: user is presented with a button to scrape for new articles, and a list of current posts that are already in the DB. 
* Click one of the images and it will show any notes/comments that others have left on that specific article.

This app pulls the latest articles/posts on the site superfuture.com and saves them into mongodb. 

* The example video has the user select which articles to save, but my app saves all new articles.
* The directions also ask that we pull a summary, but I was not able to implement this as it is not available on the same frontpage. It is possible to impelement this in future iterations.
Uses:
# express
to handle the server
# express-handlebars
to dynamically serve articles from the db to UI
# mongoose
to handle connection to database
# cheerio
used in scraping the sites
# axios
used in scraping the sites

This readme needs some work as well.
