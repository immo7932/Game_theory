import mongoose from "mongoose";

const CentreSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    sports: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sports',
    }]
  });
  
  const centreModel = mongoose.model('Centres', CentreSchema);
  export default centreModel;