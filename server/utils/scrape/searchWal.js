const puppeteer = require("puppeteer-extra")
const StealthPlugin = require("puppeteer-extra-plugin-stealth")
const { executablePath } = require("puppeteer")

const { formatPrice } = require("./formatPrice")

const searchWal = async (searchLink) => {
  puppeteer.use(StealthPlugin())
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: executablePath()
  })
  const page = await browser.newPage()
  await page.goto(searchLink)
  await page.waitForSelector("#main-buybox > div.css-jl2ki2.e1yn5b3f3 > div.css-64alzf.e1yn5b3f8 > div > div.css-r6pcoo.e1906lj51 > div > div > div > span > span")
  var result = await page.evaluate(() => {
    const price = document.querySelector("#main-buybox > div.css-jl2ki2.e1yn5b3f3 > div.css-64alzf.e1yn5b3f8 > div > div.css-r6pcoo.e1906lj51 > div > div > div > span > span").innerText
    return price
  })

  result = formatPrice(result)

  await browser.close()
  return result
} 

// Can Pass In Any Search Term We Want ----- Test With This -----
//let productLink = "https://www.walmart.ca/en/ip/Royale-Velour-Toilet-Paper-12-Equals-48-Rolls-284-Bath-Tissues-per-roll-12-Rolls-Pack-of-1/PRD1VKQXEDKI4ZR"
//searchWal(productLink).then((result) => console.log(result))

module.exports = { searchWal }