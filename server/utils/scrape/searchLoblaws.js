const puppeteer = require("puppeteer-extra")
const StealthPlugin = require("puppeteer-extra-plugin-stealth")
const { executablePath } = require("puppeteer")

const { formatPrice } = require("./formatPrice")

const searchLoblaws = async (searchLink) => {
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: executablePath()
    })
    const page = await browser.newPage()
    await page.goto(searchLink)
    await page.waitForSelector("#site-content > div > div > div.product-tracking > div.product-details-page-details > div.product-details-page-details__content__name > div > div > div.product-details-page-details__content__sticky-placeholder > div > div.product-details-page-details__content__prices > div > div > div > span > span.price__value.selling-price-list__item__price.selling-price-list__item__price--now-price__value")
    var result = await page.evaluate(() => {
        const price = document.querySelector("#site-content > div > div > div.product-tracking > div.product-details-page-details > div.product-details-page-details__content__name > div > div > div.product-details-page-details__content__sticky-placeholder > div > div.product-details-page-details__content__prices > div > div > div > span > span.price__value.selling-price-list__item__price.selling-price-list__item__price--now-price__value").innerText
        return price
    })

    result = formatPrice(result)

    await browser.close()
    return result
}


// Can Pass In Any Search Term We Want ----- Test With This -----
//let productLink = "https://www.loblaws.ca/original-toilet-paper-12-24-rolls-242-bath-tissues/p/21363770_EA"
//searchLoblaws(productLink).then((result) => console.log(result))

module.exports = { searchLoblaws }