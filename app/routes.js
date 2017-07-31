// create a new express router
const express = require('express');
const router = express.Router();
const mainController = require('./controllers/main.controller');
const eventsController = require('./controllers/events.controller');

// export router
module.exports = router;

// define routes
//// main routes
router.get('/', mainController.showHome);

//// event routes
router.get('/events', eventsController.showEvents);


//seed events
router.get('/events/seed', eventsController.seedEvents);

// show single events
router.get('/events/:slug', eventsController.showSingle);

// create events
router.post('/events/create', eventsController.createEvent);

// edit events

// delete events
