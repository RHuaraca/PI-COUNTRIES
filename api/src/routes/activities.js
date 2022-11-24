const Router = require('express');
const activities = Router();
const { getAllActivities, getActivityById, postActivity, activityUpdate, deleteActivity } = require('../controlers/activityControler.js');
const { validationsPostActivity } = require('../midlewares/validationsPostActivity.js');
const { idValidatorToPutOrDeleteActivity } = require('../midlewares/idValidatorToPutOrDeleteActivity.js');
const { validationsPutActivity } = require('../midlewares/validationsPutActivity.js');
const { idValidatorToActivityDetail } =require ('../midlewares/idValidatorToActivityDetail.js');

activities.get('/', getAllActivities);

activities.get('/:id', idValidatorToActivityDetail, getActivityById);

activities.post('/', validationsPostActivity, postActivity );

activities.put('/', idValidatorToPutOrDeleteActivity, validationsPutActivity, activityUpdate);


activities.delete('/', idValidatorToPutOrDeleteActivity , deleteActivity );

module.exports = activities;