

const mongoose = require('mongoose');

const mentionSchema = new mongoose.Schema({
    mentionedBy: {
        type: String,
        require:true
      },
      mentioned: {
        type: String,
        require:true
      },
      type:{
        type: String,
        require:true
        
      },
      entityId:{
        type: String,
        require:true
        
      },
    
});
const Mention = mongoose.model('Mention', mentionSchema);

module.exports = Mention;