"use strict";
var mongoose = require("mongoose");
;
var drawingSchema = new mongoose.Schema({
    created_by: String,
    creation_date_time: Date,
    drawing_time: String,
    data: String,
});
var Drawing = mongoose.model("Drawing", drawingSchema);
module.exports = Drawing;
//# sourceMappingURL=Drawing.js.map