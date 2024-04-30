class Default
{
    constructor()
    {
        this.tickets = 0
    }

    getTickets()
    {
        return this.tickets;
    }

    load(storage_state)
    {
        if (typeof UserFld3 !== 'undefined') {
            let numberPattern = /\d+/g;
            this.tickets = UserFld3.match(numberPattern)[0];
        }
        document.getElementById('tickets').innerText = this.tickets;
    }

    save()
    {
        return {}
    }
}