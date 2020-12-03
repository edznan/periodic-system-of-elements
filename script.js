let elementsArr = []
let container = document.querySelector('#periodic')
let loading = document.querySelector('#loader')

getElements = async () => {
    loading.classList.remove('hidden')
    container.classList.add('hidden')
    let api = 'elements.json'
    let raw = await fetch(api)
    if (raw.ok) {
        elementsArr = await raw.json()
        displayElements()
    }
}

getElements()

let htmlToInsert = ''
let elementClass = ''

displayElements = () => {
    elementsArr.map(element => {
        elementClass = element.groupBlock.replace(/\s+/g, "-")
        let html = `
        <div class="col-sm-2 element ${elementClass}" id="${element.name}">
            <small>${element.atomicNumber}</small>
            <br>
            <h3>${element.symbol}</h3>
            <br>
            <h5>${element.name}</h5>
            <hr>
        </div>
        `
        htmlToInsert += html
        loading.classList.add('hidden')
        container.innerHTML = htmlToInsert
        container.classList.remove('hidden')
    })
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('element')) {
        fillInModal(e.target.id)
        $("#elementModal").modal()
    }
})

fillInModal = (id) => {
    elementsArr.forEach(element => {
        if (element.name == id) {
            document.querySelector('#modalTitle').innerHTML = element.name + ' (' + element.symbol +')'
            document.querySelector('#modalBody').innerHTML = `
            <ul class="list-group">
                <li class="list-group-item">Atomic mass: ${element.atomicMass}</li>
                <li class="list-group-item">Atomic number: ${element.atomicNumber}</li>
                <li class="list-group-item">Atomic radius: ${element.atomicRadius}</li>
                <li class="list-group-item">Boiling point: ${element.boilingPoint}</li>                    
                <li class="list-group-item">Bonding type: ${element.bondingType}</li>
                <li class="list-group-item">Density: ${element.density}</li>
                <li class="list-group-item">Electron affinity: ${element.electronAffinity}</li>
                <li class="list-group-item">Electronegativity: ${element.electronegativity}</li>
                <li class="list-group-item">Electronic configuration: ${element.electronicConfiguration}</li>
                <li class="list-group-item">Ion radius: ${element.ionRadius}</li>                    
                <li class="list-group-item">Ionization energy: ${element.ionizationEnergy}</li>
                <li class="list-group-item">Melting point: ${element.meltingPoint}</li>
                <li class="list-group-item">Oxidation states: ${element.oxidationStates}</li>
                <li class="list-group-item">Standard state: ${element.standardState}</li>
                <li class="list-group-item">Discovered: ${element.yearDiscovered}</li>
            </ul>
            `
        }
    })
}