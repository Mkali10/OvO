const net = require('net');
class AMI {
  constructor({host='asterisk', port=5038, username='admin', secret='changeme'}){
    this.host = host; this.port = port; this.username = username; this.secret = secret;
    this.socket = null; this.buffer = '';
  }
  connect(){
    return new Promise((resolve,reject)=>{
      this.socket = net.createConnection({host:this.host,port:this.port}, ()=>{
        this.socket.once('data', ()=>{
          const login = `Action: Login\r\nUsername: ${this.username}\r\nSecret: ${this.secret}\r\nEvents: off\r\n\r\n`;
          this.socket.write(login);
          resolve();
        });
      });
      this.socket.on('data', data=>{ this.buffer += data.toString(); });
      this.socket.on('error', reject);
    });
  }
  async originate({channel, exten, context='from-internal', priority=1, callerId, timeout=30000, async=false}){
    if(!this.socket) await this.connect();
    return new Promise((resolve, reject)=>{
      const action = [
        'Action: Originate',
        `Channel: ${channel}`,
        `Exten: ${exten}`,
        `Context: ${context}`,
        `Priority: ${priority}`,
        `CallerID: ${callerId || ''}`,
        `Timeout: ${timeout}`,
        `Async: ${async ? 'true' : 'false'}`,
        '\r\n'
      ].join('\r\n');
      const prevLen = this.buffer.length;
      this.socket.write(action, 'utf8', ()=>{});
      const interval = setInterval(()=>{
        if(this.buffer.length > prevLen){
          const resp = this.buffer.slice(prevLen);
          clearInterval(interval);
          resolve(resp);
        }
      },200);
      setTimeout(()=>{ clearInterval(interval); reject(new Error('AMI originate timeout')); }, timeout+5000);
    });
  }
  close(){ if(this.socket) this.socket.end(); }
}
module.exports = AMI;
