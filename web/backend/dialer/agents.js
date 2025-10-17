class Agents {
  constructor(){ this.agents = new Map(); }
  set(id, info){ this.agents.set(id, info); }
  get(id){ return this.agents.get(id); }
  list(){ return Array.from(this.agents.values()); }
  available(){ return this.list().filter(a=>a.state==='available'); }
}
module.exports = new Agents();
