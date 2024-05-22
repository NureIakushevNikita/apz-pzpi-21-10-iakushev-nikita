const axios = require('axios');

exports.getUniversities = async (req, res) => {
    try {
        const response = await axios.get('http://universities.hipolabs.com/search');
        const universities = response.data;

        res.json(universities);
    } catch (error) {
        console.error('Error fetching universities:', error);
        res.status(500).json({ message: 'Failed to fetch universities' });
    }
};
