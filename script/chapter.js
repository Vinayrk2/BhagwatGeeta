import {objectProcessor} from "./main.js";

let urlSearch = new URLSearchParams(window.location.search)
let chapter = urlSearch.get("chapter") == undefined ? 1 : urlSearch.get("chapter") ; 



if(!isNaN(chapter) && chapter > 0 && chapter <= 18){
    settings.url = `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapter}/`
    
    $.ajax(settings).done(function (response) {

        let obj = {
            "#chapter_chapter_name": response.name,
            "#chapter_chapter_no"  : response.chapter_number,
            "#chapter_name_translated":response.name_translated,
            "#chapter_name_meaning": response.name_meaning,
            "#chapter_verse_count" : response.verses_count,
            "#chapter_summary_hindi":response.chapter_summary_hindi
        }
        objectProcessor(obj)
        let str = ""
        for(let i = 1; i<=response.verses_count; i++){
            if(i == 1)
            str += `<option value="${1}" selected>${i}</option>`
            else
            str += `<option value="${i}">${i}</option>`
        }
        $("#verse_dropdown").html(str)
    })

    setVerse(1)

}
$("#verse_dropdown").change(function(e){
    let verse = (e.target.value)
    setVerse(verse)
})

function setVerse(verse){
    settings.url = `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapter}/verses/${verse}/`
    $("#loading").show("slow")
    $.ajax(settings).done(function (response) {

        let hindi_desc = response.commentaries.find((val,index)=>{
            return val.language == "hindi"
        }) 

        let sanskrit_desc = response.commentaries.find((val,index)=>{
            return val.language == "sanskrit"
        })

        let english_desc = response.commentaries.find((val,index)=>{
            return val.language == "english"
        })

        console.log(english_desc)

        console.log(response.commentaries)
        let obj = {
            "#chapter_verse_title":response.slug,
            "#chapter_verse_quote":response.text,
            "#chapter_verse_english_pro":response.transliteration,
            "#chapter_verse_hindi":hindi_desc.description,   
            "#chapter_verse_sanskrit":sanskrit_desc.description,
            "#chapter_verse_english":english_desc.description.split("?").join("<br>"),
            "#chapter_verse_sanskrit_author":" - "+sanskrit_desc.author_name,
            "#chapter_verse_hindi_author":" -"+hindi_desc.author_name,
            "#chapter_verse_english_author":" -"+english_desc.author_name
        }

        objectProcessor(obj)
        $("#loading").hide("slow")
    });
}

