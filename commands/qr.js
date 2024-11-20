export default async (event) => {
    try {
        const result = await event.reply({
            type: 'text',
            text: '你要查詢哪個城市的UBIKE',
            quickReply: {
                items: [
                    {
                        type: 'action',
                        action: {
                            type: 'message',
                            label: '台北', // 顯示在按鈕上的文字
                            text: 'ubike:taipei' // 按下後會傳給機器人的文字
                        }
                    },
                    {
                        type: 'action',
                        action: {
                            type: 'uri',
                            uri: 'https://x.com',
                            label: '推特'
                        }
                    },
                    {
                        type: 'action',
                        action: {
                            type: 'postback',
                            label: '屁眼派對',
                            data: '屁↗眼↘派↗對↘'
                        }
                    }

                ]
            }
        })
        console.log(result)
    } catch (error) {
        console.error(error)
    }
}
