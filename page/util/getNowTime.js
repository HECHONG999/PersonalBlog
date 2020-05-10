export default function getNowTime(time) {
    var nowTime =  parseInt( time + "000")
    var date = new Date(nowTime);
    var year = date.getFullYear()
    var months = date.getMonth() + 1;
    var day = date.getDate()
    return {
        year,
        months,
        day
    }
}

