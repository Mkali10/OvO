class LeadQueue {
  constructor(){ this.q = []; }
  push(lead){ this.q.push(lead); }
  pop(){ return this.q.shift(); }
  peek(){ return this.q[0]; }
  size(){ return this.q.length; }
  removeById(id){ this.q = this.q.filter(l=>l.id!==id); }
  list(){ return this.q.slice(); }
}
module.exports = new LeadQueue();
