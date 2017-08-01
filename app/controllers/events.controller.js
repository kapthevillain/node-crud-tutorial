const Event = require('../models/event');
const url = require('url');
module.exports = {

    showEvents: showEvents,
    showSingle: showSingle,
    seedEvents: seedEvents,
    showCreate: showCreate,
    processCreate: processCreate,
    showEdit: showEdit,
    process: processEdit

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
            res.render('pages/events', { events: events });
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
            res.render('pages/single', {event: event});
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
function showCreate(
    res.render('pages/create');
)

// ****
// create an event
// ****
function processCreate(req, res) {
   // if (req.method == 'GET'){
     //   res.render('pages/create', { success: req.flash('success'), errors: req.flash('errors') });
    //}

    //if (req.method == 'POST'){
        req.check('name', 'Event name required').notEmpty();
        req.check('description', 'Event description required').notEmpty();

        req.getValidationResult().then(function(result){
            if (result.isEmpty()){
                var createdEvent = new Event(req.body);
                createdEvent.save((err)=>{
                    if(err)
                        throw err;
                });
                req.flash('success', 'Event was successfully added!');
            }
            else {
                var errors = result.array();
                errors.forEach(function(error){req.flash('errors', error)});
            }
            res.redirect('/events/create');

        });
    //};
}

// ****
// show event
// ****
function showEdit(req, res){
    res.render('pages/edit');
}

// ****
// edit event
// ****
function processEdit(){

}
