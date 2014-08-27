// This file should contain all the record creation needed to seed the database with its default values.
// The data can then be loaded with the node seed.js

models = require('./models');
var Place = models.Place,
    Hotel = models.Hotel,
    Restaurant = models.Restaurant,
    ThingsToDo = models.ThingsToDo,
    DayPlan = models.DayPlan;

var mongoose = require('mongoose');
console.log("Inserting data");

DayPlan.create({day_num: 1})

console.log("Finished inserting data");
console.log("Control-C to quit");