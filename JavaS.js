var products = JSON.parse(localStorage.getItem("products")) || []

function Show(){
    var product = products
    document.getElementById("List").innerHTML = ""
    for(let i = 0; i < product.length; i++ ){
        document.getElementById("List").innerHTML += 
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
            localStorage.setItem("products", JSON.stringify(products))
            Show()
        }
    }
}

function desriscartudo(){
    for(let i = 0; i<products.length; i++ ){
        products[i][1] = "none"
        localStorage.setItem("products", JSON.stringify(products))
    }
    Show()
}

function deleteall(){
    localStorage.removeItem("products")
    products = JSON.parse(localStorage.getItem("products")) || []
    Show()
}

document.getElementById("Send").addEventListener('click',colect)
Show()



