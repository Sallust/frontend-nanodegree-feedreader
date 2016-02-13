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

    describe('The input', function() {
        var input = $('#my-input');
        var container = $('.feed');

        var length;
        var initialFilter= view.currentFilter;

        beforeEach(function(done) {
            loadFeed(1, function() {
                var initialLength = container.children().length;

                done();
            });
        });


        it('is changing the filter variable', function(done) {
            input.val('test');
            expect(view.currentFilter).not.toEqual(before);
            input.val('');
            done();
        });

        it('is reducing the number of entries', function() {


        })


        it('is generating an autocomplete box', function() {

        })


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
