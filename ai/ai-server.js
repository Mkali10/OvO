const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai').default;
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const app = express();
app.use(bodyParser.json());

app.post('/ai/respond', async (req, res) => {
  const {prompt} = req.body;
  if(!prompt) return res.status(400).json({error:'missing prompt'});
  try{
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages:[{role:'user',content:prompt}],
      max_tokens:300
    });
    res.json({reply: completion.choices[0].message.content});
  }catch(e){
    console.error(e);
    res.status(500).json({error:'ai error'});
  }
});

app.listen(4000, ()=>console.log('AI service listening on 4000'));
