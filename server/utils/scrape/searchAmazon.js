const puppeteer = require("puppeteer-extra")
const StealthPlugin = require("puppeteer-extra-plugin-stealth")
const { executablePath } = require("puppeteer")

const searchAmazon = async (searchLink) => {
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: executablePath()
    })
    const page = await browser.newPage()
    await page.goto(searchLink)
    await page.waitForSelector("#sns-base-price")
    const result = await page.evaluate(() => {
        const price = document.querySelector("#sns-base-price").innerText
        return price
    })

    await browser.close()
    return result
}


// Can Pass In Any Search Term We Want ----- Test With This -----

let productLink = "https://www.amazon.ca/Royale-Velour-Plush-Toilet-tissues/dp/B082TDBJLQ/ref=sr_1_3?crid=6UHTW9PTWUKS&keywords=Original+Toilet+Paper%2C+12%3D24+Rolls%2C+242+Bath+Tissues+per+roll&qid=1680104407&sprefix=original+toilet+paper%2C+12+24+rolls%2C+242+bath+tissues+per+roll%2Caps%2C423&sr=8-3"
searchAmazon(productLink).then((result) => console.log(result))

