const queue = require('./queue');
const agents = require('./agents');

async function estimateAHT(){
  return 180;
}

async function startPredictive(){
  console.log('Predictive worker started');
  setInterval(async ()=>{
    try{
      const avail = agents.available().length;
      const aht = await estimateAHT();
      const avgRing = 20;
      const safety = 1.2;
      const calls = Math.ceil(avail * (aht / Math.max(1, avgRing)) * safety);
      for(let i=0;i<calls;i++){
        const lead = queue.pop();
        if(!lead) break;
        console.log('Predictive originate to', lead.number);
      }
    }catch(e){ console.error('predictive error', e); }
  }, 2000);
}
module.exports = { startPredictive };
