import mongoose from 'mongoose';
const Schema = mongoose.Schema();

const canvasSchema = new Schema({
  canvasId: String,
  dateCreated: {type: Date, default: Date.now},
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  party: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

const canvas = mongoose.model('Canvas, canvasSchema');

export {canvas};