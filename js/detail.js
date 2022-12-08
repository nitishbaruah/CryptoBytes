//https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false

function searchdata() {
    const currenturl= window.location.href;
    const url_obj=new URL(currenturl);
    const params = new URLSearchParams(url_obj.search);
    if(!params.has('id')){
        window.location.href="/";

    }

    fetch(`https://api.coingecko.com/api/v3/coins/${params.get('id')}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
    .then(convertTojson)
    .then(render);


}


function render(data){
    //console.log(data);
    const name = `${data.name} (${data.symbol})`;
    const description = data.description.en;
    const logo=data.image.large;
    const inr= data.market_data.current_price.inr; 
    const usd= data.market_data.current_price.usd;
    const eur= data.market_data.current_price.eur;
    const gbp=data.market_data.current_price.gbp;
    

    document.getElementById('coin-name').innerText=name;
    document.getElementById('coin-desc').innerHTML=description;
    document.getElementById('coin-logo').src=logo;

    document.getElementById('inr').innerText=inr;
    document.getElementById('usd').innerText=usd;
    document.getElementById('eur').innerText=eur;
    document.getElementById('gbp').innerText=gbp;


}

/*
    <div class="main-content">
            <h1>Bitcoin</h1>
            <div class="flex-container  worth">
                <p>INR: 2000000000</p>
                <p>EUR: 333333</p>
                <p>USD: 29999999</p>
            </div>

            <p class="description">Description</p>
            <p>of this wrinkled for sportive tricks,
                Our steeds
                To fright the clouds the souls of York;
                And now, instead of a lute.
                But I, that am not shaped for monuments;
                I, that am rudely stamp'd, and with victo
            </p>
        </div>
*/
window.onload = function() {
    searchdata();
} 