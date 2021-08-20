
const random = require("something-random-on-discord").Random





module.exports = {
   name:'fact',
   description: 'fact',
   run: async(client,message,args)=>{
    
    let data = await random.getFact()
    message.channel.send(data)
        
        

      
      .catch((err) => {
        console.error('api eror try again:', err)
      })
  }
}