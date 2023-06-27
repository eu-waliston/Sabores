const mongoose = require("mongoose");

const RecetasSchema = mongoose.Schema({
    name: {type: String, required: true},
    imageURL: {type: String, required: true},
    recipe: {
        type: [String],
        default: undefined
    },
    comment: {type: String},
    rate: {type: Number}
});


module.exports = mongoose.model("Receitas", RecetasSchema);