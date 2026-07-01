import express, { Request, Response } from 'express';
import cors from 'cors'; // Run: npm install cors (allows React to talk to Express)
import CalculatorD from './calc';

const app = express();
const PORT = 5170;

// Middleware to parse JSON bodies and allow Frontend access
app.use(cors());
app.use(express.json());

// Define an API endpoint for your calculation
app.post('/api/threat-check', (req: Request, res: Response) => {
  // 1. Get the data sent by the frontend
  const { x, y, a, b, r } = req.body;

  // 2. Run your calculation logic
  const isThreatened = CalculatorD.inside_threat_range(x, y, a, b, r);

  // 3. Send the result back as JSON
  res.json({ threatened: isThreatened });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});