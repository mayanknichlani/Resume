// controllers/portfolio.js
import Portfolio from "../models/Portfolio.js";

// Create or update portfolio
export const upsertPortfolio = async (req, res) => {
    try {
        const { userID, bio, videoURL, resumeURL } = req.body;
        const portfolio = await Portfolio.findOneAndUpdate(
            { userID },
            { bio, videoURL, resumeURL },
            { new: true, upsert: true }
        );
        res.status(201).json(portfolio);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

// Get portfolio by userID
export const getPortfolio = async (req, res) => {
    try {
        const { userID } = req.params;
        const portfolio = await Portfolio.findOne({ userID });
        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }
        res.status(200).json(portfolio);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
