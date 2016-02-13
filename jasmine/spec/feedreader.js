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
            var slideMenu = $('.slide-menu').get(0);
            var $slide = $('.slide-menu');
            var body = $('body');

         beforeEach(function() {
/*            var slideMenu = document.querySelector('.slide-menu');
*/        
        });

     /*    I broke the allFeeds var from the console and Jasmine 
            still said test was passing? So by default is it only
            checking onload?
            */

        it('element is hidden by default', function() {

         /*   Test if the right bound of the slide-menu element is equal to or less
         than 0 */
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
      /*     console.log(slideMenu.getBoundingClientRect().right)*/
            expect(body.hasClass('menu-hidden')).not.toBeTruthy();

            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBeTruthy();

           /* $._data( menuIcon[0], "events" );*/
           /* menuIcon.trigger('click');
            expect(slideMenu.getBoundingClientRect().right).not.toBeGreaterThan(0);*/

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

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
/* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
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

    describe('Each entry', function() {

        var length;
        var container = $('.feed');

         beforeEach(function(done) {
            loadFeed(0, function() {

                done();
            });
        });

        it('has a description and link', function(done) {
            container.children().each(function(index, element) {
                var pTag = $(element).find('p');
                var aTag = $(element);
                expect(pTag.text()).not.toBe(false);//i.e. an empty string or undefined
                expect(aTag.attr("href")).not.toBe(false);
            });
            done();
            //expect each of them to have a description at the tag level
        }) ;
        it(', at least 8, have been added', function(done) {
            expect(container.children().length).toBeGreaterThan(7);
            done();
        });

    });

    /*describe('The input', function() {
        var input = $('#my-input');
        var container = $('.feed');

        var initialLength;
        var initialFilter= view.currentFilter;

        beforeEach(function(done) {
            loadFeed(0, function() {
                var initialLength = container.children().length;
                input.val('udacity');
                done();
            });
        });

        afterEach(function(){
            input.val('');
        });

        it('is changing the filter variable', function(done) {
            expect(view.currentFilter).not.toEqual(initialFilter);
            done();
        });

        it('is reducing the number of entries', function(done) {
            var newLength = container.children().length;
            expect(newLength).not.toEqual(initialLength);
        });

        it('is generating autocomplete results', function() {
           /* the jQuery autocomplete widget populates its results in a
            ul with the class ui-autocomplete */
        /*    var autocompleteUl = $('.ui-autocomplete');
            expect(autocompleteUl.children().length).toBeGreaterThan(0);
        });
    });
*/
    describe('my ajax', function() {
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

        var request,
            onSuccess,
            onFail,
            test;

        beforeEach(function() {
            jasmine.Ajax.install();

            onSuccess = jasmine.createSpy('success');
            onFail = jasmine.createSpy('error');
            var feedUrl = 'http://blog.udacity.com/feed';
            var feedName = 'Udacity Blog';
            var cb = function(){};

            $.ajax({
               type: "POST",
               url: 'https://rsstojson.udacity.com/parseFeed',
               data: JSON.stringify({url: feedUrl}),
               contentType:"application/json",
               success: onSuccess ,

               function (result, status){
                    console.log(JSON.stringify({url: feedUrl}))
                            console.log(result)
                         var container = $('.feed'),
                             title = $('.header-title'),
                             entries = result.feed.entries,
                             entriesLen = entries.length,
                             entryTemplate = Handlebars.compile($('.tpl-entry').html());

                         title.html(feedName);   // Set the header text
                         container.empty();      // Empty out all previous entries

                         /* Loop through the entries we just loaded via the Google
                          * Feed Reader API. We'll then parse that entry against the
                          * entryTemplate (created above using Handlebars) and append
                          * the resulting HTML to the list of entries on the page.
                          */
                          entries.forEach(function(entry) {
                             container.append(entryTemplate(entry));
                         });

                         if (cb) {
                             cb();
                         }
                       },
               error: function (result, status, err){
                         //run only the callback without attempting to parse result due to error
                         if (cb) {
                             cb();
                         }
                       },
               dataType: "json"
             });

            request = jasmine.Ajax.requests.mostRecent();
            expect(request.url).toBe('https://rsstojson.udacity.com/parseFeed');
            expect(request.method).toBe('POST');
            expect(request.data()).toEqual({"url":"http://blog.udacity.com/feed"});
         });
            

        describe('on success', function() {
            beforeEach(function() {
                request.respondWith(MockResponse);
            });

            it('calls on sucesss with correct data', function() {
                expect(onSuccess).toHaveBeenCalled();
                console.log(onSuccess.calls.mostRecent().args)

            });



        });
/*
            jasmine.Ajax.stubRequest('YOUR_URL_HERE').andReturn({
                responseText: 'YOUR_RAW_STUBBED_DATA_HERE'
            });*/
       

        afterEach(function() {
            jasmine.Ajax.uninstall();
        });



    });



    describe('The AJAX calls', function() {



        it('are not getting called ridiculously', function() {



        });

        it('are returning data with keys full', function() {



        });

        it('are not returning errors', function() {

            
        })




    })

        
}());
