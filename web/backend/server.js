const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());

// Simple health
app.get('/health', (req, res) => res.json({ok:true}));

// Endpoint to originate calls via AMI (stubbed - implement AMI helper)
app.post('/api/originate', async (req, res) => {
  const {exten, callerid, context} = req.body;
  return res.json({status:'ok', ext: exten});
});

// Recordings listing
app.get('/api/recordings/:date', (req, res) => {
  const date = req.params.date; // YYYYMMDD
  const dir = `/var/spool/asterisk/monitor/${date}`;
  if (!fs.existsSync(dir)) return res.status(404).json({error:'not found'});
  const files = fs.readdirSync(dir).map(f => ({file:f, url:`/monitor/${date}/${f}`}));
  res.json(files);
});

// Serve mirrored recordings
app.use('/monitor', express.static('/var/www/html/monitor'));

app.listen(8080, ()=>console.log('web backend listening on 8080'));
