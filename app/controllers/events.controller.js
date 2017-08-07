const Event = require('../models/event');
const url = require('url');
module.exports = {

    showEvents: showEvents,
    showSingle: showSingle,
    seedEvents: seedEvents,
    showCreate: showCreate,
    processCreate: processCreate,
    showEdit: showEdit,
    processEdit: processEdit

}

// ****
// show all events
// ****
function showEvents(req, res) {
        // get all events
        Event.find({}, (err, events) =>{
            if (err){
                res.status(404);
                res.send('Events not found!');
            }
            res.render('pages/events', { events: events, success: req.flash('success') });
        });
}

// ****
// show a single events
// ****
function showSingle(req, res) {
        Event.findOne({ slug: req.params.slug}, (err, event) =>{
            if (err){
                res.status(404);
                res.send('Events not found!');
            }
            res.render('pages/single', {
                event: event,
                success: req.flash('success')
            });
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
// show create page
// ****
function showCreate(req, res){
    res.render('pages/create', { errors: req.flash('errors') });
}

// ****
// create an event
// ****
function processCreate(req, res) {
    req.check('name', 'Event name required').notEmpty();
    req.check('description', 'Event description required').notEmpty();

    req.getValidationResult().then(function(result){
            if (result.isEmpty()){
                var event = new Event({
                    name: req.body.name,
                    description: req.body.description
                });

                event.save((err)=>{
                    if(err)
                        throw err;

                    // success message
                    req.flash('success', 'Event was successfully added!');
                    // redirect to newly created page
                    res.redirect(`/events/${event.slug}`);
                });
            }
            else {
                var errors = result.array();
                console.log(errors);
                errors.forEach(function(error){req.flash('errors', error)});
                return res.redirect('/events/create');
            }

        });
}

// ****
// show event
// ****
function showEdit(req, res){
    Event.findOne({ slug: req.params.slug }, (err, event) => {
        res.render('pages/edit', {event: event, errors: req.flash('errors') });
    })
}

// ****
// edit event
// ****
function processEdit(req, res){
    req.check('name', 'Event name required').notEmpty();
    req.check('description', 'Event description required').notEmpty();

    req.getValidationResult().then(function(result){
        if (result.isEmpty()){
            Event.findOne({ slug: req.params.slug }, (err, event) =>{
                // update event
                event.name = req.body.name;
                event.description = req.body.description;

                // save event
                event.save((err)=>{
                    if(err)
                        throw err;

                    // success message
                    req.flash('success', 'Event was successfully updated!');
                    // redirect to newly created page
                    res.redirect('/events');

                });
            });
        }
        else {
            var errors = result.array();
            console.log(errors);
            errors.forEach(function(error){req.flash('errors', error)});
                return res.redirect(`/events/${req.params.slug}/edit`);
            }

    });
}
