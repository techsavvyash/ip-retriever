const express = require("express");
const app = express();
const cors = require("cors");
const Fuse = require("fuse.js");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());

const divisionMapping = {
  Ajmer: "Jaipur",
  Alwar: "Bharatpur",
  Anupgarh: "Sri Ganganagar",
  Balotra: "Jodhpur",
  Banswara: "Udaipur",
  Baran: "Kota",
  Barmer: "Jodhpur",
  Beawar: "Jaipur",
  Bharatpur: "Bharatpur",
  Bhilwara: "Bhilwara",
  Bikaner: "Bikaner",
  Bundi: "Kota",
  Chittorgarh: "Bhilwara",
  Churu: "Bikaner",
  Dausa: "Jaipur",
  Deeg: "Bharatpur",
  Dholpur: "Bharatpur",
  "Didwana Kuchaman": "Sikar",
  Dudu: "Jaipur",
  Dungarpur: "Udaipur",
  "Gangapur City": "Bharatpur",
  Hanumangarh: "Sri Ganganagar",
  Jaipur: "Jaipur",
  "Jaipur Rural": "Jaipur",
  Jaisalmer: "Bikaner",
  Jalore: "Jalore",
  Jhalawar: "Kota",
  Jhunjhunu: "Sikar",
  Jodhpur: "Jodhpur",
  "Jodhpur Rural": "Jodhpur",
  Karauli: "Bharatpur",
  Kekri: "Jaipur",
  "Khairthal-Tijara": "Jaipur",
  Kota: "Kota",
  "Kotputli-Behror": "Jaipur",
  Nagaur: "Sikar",
  "Neem Ka Thana": "Sikar",
  Pali: "Jalore",
  Phalodi: "Jodhpur",
  Pratapgarh: "Udaipur",
  Rajsamand: "Bhilwara",
  Salumbar: "Udaipur",
  Sanchore: "Jalore",
  "Sawai Madhopur": "Bharatpur",
  Shahpura: "Bhilwara",
  Sikar: "Sikar",
  Sirohi: "Jalore",
  "Sri Ganganagar": "Sri Ganganagar",
  Tonk: "Jaipur",
  Udaipur: "Udaipur",
};

app.get("/", (req, res) => {
  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    req.headers["request.ip"] ||
    req.ip ||
    req.headers["x-forwarded-for"];
  res.send(`${ip}`);
});

app.post("/match-string", (req, res) => {
  const { inputString } = req.body;

  if (!Array.isArray(list) || typeof inputString !== "string") {
    return res.status(400).send({ error: "Invalid input" });
  }

  const fuse = new Fuse(list, {
    includeScore: true,
    threshold: 0.3,
  });

  const result = fuse.search(inputString);

  if (result.length > 0) {
    return res.send({ match: result[0].item });
  } else {
    return res.status(404).send({ error: "No match found" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
