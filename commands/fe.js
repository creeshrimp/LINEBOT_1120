import axios from 'axios'
import * as cheerio from 'cheerio'
import template from '../templates/fe.js'
import fs from 'node:fs'

export default async (event) => {
    try {
        const { data } = await axios.get('https://wdaweb.github.io/')
        const $ = cheerio.load(data)
        console.log($('#fe .card').text())
        const courses = []
        $('#fe .card').each(function () {
            const t = template()
            const url = new URL($(this).find('img').attr('src'), 'https://wdaweb.github.io').href
            const name = $(this).find('.card-title').text().trim()
            // const name = ''

            t.body.contents[0].url = url
            t.body.contents[2].contents[0].contents[0].contents[0].text = name

            courses.push(t)
        })
        console.log(courses)

        const result = await event.reply({
            type: 'flex',
            altText: '課程查詢結果',
            contents: {
                type: 'carousel',
                contents: courses
            }
        })

        console.log(result)

        // debug 用 (僅在測試環境執行)
        if (process.env.DEBUG === 'true' && result.message) {
            fs.writeFileSync('./dump/fe.json', JSON.stringify(courses, null, 4))
        }
    } catch (error) {
        console.log('ERROR:')
        console.error(error)
    }
}
