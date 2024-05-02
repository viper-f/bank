class Default
{
    constructor()
    {
        this.tickets = 0
        this.list = {
            positive: {},
            negative: {}
        }
        this.message_input = document.getElementById('main-reply')
    }

    getTickets()
    {
        return this.tickets;
    }

    async setMarkup()
    {
        let items_positive = document.querySelectorAll('#kings_html_wrapper-positive .bank_list-item-inner')
        items_positive.forEach((item, i) => {
            item.setAttribute("data-inv-number", 'Default-'+i)
            item.onclick = function() {bank.modules['Default'].toggleElem(item);}
        })

        let items_negative = document.querySelectorAll('#kings_html_wrapper-negative .bank_list-item-inner')
        items_negative.forEach((item, i) => {
            item.setAttribute("data-inv-number", 'Default-'+i)
            item.onclick = function() {bank.modules['Default'].toggleElem(item, true);}
        })
    }

    toggleElem(elem, negative = false)
    {
        let list = this.list.positive;
        if(negative) {
            list = this.list.negative;
        }

        elem.classList.toggle('checked')
        let inv_number = elem.getAttribute("data-inv-number")
        if (elem.classList.contains('checked')) {

            list[inv_number] = {
                text: elem.querySelector('.item_desc').innerText,
                price_string: elem.querySelector('.item_cost').innerText,
                price: this.extractPrice(elem.querySelector('.item_cost').innerText)
            }
        } else {
            delete(list[inv_number])
        }
        this.setMessageText()
    }

    extractPrice(price_string)
    {
        return parseInt(price_string.split(' ')[0])
    }

    formMessageText()
    {
        let message = ''
        let total = 0
        if(Object.keys(this.list.positive).length) {
            message += '[b]Добавить: [/b]\n'
            for (const [index, item] of Object.entries(this.list.positive)) {
                total += item.price
                message += item.text + ' - ' + item.price_string + "\n"
            }
        }

        if(Object.keys(this.list.negative).length) {
            message += '[b]Вычесть: [/b]\n'
            for (const [index, item] of Object.entries(this.list.negative)) {
                total -= item.price
                message += item.text + ' - ' + item.price_string + "\n"
            }
        }
        message += "\n\nИтого: " + this.tickets + " + " + total + " = " + (this.tickets + total)
        return message
    }

    setMessageText()
    {
        this.message_input.value = this.formMessageText()
    }

    load(storage_state)
    {
        if (typeof UserFld3 !== 'undefined') {
            let numberPattern = /\d+/g;
            this.tickets = UserFld3.match(numberPattern)[0];
        }
    }

    save()
    {
        return {}
    }
}