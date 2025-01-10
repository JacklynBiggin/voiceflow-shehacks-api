const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("You're not supposed to be here!"));

// Helper Functions
function alphabetPosition(text) {
  return [...text].map(a => parseInt(a, 36) - 10).filter(a => a >= 0);
}

/* GET home page. */
app.get('/', function(req, res) {
  res.render('index');
});

// Define the API route
app.post('/type', (req, res) => {
  // Extract values from the request body
  const { name, value1, value2, emotion } = req.body;

  // Check if all required fields are present
  if (!name || !value1 || !value2 || !emotion) {
      return res.status(400).json({ error: 'All fields (name, value1, value2, emotion) are required.' });
  }

  try {
    let points = 0

    // Handle name
    let namePoints = alphabetPosition(name)
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
  
    // Catch all for people putting weird stuff as inputs for workshop purposes
    if (isNaN(points)) {
      return res.json({ type: "Fluffy", score: 1 });
    }

    // Return the specified JSON response
    res.json({ type: dogTypes[lastNumber], score: points });

  } catch (error) {  
    res.status(500).json({ error: 'An error occurred.' });
  }
});

module.exports = app;