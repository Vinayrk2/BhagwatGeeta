const loadLink = ()=>{
  if(window.location.search)
  {
  let param = new URLSearchParams(window.location.search)
  const search = param.get("page")
  let url = ""

  switch(search){
    case "home":
      url = "res/home.html"
      break;

    case "chapter":
      url = "res/chapter.html"
      break

    

    default:
      $.ajax(settings).done(function (response) {
      console.log(response);
      generateDiv(response,addevent)

});
      
}
  $.get(url,function(res){
    $("#mainContainer").html(res)
  })

  }
  else{
    $.ajax(settings).done(function (response) {
      console.log(response);
      generateDiv(response,addevent)
  })
  }
}

window.addEventListener("load",loadLink)

