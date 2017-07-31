const Event = require('../models/event');
const url = require('url');
module.exports = {

    showEvents: showEvents,
    showSingle: showSingle,
    seedEvents: seedEvents,
    createEvent: createEvent

}

// ****
// show all events
// ****
function showEvents(req, res) {
        // get all events
        Event.find({}, (err, events) =>{
            console.log(events);
            res.render('pages/events', { events: events });
        });
        //return a view with data

}

// ****
// show a single events
// ****
function showSingle(req, res) {
        // parse request url string to url object
        URL = url.parse(req.url);
        // split pathname to grab only the event slug
        var eventslug = URL.pathname.split('/')[2];

        Event.findOne({ slug: eventslug}, (err, event) =>{
            res.render('pages/single', {event: event});
            console.log(event.slug);
        });
}

// ****
// seed our database
// ****
function seedEvents(req, res) {
        // create some events
        const events = [
            { name: 'Basketball', description:'Throwing into a basket.'},
            { name: 'Swimming', description: 'Swimming in the water.'},
            { name: 'Archery', description: 'Trying to hit the bullseye.'},
            { name: 'Ping Pong', description: 'Super fast paddle skills.'}
        ];

        // use Event model to insert/save
        Event.remove({}, () => {
            for (event of events){
                var newEvent = new Event(event);
                newEvent.save();
            }
        });
        // seeded!
        res.send("Database seeded!");
}

// ****
// create an event
// ****
function createEvent(req, res) {

}

