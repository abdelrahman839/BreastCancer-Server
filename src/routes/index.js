const router = require('express').Router();

router.get('/',(req, res) => {
    try {
        res.send("Welcome to Breast Cancer Server")
    } catch (error) {
        res.status(500).json({ error: "...Server error" })
    }
});
module.exports = router;