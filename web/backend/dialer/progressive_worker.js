const queue = require('./queue');
const agents = require('./agents');

async function startProgressive(){
  console.log('Progressive worker started');
  setInterval(async ()=>{
    try{
      const avail = agents.available();
      if(avail.length === 0) return;
      for(const agent of avail){
        const lead = queue.pop();
        if(!lead) break;
        // originate to agent (stub - integrate AMI)
        console.log('Would originate to agent', agent.ext, 'lead', lead.number);
        agents.set(agent.id, {...agent, state:'busy'});
      }
    }catch(e){ console.error('progressive error', e); }
  }, 1000);
}
module.exports = { startProgressive };
