export function objectProcessor(obj){
    try{
    for(let ele in obj){
        if(($(String(ele))).length != 0){
            $(ele).html(obj[ele])
        }
    }
}
    catch(Exception){
        console.error(Exception)
   }
}

export function formatText(text){
    return ""
}
