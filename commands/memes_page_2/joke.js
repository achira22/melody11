
const random = require("something-random-on-discord").Random





module.exports = {
   name:'joke',
   description: 'fact',
   run: async(client,message,args)=>{
    
    let data = await random.getJoke()
    message.channel.send(data)
        
        

      
      .catch((err) => {
        console.error('api eror try again:', err)
      })
  }
}