const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})

var todoSchema = mongoose.Schema({
    taskname: {
        type: String
    },
    taskdate:{
        type:Date
    },
    done: {
        type: Boolean
    }
}, {
        collections: 'todos'
    }
)
todoSchema.virtual('alldata').get(function(){
    return this;
})
module.exports = mongoose.model('Todo',todoSchema)
