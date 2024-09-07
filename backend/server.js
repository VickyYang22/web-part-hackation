const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/notify', (req, res) => {
    const { customerId, binStatus, address } = req.body;

    // Basic validation to ensure required fields are provided
    if (!customerId || !binStatus || !address) {
        return res.status(400).json({ error: "Please provide customerId, binStatus, and address." });
    }

    // Simulate notifying the worker
    console.log(`Customer ${customerId} has reported that the trash bin is ${binStatus}.`);
    console.log(`Worker is requested to pick up trash from ${address}.`);

    // Send response back to the user
    res.status(200).json({
        message: "Worker has been notified for pickup.",
        customerId,
        binStatus,
        address
    });
});
