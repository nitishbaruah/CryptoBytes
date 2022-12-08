// https://api.coingecko.com/api/v3/search/trending
// https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr

function convertTojson(response){
    return response.json();
}


function windowloaded(){
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr')
    .then(convertTojson)
    .then(loadcoindata);

}

function loadcoindata(data){
    const conversionrate=data.bitcoin.inr;
    fetch('https://api.coingecko.com/api/v3/search/trending')
    .then(convertTojson)
    .then(function(data){
        renderprice(data, conversionrate);
    });
}
function renderprice(data,conversionrate){

    //console.log(conversionrate);
    for(let i=0;i<data.coins.length;i++){
        const singlecoin=data.coins[i].item;
        //console.log(singlecoin);
        const logo=singlecoin.large;
        const cname=`${singlecoin.name} (${singlecoin.name})`;
        const price=Math.round(singlecoin.price_btc * conversionrate*10000)/10000;
        insertTocard(logo, cname, price);
    }
   
}

function insertTocard(logo, name, price){
    const price_paragraph=document.createElement('p');
    price_paragraph.innerText=`₹ ${price}`;

    const name_head=document.createElement('h1');
    name_head.innerText=name;

    const rightcontainer=document.createElement('div');
    rightcontainer.classList.add('right_card');
    rightcontainer.appendChild(name_head);
    rightcontainer.appendChild(price_paragraph);

    const image=document.createElement('img');
    image.src=logo;
    image.classList.add('card_image');
    image.alt='coin image';

    const card_container=document.createElement('div');
    card_container.classList.add('flex_card', 'card');
    card_container.appendChild(image);
    card_container.appendChild(rightcontainer);
    document.getElementById('coins-container').appendChild(card_container);

     
    /*
    <div class="flex_cards card">
                <img class="card_image " src="image/logo.png" alt="bitcoin">
                <div class="right_card">
                    <h1>Bitcoin</h1>
                    <p>₹ 3000000</p>
                </div>
            </div>
    */


}

window.onload = function() {
    windowloaded();
}

