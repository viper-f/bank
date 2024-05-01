class Default
{
    constructor()
    {
        this.tickets = 0
        this.list = {}
        this.message_input = document.getElementById('main-reply')
    }

    getTickets()
    {
        return this.tickets;
    }

    async setMarkup()
    {
        let items = document.querySelectorAll('.bank_list-item-inner')
        items.forEach((item, i) => {
            item.setAttribute("data-inv-number", 'Default-'+i)
            item.onclick = function() {bank.modules['Default'].toggleElem(item);}
        })
    }

    toggleElem(elem)
    {
        elem.classList.toggle('checked')
        let inv_number = elem.getAttribute("data-inv-number")
        if (elem.classList.contains('checked')) {

            this.list[inv_number] = {
                text: elem.querySelector('.item_desc').innerText,
                price_string: elem.querySelector('.item_cost').innerText,
                price: this.extractPrice(elem.querySelector('.item_cost').innerText)
            }
        } else {
            delete(this.list[inv_number])
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
        for (const [index, item] of Object.entries(this.list)) {
            total += item.price
            message += item.text + ' - ' + item.price_string + "\n"
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