import { Schema, model, models } from 'mongoose';

const TestSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  csvData: {
    type: String,
    required: [true, 'CSV data is required.'], // CSV data is now required
  },
  url: {
    type: String,
    required: [false, 'Url is required.'],
  },
  done: {
    type: Boolean,
    required: [true, 'Done Status is required.'],
  }
});

const Test = models.Test || model('Test', TestSchema);

export default Test;