class Default
{
    constructor()
    {
        this.tickets = 0
        this.list = {}
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

    toggleElem(elem) {
        elem.classList.toggle('checked')
        let inv_number = elem.getAttribute("data-inv-number")
        if (elem.classList.contains('checked')) {

            this.list[inv_number] = {
                text: elem.querySelector('.item_desc').innerText,
                price: elem.querySelector('.item_cost').innerText
            }
        } else {
            delete(this.list[inv_number])
        }
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