# Feed Reader Testing
	* Using [Jasmine](http://jasmine.github.io/) to test functionality of a web-based application that reads RSS feeds

##How to view this project!
*	Open the index.html file
*	The app will start running and display links to the Udacity Blog
*	Jasmine will immediately start running and generate results at the bottom of the screen
*	Sadly, some of them will fail.

##Additional Testing - test-driven development
*	The jasmine tests that fail are testing future functionality
*	It tests a new filter feature with autocomplete
*	These tests will continue to fail until an filter input has been
	successfully added

##Additional Testing that passes
*	The new tests test additional functionality has ALREADY has been added to
	the app
*	First, we check to see if the descriptions of the RSS articles are 
	getting added to the page
*	We also check to see if the link isn't empty
*	and then double check if the # of entries is generating a similar number
	of DOM nodes

### New RSS Feed
* I added a new feed from Webdesigner depot
*	The next suite tests if it behaves as expected
*  - Creating an additional menu link
* 	- creating a list of its articles 

### Mock Ajax testing
*	This suite checks how the original ajax call performs
*	We check the outgoing request is as expected
*	Also, we check how the ajax call deals with a success and 
	error status response
*	We do this by using jasmine's mock ajax functions
*	Namely, `jasmine.Ajax.requests.mostRecent()` and then `request.respondWith()`
*	Then we pass it fake data, one with status 200, the other status 400 
	to test what functions get called and with what passed arguments

### My contact info
* Daniyom Haile
* daniyom@gmail.com

### Attributions
*Original RSS reader website provided by [Udacity](http://github.com/udacity/frontend-nanodegree-feedreader)

