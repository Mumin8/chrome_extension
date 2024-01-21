const input_elem = document.getElementById("input-id");
const display_elem = document.getElementById("display-item");
const save_elem = document.getElementById('save')
const delete_elem = document.getElementById("delete")

if (localStorage.names) {
    listItems = JSON.parse(localStorage.names);
} else {
    listItems = [];
}


// this will save a url from an input
save_elem.addEventListener("click", function(){
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let urr_value = tabs[0].url;
        console.log(url_value)
        listItems.push(url_value)
        // use `url` here inside the callback because it's asynchronous!
    });
    clear_input()
    clear_fromLS()
    save_toLS()
    display(listItems)
})


// this will delete the urls
delete_elem.addEventListener("click", function(){
    clear_fromLS()
    clear_page()
})

function display(items){
    clear_page()
    for (let i = 0; i < items.length; i++) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(items[i]));
        display_elem.appendChild(li);
    }
}

function clear_page(){
    display_elem.innerHTML = " "
}

function save_toLS(){
    localStorage.setItem("names", JSON.stringify(listItems));
}

function clear_fromLS(){
    localStorage.clear()

}
 function clear_input(){
    input_elem.value = ""
 }