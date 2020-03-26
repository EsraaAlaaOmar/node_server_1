const path=require('path')
const express= require('express')
 const app=express()
 const hbs=require('hbs')
 const publicDirection= path.join(__dirname, '../public')
 const viewpath= path.join(__dirname, '../templete/views')
  const partialpath= path.join(__dirname, '../templete/partials')
  const geocode =require('../geocode.js')
  const forcast =require('../forecast.js')
  const port=process.env.PORT || 3000
 app.set('view engine', 'hbs');
 app.set('views',viewpath)
 hbs.registerPartials(partialpath)
 app.use(express.static(publicDirection))


app.get('',(req,res)=>{
 res.render('index',{
     title:'wether',
     name:'andrew mead',
   
 })

})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        name:'help esraa',
      
    })
})
   
   app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about',
        name:'about esraa',
      
    })
   
   })
   app.get('/product',(req,res)=>{
       if(!req.query.search){
    return res.send({
    erorr:'you must provide a search term'
})
       }
   
       res.send({
           
           products:[req.query]
       })
   })
   app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
        erorr:'you must provide a address term'
    })}
    geocode(req.query.address,(error,{longtude,latitude,location}={})=>{
        if(error){
            return res.send({ error })
        }
        forcast(latitude,longtude,(error,forcastData)=>{
 
            if(error){
                return res.send({ error })
            }
            res.send({
                forcast:forcastData,
                location,
                address:req.query.address
            })

        })
    })
 
   })
//app.com
//app.com/help
//app.com/about
app.get('/help/*',(req,res)=>{
    res.render('helpnf')
    }
    )
app.get('*',(req,res)=>{
    res.render('notFound')
}
)


app.listen(port,()=>{
    console.log('server is up on port '+port)
})
