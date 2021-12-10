document.addEventListener('DOMContentLoaded', ()=>{
    dogBar()
    const allDog = document.getElementsByTagName('span')
    setTimeout(()=>{
        Array.from(allDog).forEach(dog => {
            dog.addEventListener('click', (e)=>{
                pupName= e.target.innerText
                allPup().then(data => {
                    data.forEach((dog)=>{
                        if(dog.name === pupName) {
                            pupContainer(dog)
                            const goodOrBad = document.querySelector('#dog-info').querySelector('button')
                            goodOrBad.addEventListener('click', (e)=>{
                                let isGood = (e.target.innerText.replace('!','')) === 'true'
                                e.target.innerText = `${!isGood}!`
                                let newDog = !isGood
                                updatePup(dog.id, newDog)
                            })
                        }
                    })
                })
            })
        })
    },500)
})

function allPup(){
    return fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => data)
}

function dogBar(){
    allPup()
    .then(data => {
        const dogBar = document.querySelector('#dog-bar')
        Array.from(data).forEach((dog) => {
            const dogName = document.createElement('span')
            dogName.innerText = dog.name
            dogBar.appendChild(dogName)
        })
        return data
    })
}

function pupContainer(dogObj){
    const dogInfo = document.querySelector('#dog-info')
    const img = document.createElement('img')
    const name = document.createElement('h2')
    const btn = document.createElement('button')
    dogInfo.innerHTML = ""
    img.src = dogObj.image
    name.innerText = dogObj.name
    btn.innerText = `${dogObj.isGoodDog}!`
    dogInfo.append(img, name, btn)
}

function updatePup(id, isGood){
    fetch(`http://localhost:3000/pups/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            isGoodDog: isGood
        })
    })
    .then(res => res.json())
}
