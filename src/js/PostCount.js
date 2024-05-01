class PostCount
{
    constructor()
    {
        this.previous_date = '2001-01-01 00:00:00';
        this.currency_dict = {
            "one": "билет",
            "two": "билета",
            "five": "билетов",
            "pricelist": [{
                "min": 0,
                "max": 5000,
                "price": 1
            },
                {
                    "min": 5001,
                    "max": 10000,
                    "price": 2
                },
                {
                    "min": 10001,
                    "max": 15000,
                    "price": 3
                },
                {
                    "min": 15001,
                    "price": 4
                }]
        }

        this.subforums = [10, 11, 9, 19, 20];
    }

    async setMarkup()
    {
        let button_placeholder = document.getElementById('post-count-button-placeholder')
        if (previous) {
            button_placeholder.innerHTML = '<a onclick="calculate()" class="tickets-count-btn">Принять</a>';
        }

        let previous = document.getElementById('post-count-previous')
        if (previous) {
            previous.value = this.previous_date
        }
    }

    load(storage_state)
    {
        if (storage_state['previous_date']) {
            this.previous_date = storage_state['previous_date']
        }
    }

    save()
    {
        return {
            previous_date: this.previous_date
        }
    }


}