const mongoose = require('mongoose')

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    toJSON: {
        virtuals: true,
    }
})

SpotSchema.virtual('thumbnail_url').get(function() {
    const url = process.env.URL || 'https://localhost:3333'
    return `${url}/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot', SpotSchema)