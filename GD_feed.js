function toJSONLocal (date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
}

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

$(document).ready(function(){

    // select * from htmlstring where url='https://live.givedirectly.org' and xpath='//div[@class="card recipient-card"]'
    // var yql = "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20htmlstring%20WHERE%20url%3D%22https%3A%2F%2Flive.givedirectly.org%22%20and%20xpath%3D%22%2F%2Fdiv%5B%40id%3D'recipient-cards'%5D%2Fdiv%22%20%7C%20truncate(count%3D3)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";

    var yql = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20htmlstring%20where%20url%3D'https%3A%2F%2Flive.givedirectly.org'%20and%20xpath%3D'%2F%2Fdiv%5Bcontains(%40id%2C%22recipient-cards%22)%5D%2Fchild%3A%3A*'&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";


    $.get(yql, function(result){

            var res = result.query.results.result;
            console.log(res);
            res = res.replace(/<span class="card-highlight">/g, "<a href='https://live.givedirectly.org' class='profile-link'>");
            res = res.replace(/<\/span>/g, "<\/a>");

            console.log("res:" + res);

            var recipientCards = document.getElementById("recipient-cards");
            // recipientCards.innerHTML = res;

            res = decodeHtml(res);

            console.log(res);

            $('#recipient-cards').html(res);

            })
            .done(function() {
                $('.card.recipient-card').each(function() {
                    console.log(this);
                    //console.log(this.childNodes);
                    var linksrc = this.childNodes[1].getAttribute('href');
                    console.log(linksrc);
                    var link = this.childNodes[6];
                    var link = this.childNodes[5].childNodes[7].childNodes[1];
                    console.log(link);
                    var newlink = "https://live.givedirectly.org" + linksrc;
                    link.setAttribute("target", "_blank");
                    link.setAttribute("href", newlink);

                    var link2 = this.childNodes[3].childNodes[1];
                    link2.setAttribute("target", "_blank");
                    link2.setAttribute("href", newlink);

                })

              console.log( "second success" );
            })

            .fail(function() {
              console.log( "error" );
            })


    });