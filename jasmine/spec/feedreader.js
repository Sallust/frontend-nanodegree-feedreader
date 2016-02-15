/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have urls',function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
 
            }
         });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have names',function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
         });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
            var slideMenu = $('.slide-menu').get(0);//the DOM element
            var $slide = $('.slide-menu');
            var body = $('body');
       
        it('element is hidden by default', function() {
         // Test if the right bound of the slide-menu element is equal to or less
         //than 0 
            expect(slideMenu.getBoundingClientRect().right).not.toBeGreaterThan(0);
        });
        /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when the menu icon is clicked', function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).not.toBeTruthy();
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        it('elements (at least one) have been appended the feed container', function(done) {
            var container = $('.feed');
            expect(container.children().length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        var container = $('.feed');
        var firstRun;

        beforeEach(function(done) {
            loadFeed(1, function() {
                firstRun = container.children().first().text();
                done();
            });
        });
         it('is different from the previous one', function(done) {
           
            loadFeed(2, function() {
                var secondRun = container.children().first().text();
                expect(secondRun).not.toEqual(firstRun);
                done();
            });
         });

    });

    /**
    * @description Deeper additional testing on each entry
    */
    describe('Each entry', function() {

        var length;
        var container = $('.feed');

         beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        /**
        * @description Iterate over each entry using jquey utility each
        * Check for content in p tag and href attr not to be falsy i.e. an empty string or undefined
        */
        it('has a description and link', function(done) {
            container.children().each(function(index, element) {
                var pTag = $(element).find('.description');//within context
                var aTag = $(element);
                expect(pTag.text()).not.toBe(false);
                expect(aTag.attr("href")).not.toBe(false);
            });
            done();
        }) ;
        /**
        * @description Entries.length of feed 0 is 10, check if each results
        * in a new DOM node
        */
        it('has been added', function(done) {
            expect(container.children().length).toEqual(10);
            done();
        });
    });
     /**
    * @description Check if a new feed added to allFeeds behaves as expected
    * in a new DOM node
    */
    describe('The fancy new feed', function() {
        beforeEach(function(done) {
            //new feed is at index 4 of the allFeeds array
            loadFeed(4, function() {
                done();
            });
        });
        var menuList = $('.feed-list');
        it('creates a new link in the slide menu', function() {
            var menuLength = menuList.children().length;
            var allFeedsLength = allFeeds.length;
            expect(menuLength).toEqual(allFeedsLength);
        });
        it('also generates an new RSS feed and changes the DOM', function(done) {
            var container = $('.feed');
            // test for at least 5 new nodes to see if  a list has been generated
            expect(container.children().length).toBeGreaterThan(5);
            done();
        });
    });
    /**
    * @description Using jasmine mock Ajax utility to test the current ajax call
    * Using mock success and error data
    */
    describe('The ajax call', function() {
        var MockResponse = {
            status: 200,
            responseText:  JSON.stringify ({
                "feed": {
                    "entries": [{
                        "link": "http://awesomeness.com",
                        "title": "Really Interesting Article",
                        "description": "Interesting description"
                    },{
                        "link": "http://awesomeness.com",
                        "title": "Really Interesting Article",
                        "description": "Interesting description"
                    }]
                }
            })
        };
        var ErrorResponse = {
            status: 400,
            responseText: 'My error'
        };

        var request,
            onSuccess,
            onFail;

        beforeEach(function() {
            //initialize mock ajax testing for this suite
            jasmine.Ajax.install();

            onSuccess = jasmine.createSpy('success');
            onFail = jasmine.createSpy('error');

            var feedUrl = 'http://blog.udacity.com/feed';

            //copied from app.js
            $.ajax({
               type: "POST",
               url: 'https://rsstojson.udacity.com/parseFeed',
               data: JSON.stringify({url: feedUrl}),
               contentType:"application/json",
               success: onSuccess, //spies replacing actual success function
               error: onFail,//error spy
               dataType: "json"
             });
            //initiate a fake request (obj) with no response 
            request = jasmine.Ajax.requests.mostRecent();
        });

        it('is using the correct url and method for the request', function() {
            //aspects of the request are stored as properties of the request obj
            expect(request.url).toBe('https://rsstojson.udacity.com/parseFeed');
            expect(request.method).toBe('POST');
        });

        it('is sending the correct data in its request', function() {
            expect(request.data()).toEqual({"url":"http://blog.udacity.com/feed"});
        });
        
        /**
        * @description Test Ajax protocol for success
        * Using a nested describe to continue using the mock-initiated ajax call
        */
        describe('on success', function() {

            beforeEach(function() {
                //passes the mock response, status 200 and fake data
                request.respondWith(MockResponse);
            });
            /**
            * @description Check if ajax func calls on success 
            * by checking if the spy, onSuccess, has been called
            */
            it('calls sucesss with correct data', function() {
                expect(onSuccess).toHaveBeenCalled();
            });
            /**
            * @description Check if correct data is passed to success func
            * by checking the description value of the first fake entry
            */
            it('has received correctly formatted data', function() {
                expect(onSuccess.calls.mostRecent().args[0].feed.entries[0].description).toEqual('Interesting description');
            });
        });
        /**
        * @description Test Ajax protocol for error
        */
        describe('on 400 error response', function() {
            beforeEach(function() {
                //pass a fake response with a Status of 400
                request.respondWith(ErrorResponse);
            });
            /**
            * @description Check if ajax then runs function at error
            */
            it('runs the error function', function() {
                expect(onFail).toHaveBeenCalled();
            });
            it('receives statusText as error', function() {
                expect(onFail.calls.mostRecent().args[0].statusText).toEqual('error');
            });
        });

        // 'turn off' mock ajax and allow page to make ajax requests as normal
        afterEach(function() {
          jasmine.Ajax.uninstall();
        });

    });
     /**
    * @description Check functionality of new input which would filter results
    */
    describe('The input', function() {
        //fake global obj
        var view = {};
        view.currentFilter = '';

        var input = $('#my-input');
        var container = $('.feed');

        var initialLength;
        // capture the initial filter string
        var initialFilter = view.currentFilter;

        beforeEach(function(done) {
            loadFeed(0, function() {
                //wait for async load of udacity feed &  change input value
                initialLength = container.children().length;
                input.val('udacity');
                done();
            });
        });

        afterEach(function(){
            input.val('');
        });
         /**
        * @description Check if the change in input in beforeEach 
        * has caused a change in the string the app is using to filter
        */
        it('is changing the filter variable', function(done) {
            expect(view.currentFilter).not.toEqual(initialFilter);
            done();
        });
        /**
        * @description Check if the number of displayed entries is reduced 
        * Assumes the method used to hide results is by completely removing
        * it from the DOM
        */
        it('is reducing the number of entries', function(done) {
            var newLength = container.children().length;
            expect(newLength).not.toEqual(initialLength);
            done();
        });
        /**
        * @description Check if the autocomplete box is being generated 
        * by checking the ul where the jquery widget populates 
        */
        it('is generating autocomplete results', function(done) {
         var autocompleteUl = $('.ui-autocomplete');
            expect(autocompleteUl.children().length).toBeGreaterThan(0);
            done();
        });
    });
}());
