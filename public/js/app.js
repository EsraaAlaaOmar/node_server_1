console.log('client side is loading')
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
 console.log(data)
    })
})
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
 console.log(data)
    })
})
const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const one=document.querySelector('#one')
const two=document.querySelector('#two')

weatherForm.addEventListener('submit',(e)=>{
e.preventDefault()
const location= search.value
one.textContent='loading..'
fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            one.textContent=data.error
        }
        else{
            one.textContent=data.location
            two.textContent=data.forecast
        }

    })
})

    console.log(location)
})