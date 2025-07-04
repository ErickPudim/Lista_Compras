//localstorage.getitem 1
//coleta o valor dos produtos em forma já pronta em listas, com o valor riscado ou n
var products = JSON.parse(localStorage.getItem("products")) || []

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

//eventlistener 5
//verifica se o botão de adicionar produto foi clicado
document.getElementById("Send").addEventListener('click',colect)
Show()



