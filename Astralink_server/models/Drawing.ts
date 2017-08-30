import * as mongoose from "mongoose";

interface IDrawing {
    created_by: string;
    creation_date_time: Date;
    drawing_time: string;
    data: string;
}

interface IDrawingModel extends IDrawing, mongoose.Document{};
var drawingSchema = new mongoose.Schema({
    created_by: String,
    creation_date_time: Date,
    drawing_time: String,
    data: String,
});

var Drawing = mongoose.model<IDrawingModel>("Drawing", drawingSchema);

export = Drawing;

