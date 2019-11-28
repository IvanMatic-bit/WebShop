var parent = document.getElementsByClassName("navDonji");
var dijete = document.getElementsByClassName("dijetenavDonji");



for(let i=0;i<parent.length;i++)
{
    parent[i].addEventListener("click", function(){
       

        if(dijete[i].style.height!="0px")
        {
           
            dijete[i].style.height="0px";
            
        }
        else{
           
            dijete[i].style.height= dijete[i].scrollHeight+ "px";
          
            if(document.documentElement.clientWidth <600)
        {
            for(let j=0;j<parent.length;j++)
            {
                if(j!=i)
                {
                    dijete[j].style.height="0px";
                }
            }
        }
        }
        
    });
}

var slideDIV = document.getElementById("navJS");
slideDIV.addEventListener("mouseover", function(){
    this.style.width = "30%";
    this.style.color ="white";
})

slideDIV.addEventListener("mouseout", function(){
    this.style.width="10%";
    this.style.color ="transparent";
  
})

$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Unos nije validan!"
);

var forma = $("#forma");


forma.validate({
    rules: {
        dostavaIme: {
            regex: /^[a-zA-z ]+$/,
            required: true
        },
        dostavaAdresa: {
            required:true,
        },
        dostavaPostanskiBroj: {
            required:true,
	    regex: /^[0-9]{5}$/,
            minlength:5,
            maxlength:5
        },
        dostavaTelefon: {
            required:true,
            regex: /^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}$/
        }
    },
    messages: {
        dostavaIme:{
            regex: "Dozvoljen je unos samo slova",
            required: "Morate unijeti ime kupca!"
        },
        dostavaAdresa: {
            required: "Morate unijeti adresu!"
        },
        dostavaPostanskiBroj: {
            required: "Morate unijeti poštanski broj!",
            regex: "Poštanski broj mora biti brojčana vrijednost od 5 cifara!",
            minlength: "Poštanski broj mora sadržavati 5 cifara!",
            maxlength: "Poštanski broj mora sadržavati 5 cifara!"
        },
        dostavaTelefon: {
            required: "Morate unijeti broj telefona!",
            regex: "Telefon mora biti unijet u formatu: +387-11-123-1234"
        }
    }
});


function Preuzmi() {
    // $("tbody").html('');
    var mojUrl="https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/GetProizvodiAll";
    var zahtjev = new XMLHttpRequest();

    zahtjev.onload = function () {
        if (zahtjev.status === 200) {
            var x = zahtjev.responseText;
            var y = JSON.parse(x);
            for (let i = 0; i < y.length; i++) {
                
               
                $("#tabelaProizvoda tbody").append('<tr class="red"><td id="p"+i>' + y[i].proizvodID + '</td><td>' + y[i].naziv + '</td><td class="imet">' + y[i].cijena + '</td><td>' + y[i].jedinicaMjere + '</td></tr>');

            }
        }
        else {
            alert("Server javlja grešku: " + zahtjev.statusText);
        }
    }

    zahtjev.onerror = function () {
        alert("Greška u komunikaciji sa serverom.");
    };

    zahtjev.open("GET", mojUrl, true);
    zahtjev.setRequestHeader("Content-Type", "application/json");
    zahtjev.send(null);


}
window.onload = Preuzmi();

  
var links = $('.red')


function Submit()
{
    if(forma.valid())
    {
        event.preventDefault();
        var podaci=new Object();
        var mojUrl = "http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/Dodaj";
        podaci.dostavaGrad = document.getElementById("gradDostava").value;
        podaci.dostavaAdresa = document.getElementById("dostavaAdresa").value;
        podaci.dostavaIme =document.getElementById("dostavaIme").value;
        podaci.dostavaIme = document.getElementById("dostavaTelefon").value;
        podaci.proizvodId = document.getElementById("ProizvodID").value;
        podaci.opcijaModel =document.getElementById("napomena").value;

        var strJSON= JSON.stringify(podaci);
        var zahtjev=new XMLHttpRequest();

        zahtjev.onload = function()
        {
            if(zahtjev.status==200)
            {
                alert(zahtjev.responseText);
            }
            else
            {
                alert("Server javlja gresku "+zahtjev.statusText);
            }
        }

        zahtjev.onerror = function()
        {
            alert("Greska u komunikaciji sa serverom");
        }
        zahtjev.open("POST", mojUrl, true);
        zahtjev.setRequestHeader("Content-Type", "application/json");
        zahtjev.send(strJSON);
        $("#narudzbe tbody").html('');
        Preuzmi();
    }
}

function PreuzmiNarudzbe()
{
    $("tbody").html('');
    var zahtjev= new XMLHttpRequest();
    var mojUrl="http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetNarudzbeAll";
    zahtjev.onload = function()
    {
        if(zahtjev.status==200)
        {
            var x=zahtjev.responseText;
            var y=JSON.parse(x);
            
            for(let i=0;i<y.length;i++)
            {
                $("#narudzbe").append("<tr><td>"+y[i].proizvodID+"</td><td>"+y[i].naziv +"</td><td>"+y[i].cijena+"</td><td>"+y[i].kolicina+"</td><td>"+y[i].iznos+"</td><td>"+y[i].jedinicaMjere+"</td><td>"+y[i].opcijaModel+"</td><tr>");
            }
        }
        else
        {
            alert("Server javlja gresku "+zahtjev.statusText);
        }

    }

    zahtjev.onerror=function()
    {
        alert("Greska u komunikaciji sa serverom");
    }
    zahtjev.open("GET", mojUrl, true);
    zahtjev.setRequestHeader("Content-Type", "application/json");
    zahtjev.send(null);
    


}
window.onload = PreuzmiNarudzbe();
var url="https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/GetProizvodiAll";
$.get(url, function(n){
    for(let i=0;i<n.length;i++)
    {
        document.getElementById("ProizvodID").innerHTML +="<option value='>"+n[i].proizvodID+"'>"+n[i].naziv+"</option>";
    }
})
