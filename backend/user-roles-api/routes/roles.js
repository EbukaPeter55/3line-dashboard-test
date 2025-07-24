import express from 'express';
import { allRoles } from '../data/roles.js';

const router = express.Router();

router.get('/', (req, res) => {
    try {
        // Return a copy to prevent direct modification of the original array
        res.status(200).json([...allRoles]);
    } catch (error) {
        console.error("Error fetching all roles:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

export default router;
