var express = require('express');
var router = express.Router();

// Helper Functions
function alphabetPosition(text) {
  return [...text].map(a => parseInt(a, 36) - 10).filter(a => a >= 0);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Define the API route
router.post('/type', (req, res) => {
  // Extract values from the request body
  const { name, value1, value2, emotion } = req.body;

  // Check if all required fields are present
  if (!name || !value1 || !value2 || !emotion) {
      return res.status(400).json({ error: 'All fields (name, value1, value2, emotion) are required.' });
  }

  let points = 0

  // Handle name
  namePoints = alphabetPosition(name)
  namePoints.forEach( letterPosition => {
    points += letterPosition
  });

  // Handle custom values
  points += `${value1}`.length
  points += `${value2}`.length

  // Handle emotion
  // We get the first letter of the emotion and convert it into a number
  points += alphabetPosition(emotion)[0];

  var lastNumber = +points.toString().split('').pop();

  let dogTypes = [
    "Poodle",
    "German Sheppherd",
    "Pug",
    "Golden Retriever",
    "Akita",
    "Doge",
    "Doberman",
    "Boxer",
    "Pitbull",
    "Chiwawa",
  ]


  // Return the specified JSON response
  res.json({ type: dogTypes[lastNumber], score: points });
});


module.exports = router;
