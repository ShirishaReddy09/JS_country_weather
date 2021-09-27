fetch("https://restcountries.com/v3/all")
.then(function(coun_data){
    return coun_data.json()
})
.then(function(coun_json){
    console.log(coun_json)
    var temp=0
    for(var i=0;i<(coun_json.length/3)-1;i++)
    {
        var div=document.createElement("div")
        div.setAttribute("class","row")
        
        
        
        for(var j=0;j<3;j++)
        {
            console.log(coun_json[temp])

            var div2=document.createElement("div")
            div2.setAttribute("class","col-lg-4 col-sm-12 card")
            div2.setAttribute("id",temp)
            div2.setAttribute("style","border:1px solid")
            div2.style.backgroundColor="#E8C8C8"
            div.appendChild(div2)

            var divhead=document.createElement("div")
            divhead.setAttribute("class","card-header text-center")
            divhead.setAttribute("style","background-color: black;color:white;")
            divhead.innerHTML="<b>"+coun_json[temp].name.common
            div2.appendChild(divhead)

            var divbody=document.createElement("div")
            divbody.setAttribute("class","card-body text-center")

            var flag=document.createElement("img")
            flag.setAttribute("src",coun_json[temp].flags[0])
            flag.setAttribute("height","100px")
            flag.setAttribute("width","140px")
            divbody.appendChild(flag)

            var coun=document.createElement("p")
            coun.style.fontSize="13px"
            coun.style.marginTop="20px"
            coun.style.marginBottom="0px"
            coun.style.margin="0px"
            if (coun_json[temp].hasOwnProperty('cca3')) {
                coun.innerHTML="<b>Country Code :</b> "+coun_json[temp].cca3
            }
            else {
                coun.innerHTML="<b>Country Code :</b> NA"
            } divbody.appendChild(coun)

            var cap=document.createElement("p")
            cap.style.fontSize="13px"
            cap.style.margin="0px"
            if (coun_json[temp].hasOwnProperty('capital')) {
                cap.innerHTML="<b>Capital :</b> "+coun_json[temp].capital[0]
            }
            else {
                cap.innerHTML="<b>Capital :</b> "+coun_json[temp].name.common
            } divbody.appendChild(cap)

            var latlng=document.createElement("p")
            latlng.style.fontSize="13px"
            latlng.style.margin="0px"
            if (coun_json[temp].hasOwnProperty('latlng')) {
                latlng.innerHTML="<b>Latlng:</b> "+coun_json[temp].latlng[0]+",&ensp;"+coun_json[temp].latlng[1]
            }
            else {
                latlng.innerHTML="<b>latitude :</b> NA<br><b>longitude :</b> NA"
            } divbody.appendChild(latlng)

            var reg=document.createElement("p")
            reg.style.fontSize="13px"
            reg.style.margin="0px"
            if (coun_json[temp].hasOwnProperty('region')) {
                reg.innerHTML="<b>Region :</b> "+coun_json[temp].region
            }
            else {
                reg.innerHTML="<b>Region :</b> NA"
            } divbody.appendChild(reg)

            

            var btn=document.createElement("button")
            btn.setAttribute("class","btn btn-primary")
            btn.setAttribute("data-bs-toggle","modal")
            btn.setAttribute("data-bs-target","#exampleModal")
            btn.setAttribute("onclick","weather("+temp+")")
            btn.style.backgroundColor="#EC0303"
            btn.style.marginTop="10px"
            btn.innerHTML="Click for Weather"
            divbody.appendChild(btn)

            div2.appendChild(divbody)

            temp=temp+1
        }
        document.getElementById("container").appendChild(div)
        
    }
    

})
.catch(function(error){
    document.getElementById("data").innerHTML=error
})

function weather(val)
{
    fetch("https://restcountries.com/v3/all")
    .then(function(coun_data){
        return coun_data.json()
    })
    .then(function(coun_json){
        var div=document.createElement("div")
        div.setAttribute("class","card")
        div.setAttribute("id","pop")
        div.setAttribute("style","border:1px solid")
        div.style.display="block"

        

        var divbody=document.createElement("h1")
        divbody.setAttribute("class","col-lg-3 col-sm-10 card-header text-center")
        divbody.setAttribute("id","pop-content")
        divbody.style.backgroundColor="#CCFFCC"
        divbody.innerHTML=coun_json[val].name.common
        div.appendChild(divbody)

        

        var divhead=document.createElement("hr")
        divbody.appendChild(divhead)

        

        var capital=""
        if (coun_json[val].hasOwnProperty('capital')) {
            capital=coun_json[val].capital[0]
        }
        else {
            capital=coun_json[val].name.common
        }
        console.log(coun_json[val])
        console.log(capital)

        fetch("https://api.openweathermap.org/data/2.5/weather?q="+capital+"&appid=5b4d8c39436c1af0eff180e899fde495") 
        .then(function(data){
            return data.json()
        })
        .then(function(data2){
            var temp=document.createElement("h3")
            temp.style.fontSize="18px"
            temp.style.marginTop="20px"
            temp.style.marginBottom="0px"
            temp.innerHTML="<b>Temperature : </b>"+data2.main.temp+"&ensp;Fahrenheit"
            divbody.appendChild(temp)

            var divspan=document.createElement("span")
            divspan.setAttribute("id","span")
            divspan.setAttribute("class","close")
            divspan.style.color="blue"
            divspan.innerHTML="Exit"
            divbody.appendChild(divspan)

            divspan.onclick = function() {
                divbody.style.display = "none";
                div.style.display="none"
            }

            var break1=document.createElement("br")
        divbody.appendChild(break1)

        })
        .catch(function(error){
            console.log(error)
        })

        
        

        document.body.appendChild(div)

        

    })
    .catch(function(error){
    document.getElementById("data").innerHTML=error
    })
    
}