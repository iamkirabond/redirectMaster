let sortButton = document.getElementById('sortButton')
let clearButton = document.getElementById('clearButton')
let addButton = document.getElementById("addButton")
let addLinks = document.getElementById("addLinks")
let final_links = document.getElementById("final_links")
let final_content = []

sortButton.onclick = function () {
    putSortAndCopy()
}

function putSortAndCopy () {
    if(final_content.length == 0){
        let initial_content = getInitialLinks()
        final_content = initial_content.sort()
    }
    else{
        final_content = final_content.sort()
    }
    
    final_links.value = final_content.join('\n')

    final_links.select()
    document.execCommand("copy");
}

clearButton.onclick = function () {
    document.getElementById("initial_links").value = ''
    document.getElementById("final_links").value = ''
    initial_content = ''

}

function getInitialLinks () {
    let initial_content = document.getElementById("initial_links").value
    final_content = []
    
    if (initial_content.length == 0)
        return
    
    initial_content = initial_content.split('\n')
    initial_content =  initial_content.filter(function (link) {
        return (link.length > 0)
    })

    return initial_content
}

addButton.onclick = function () {
    let popup = document.getElementById("popup")
    popup.classList.toggle('show')


}

let validateLink = function(links){
    let validation = links.filter((link) => {
        console.log(link.trim()[0] == '/')
        return link.trim()[0] != "/"
    })
    return !validation.length > 0
}

addLinks.onclick = function () {
    let linksFromField = document.getElementById("links-from")
    let linksToField = document.getElementById("links-to")
    let linksFrom = linksFromField.value.split('\n')
    let linksTo = linksToField.value.split('\n')

    if(!validateLink(linksFrom) || !validateLink(linksTo)){
        showError('One or more links are missing "/"')
        return
    }

    for(let i = 0; i < linksTo.length; i++){
        let origin = ` ${linksFrom[i]};`
        let lineToAdd = `${linksFrom[i]} ${linksTo[i]};`

        if(!final_content.includes(lineToAdd)){
            final_content.filter((redirect,index)=> {
                if (redirect.includes(origin)){
                    console.log(redirect,index,redirect.replace(origin, ` ${linksTo[i]};`))
                    final_content[index] =  redirect.replace(origin, ` ${linksTo[i]};`)
                }
                else{
                }
            })
            final_content.push(lineToAdd)
        }
        else{
            showError("This redirect already appeared in file.")
        }
    }
    putSortAndCopy();
}

let showError = function(message){
    alert(message)
}

initial_links.onchange = function(){
    putSortAndCopy()
}

function findDuplicate(){
    
}

    

