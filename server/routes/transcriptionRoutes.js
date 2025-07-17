const express = require('express');
const router = express.Router();
const Transcription = require('../models/Transcription');

// @desc    Get all transcriptions
// @route   GET /api/transcriptions
router.get('/', async (req, res) => {
    try {
        const transcriptions = await Transcription.find().sort({ timestamp: -1 });
        res.json(transcriptions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Create a new transcription
// @route   POST /api/transcriptions
router.post('/', async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: 'Text is required' });
    }

    try {
        const newTranscription = new Transcription({ text });
        const saved = await newTranscription.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;