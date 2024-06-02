const cheerio = require('cheerio');
const axios = require('axios')

const fetchData = async (url) => {
    var res = await axios.get(url)
    return res.data
}

async function main(url) {
    const content = await fetchData(url) 
    const $ = cheerio.load(content)
    var dados = []
    var dad = []
    var obj = {
        name: null,
        userName: null,
        profilePic: null,
        followers: null,
        following: null,
        folders: dad
        }
    $('div#mweb-unauth-container').each((i, e) => {
        var profilePic = $('div.Jea > div > div > div > div > img').attr('src')
        var name = $('div.hjj.zI7 > div > h1 > div').text()
        var userName = $('div.hjj.zI7 > div.KS5.hs0 > div.KS5.hs0 > div > span').text()
        var followers = $('div.Jea.hjj > div.Jea.KS5 > div.CCY.S9z > div.CCY.S9z > div').text()
        var following = $('div[data-test-id="follower-count"] > div > div > div').text()
        obj.name = name
        obj.profilePic = profilePic
        obj.userName = userName
        obj.followers = followers
        obj.following = following
    })
    $('div.vbI.XiG .JME > a > div > div > div > div[data-test-id="board-card-title"] > div.tBJ').each((i, e) => {
        dad.push($(e).text())
    })
    dados.push(obj)
    console.log(dados)
}
main('https://br.pinterest.com/yraiizx');