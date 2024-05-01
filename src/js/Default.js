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

    addElem(key, elem) {
        this.list[key] = elem
    }

    removeElem(key) {
        delete(this.list[key])
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