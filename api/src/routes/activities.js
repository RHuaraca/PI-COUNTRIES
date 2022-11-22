const Router = require('express');
const activities = Router();
const { getAllActivities, postActivity, activityUpdate, deleteActivity } = require('../controlers/activityControler.js');
const { validationsPostActivity } = require('../midlewares/validationsPostActivity.js');
const { idValidatorToPutOrDeleteActivity } = require('../midlewares/idValidatorToPutOrDeleteActivity.js');
const { validationsPutActivity } = require('../midlewares/validationsPutActivity.js');

activities.get('/', getAllActivities);

activities.post('/', validationsPostActivity, postActivity );

activities.put('/', idValidatorToPutOrDeleteActivity, validationsPutActivity, activityUpdate);


activities.delete('/', idValidatorToPutOrDeleteActivity , deleteActivity );

module.exports = activities;