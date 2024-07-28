// models/Portfolio.js
import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    bio: {
        type: String,
        default: "",
    },
    videoURL: {
        type: String,
        default: "",
    },
    resumeURL: {
        type: String,
        default: "",
    }
}, { timestamps: true });

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

export default Portfolio;
