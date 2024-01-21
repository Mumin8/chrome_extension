const input_elem = document.getElementById("input-id");
const display_elem = document.getElementById("display-item");
const save_elem = document.getElementById('save')
const delete_elem = document.getElementById("delete")

if (localStorage.names) {
    listItems = JSON.parse(localStorage.names);
    display(listItems)
} else {
    listItems = [];
}


// this will save a url from an input
save_elem.addEventListener("click", function(){
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url_value = tabs[0].url;
        listItems.push(url_value)
    });
    clear_input()
    clear_fromLS()
    save_toLS()
    display(listItems)
})


// this will delete the urls
delete_elem.addEventListener("click", function(){
    listItems = []
    clear_fromLS()
    clear_page()
})

function display(items){
    clear_page()
    for (let i = 0; i < items.length; i++) {

        let li = document.createElement("li");
        let anchor = document.createElement("a");

        anchor.href = items[i]
        anchor.target = "_blank";

        anchor.appendChild(document.createTextNode(items[i]));
        li.appendChild(anchor)

        li.style.listStyle = 'none'
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