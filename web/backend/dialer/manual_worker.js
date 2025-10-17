module.exports = {
  initiateManualCall: async function({fromExt, toNumber}){
    // stub - integrate AMI originate here
    console.log('Manual call from', fromExt, 'to', toNumber);
    return 'ok';
  }
};
