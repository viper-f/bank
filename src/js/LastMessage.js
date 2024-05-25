class LastMessage
{
    constructor() {
        this.lastMessageHref = null;
        this.username = UserLogin
    }

    async setMarkup() {
        let button_placeholder = document.getElementById('last-message-placeholder')
        if (button_placeholder) {
            await this.getMessageHref(this.username)
            if (this.lastMessageHref !== null) {
                button_placeholder.innerHTML = '<a id="last-message-link" href="' + this.lastMessageHref + '">Последний пост в банке</a>';
            }
        }
    }

    load(storage_state) {
        if (storage_state['last_massage_id']) {
            this.previous_date = storage_state['last_massage_id']
        }
    }

    async fetch_decoded(url) {
        return await fetch(url)
            .then(function (response) {
                return response.arrayBuffer();
            })
            .then(function (buffer) {
                const decoder = new TextDecoder('windows-1251');
                return decoder.decode(buffer);
            })
    }

    async findLastPage(user_name) {
        const parser = new DOMParser();
        let url = '/search.php?action=search&keywords=&author=' + user_name + '&forum=7&search_in=0&sort_dir=DESC&show_as=posts&topics=&p=1'
        const html = await this.fetch_decoded(url)
        const htmlDoc = parser.parseFromString(html, 'text/html')
        let last_page = 1
        const links = htmlDoc.querySelectorAll("div.pagelink a")
        if (!links || links.length === 0) {
            return last_page
        }

        links.forEach(function (link) {
            const t = link.textContent
            if (this.isNumeric(t) && parseInt(t) > last_page)
                last_page = parseInt(t)
        })
        return last_page
    }

    async getMessageHref(user_name) {
        const parser = new DOMParser();
        const topicName = 'билеты'

            const last_page = await this.findLastPage(user_name)

            for (let n = 1; n <= last_page; n++) {

                const url = '/search.php?action=search&keywords=&author=' + this.username + '&forum=' + subforum + '&search_in=0&sort_dir=DESC&show_as=posts&topics=&p=' + n
                const html = await this.fetch_decoded(url)
                const htmlDoc = parser.parseFromString(html, 'text/html')

                for (let post of htmlDoc.querySelectorAll('div.post')) {
                    const header_links = post.querySelectorAll('h3 a')

                    const href = header_links[2]['href']
                    const topic_title = header_links[1].text

                    if (topic_title.toLowerCase().indexOf(topicName) !== 1) {
                        this.lastMessageHref = href
                        return true
                    }
                }
            }
            return true
    }


    save() {
        return {
            last_massage_id: this.last_massage_id
        }
    }


}