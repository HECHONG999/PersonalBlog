function getNow() {
    return parseInt(new Date().getTime() / 1000) 
}


module.exports  = {
    "getNow": getNow
}