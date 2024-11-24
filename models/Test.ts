import { Schema, model, models } from 'mongoose';

const TestSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'Name is required.'], // CSV data is now required
  },
  projectName: {
    type: String,
    required: [true, 'Project Name is required.'], // CSV data is now required
  },
  csvData: {
    type: String,
    required: [true, 'CSV data is required.'], // CSV data is now required
  },
  url: {
    type: String,
    required: [false, 'Url is required.'],
    default: ""
  },
  done: {
    type: Boolean,
    required: [true, 'Done Status is required.'],
  },
  date: {
    type: Date,
    default: Date.now, // Sets the default value to the current date and time
  },
});

const Test = models.Test || model('Test', TestSchema);

export default Test;