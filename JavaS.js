//localstorage.getitem 1
//coleta o valor dos produtos em forma já pronta em listas, com o valor riscado ou n
var products = JSON.parse(localStorage.getItem("products")) || []
var clicks = JSON.parse(localStorage.getItem("clicks")) || 0
var colormode = localStorage.getItem("colormode") || "Light"

function Show(){
    var product = products
    document.getElementById("List").innerHTML = ""
    for(let i = 0; i < product.length; i++ ){
        document.getElementById("List").innerHTML += 
        //eventlistener 3
        //verifica quando o botão de riscar o nome do produto é pressionado
        //eventlistener 4
        //verifica quando o botão de remover o produto é pressionado
            `<div id="${product[i][0]}" class="Item">
                <p class="Main">${product[i][0]}</p>
                <div class="Buttons">
                    <input type="button" class="Complete" value="Riscar" onclick="riscar(this)">
                    <input type="button" class="Remove" value="Remover" onclick="remover(this)">
                </div>
            </div>`
            if(product[i][1] == "line-through"){
                document.getElementById(product[i][0]).style.textDecoration = "line-through"
            } 
            else{
                document.getElementById(product[i][0]).style.textDecoration = "none"
            }
            bgcolor()
    }
}

function add(product){
    var exists = false
    for(let i = 0;i<products.length; i++){
        if(products[i][0] == product){
            exists = true
        }
    }
    if(exists == false){
        products[products.length] = [product,"none"]
        //localstorage.setitem 1
        //atualiza o valor armazenado, adicionando o produto adicionado
        localStorage.setItem("products", JSON.stringify(products))
        Show()
    }
}

if (products){
    Show()
}

function remover(button){
    for(let i = 0; i < products.length; i++ ){
        var product = document.getElementById(products[i][0])
        var div = button.parentNode.parentNode
        if (product == div){
            products.splice(i,1)
            //localstorage.setitem 2
            //atualiza o valor armazenado, removendo o produto removido
            localStorage.setItem("products", JSON.stringify(products))
            Show()
        }
    }
}

function colect(){
    var text = document.getElementById("Name")
    if(text.value){
        add(text.value)
    }
    text.value = ""
}

function riscar(button){
    for(let i = 0; i < products.length; i++ ){
        var product = document.getElementById(products[i][0])
        var div = button.parentNode.parentNode
        if (product == div){
            if(products[i][1] !== "line-through"){
                products[i][1] = "line-through"
            }
            else{
                products[i][1] = "none"
            }
            //localstorage.setitem 3 
            //atualiza o valor armazenado, valor de se o nome do produto está riscado ou não
            localStorage.setItem("products", JSON.stringify(products))
            Show()
        }
    }
}

function desriscartudo(){
    for(let i = 0; i<products.length; i++ ){
        products[i][1] = "none"
        //localstorage.setitem 4
        //atualiza o valor armazenado, tirando o risco de todos os produtos, um por um
        localStorage.setItem("products", JSON.stringify(products))
    }
    Show()
}

function deleteall(){
    //localstorage.removeitem 1
    //remove todos os produtos
    localStorage.removeItem("products")
    //localstorage.getitem 2
    //atualiza o valor removido
    products = JSON.parse(localStorage.getItem("products")) || []
    Show()
}

function click(){
    clicks += 1
    localStorage.setItem("clicks", JSON.stringify(clicks))
    document.getElementById("Clicks").innerHTML = `clicks totais: ${clicks}`
}

function bgcolor(change){
    if(change == true){
        if(colormode == "Light"){
            colormode = "Dark"
            localStorage.setItem("colormode", "Dark")
        }
        else{
            colormode = "Light"
            localStorage.setItem("colormode", "Light")
        }
    }
    localStorage.setItem("colormode", colormode)
    if(colormode == "Light"){
        for(let i = 0;i<document.getElementsByTagName('p').length;i++){
            document.getElementsByTagName('p')[i].style.color = "rgb(0, 0, 0)"
        }
        for(let i = 0;i<document.getElementsByTagName('div').length;i++){
            document.getElementsByTagName('div')[i].style.borderColor = "rgb(0, 0, 0)"
        }
        document.getElementById("Body").style.backgroundColor = "rgb(255, 255, 255)"
        document.getElementById("Headline").style.color = "rgb(0, 0, 0)"
    }
    else{
        for(let i = 0;i<document.getElementsByTagName('p').length;i++){
            document.getElementsByTagName('p')[i].style.color = "rgb(255, 255, 255)"
        }
        for(let i = 0;i<document.getElementsByTagName('div').length;i++){
            document.getElementsByTagName('div')[i].style.borderColor = "rgb(255, 255, 255)"
        }
        document.getElementById("Body").style.backgroundColor = "rgb(80, 80, 80)"
        document.getElementById("Headline").style.color = "rgb(255, 255, 255)"
    }
}

document.getElementById("Clicks").innerHTML = `clicks totais: ${clicks}`
//eventlistener 5
//verifica se o botão de adicionar produto foi clicado
document.getElementById("Send").addEventListener('click',colect)
Show()
document.addEventListener('click',click)
document.addEventListener("DOMContentLoaded", bgcolor(false))



