const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports={
lista: async (req,res)=>{
 let cantidad= await fetch('http://localhost:3002/api').then(response => response.json())
     return res.render("adminCout",{cout:cantidad.count})
    }
}