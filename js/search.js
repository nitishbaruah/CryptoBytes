
function searchdata() {
    const currenturl= window.location.href;
    const url_obj=new URL(currenturl);
    const params = new URLSearchParams(url_obj.search);
    if(!params.has('q')){
        return;
    }
    document.getElementsByName('q')[0].value= params.get('q');
    fetch('https://api.coingecko.com/api/v3/search?query='+params.get('q'))
    .then(convertTojson)
    .then(render);
}

function render(data){
    for(let i=0;i<data.coins.length;i++){
        const singlecoin=data.coins[i];
        //console.log(singlecoin);
        const index=i+1;
        const cname=singlecoin.name;
        const logo=singlecoin.thumb;
        const symbol=singlecoin.symbol;
        const id=singlecoin.id;
        createSingleCard(index,cname, logo,symbol, id);
    }
}

/*
     <div class="singlecard-result">
                <p>1</p>
                <img src="image/logo.png" alt="coinlogo">
                <h3>Bitcoin</h3>
                <h3>BTC</h3>
                <button>More info</button>
            </div>

*/

function createSingleCard(index, cname, logo, symbol, id) {
    const id_ele=document.createElement('p');
    id_ele.innerHTML=index;

    const logo_ele=document.createElement('img');
    logo_ele.src=logo;
    logo_ele.alt="coin logo";

    const name_ele=document.createElement('h3');
    name_ele.innerHTML=cname;

    const symbol_ele=document.createElement('h3');
    symbol_ele.innerHTML=symbol;

    const anchor_ele=document.createElement('a');
    anchor_ele.innerHTML="More info";
    anchor_ele.href="/detail.html?id="+id;

    const container_ele=document.createElement('div');
    container_ele.classList.add('singlecard-result');
    container_ele.appendChild(id_ele);
    container_ele.appendChild(logo_ele);
    container_ele.appendChild(name_ele);
    container_ele.appendChild(symbol_ele);
    container_ele.appendChild(anchor_ele);

    document.getElementById('coin-search-results').appendChild(container_ele);
}

window.onload = function() {
    searchdata()
}