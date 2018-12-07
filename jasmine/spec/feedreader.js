
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


        /* This test that loops through each feed
         * in the allFeeds object and ensures they have a URL defined
         * and that the URL is not empty.
         */

        it('URLs are defined and not empty', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
         });

        /* This test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('feeds name is defined and not empty',function(){
            for(let feeds of allFeeds) {
                expect(feeds.name).toBeDefined();
                expect(feeds.name.length).not.toBe(0);
            }
         });
    });

    /* This suite is testing "The menu" */
    describe('The menu', function(){
            let elements = document.getElementsByTagName("BODY");

        /* This test ensures the menu element is
         * hidden by default.
         */

        it('menu is hidden by default', function(){
            expect(elements[0].classList).toContain('menu-hidden');
        });

         /* This test checks whether the menu changes visibility
          * when the menu icon is clicked.
          */

        it('should be able to toggle the hidden menu',function(){
            let menu = document.getElementsByClassName('menu-icon-link');

            menu[0].click();
            expect(elements[0].classList.contains('menu-hidden')).toBe(false);

            menu[0].click();
            expect(elements[0].classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* This suit is about "Initial Entries" at feed loading
    */

    describe('Initial Entries',function(){

        /* This test ensures when the loadFeed function is called
         * there is at least a single .entry element within the .feed container.
         */

        beforeEach(function(done){
            loadFeed(0,done);
        });

        it('loadFeed has populated the feed container with at least 1 entry',function(done){
            let feeds = document.querySelectorAll('.feed .entry');
            expect(feeds.length > 0).toBe(true);
            done();
        })
    });

    /* This suite is testing the change for changing to a new feed"
    */

    describe('New Feed Selection',function(){

        /* This test that ensures when a new feed is loaded
         * by the loadFeed function it changes the content as well.
         */
        let feed = document.getElementsByClassName('feed');
        let firstFeed, secondFeed;

        beforeEach(function(done){

            /*Load first feed then within callback save result in a variable and
			* load second feed then within it's callback save result in a variable
			* before signaling it's done.
			*/

            loadFeed(0, function(){
                firstFeed = feed[0].innerText;

	            loadFeed(1, function(){
	                secondFeed = feed[0].innerText;
	                done();
	            });
            });
        });

            //Compare the results from the 2 feeds

         it('content changes when new entry is loaded by loadFeed()',function(done){
            expect(firstFeed === secondFeed).toBe(false);
            done()
         });
    });
}());
