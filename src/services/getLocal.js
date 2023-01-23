function getInfo() {

    var info = localStorage.getItem("image-info")
    if (info != null ) {
        var item = JSON.parse( info )
        return item
    }
    else{
        return null
    }
 
}
export default getInfo;