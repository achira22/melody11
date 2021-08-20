
const random = require("something-random-on-discord").Random





module.exports = {
   name:'advice',
   description: 'get random advice',
   run: async(client,message,args)=>{
    
    let data = await random.getAdvice()
    message.channel.send(data)
        
        

      
      .catch((err) => {
        console.error('api eror try again:', err)
      })
  }
}