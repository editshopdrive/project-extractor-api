const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
const FIREBASE_URL = "https://studio-erp-74a34-default-rtdb.firebaseio.com/";
const FIREBASE_SECRET = "N80E8gP1cHzrv0BNAIPiGeS2erHw8kuDUSRuf6U8";


app.post('/verify', async (req, res) => {
    try {
        // Firebase se data fetch karna secret key ke sath
        const response = await axios.get(`${FIREBASE_URL}/ProjectExtractor_Licenses.json?auth=${FIREBASE_SECRET}`);
        
        // Software ko data ya success response bhejna
        res.json({ success: true, licenses: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


module.exports = app;
