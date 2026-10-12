const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Aapka Firebase Database URL aur Secret ab sirf yahan server par rahega!
const FIREBASE_URL = "https://studio-erp-74a34-default-rtdb.firebaseio.com/ProjectExtractor_Licenses";
const FIREBASE_SECRET = "N80E8gP1cHzrv0BNAIPiGeS2erHw8kuDUsRuf6U8";

// License Verify karne ka Endpoint
app.get('/api/verify/:mobile', async (req, res) => {
    try {
        const mobile = req.params.mobile;
        const url = `${FIREBASE_URL}/${mobile}.json?auth=${FIREBASE_SECRET}`;
        
        // Server se Firebase ko request jayegi
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Server error or invalid request" });
    }
});

// License Update (PATCH) karne ka Endpoint
app.patch('/api/update/:mobile', async (req, res) => {
    try {
        const mobile = req.params.mobile;
        const url = `${FIREBASE_URL}/${mobile}.json?auth=${FIREBASE_SECRET}`;
        
        // Software se jo data aayega, use Firebase par patch kar dega
        const response = await axios.patch(url, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to update license" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});