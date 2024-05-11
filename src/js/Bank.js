class Bank
{
    constructor(modules) {
        this.modules = modules
        this.state = {}

    }

    callApi(method, parameters = false)
    {
        let p = ''
        if (parameters) {
            p = []
            for (const [key, value] of Object.entries(parameters)) {
                p.push(key + '=' + value);
            }
            p = p.join('&')
        }

        return fetch('/api.php?method='+method + '&' + p).then((value) => {
            return value
        })
    }

    loadStorageState()
    {
        return this.callApi('storage.get', {key: "bank"})
            .then((response) => {
                if (response.status !== 200) {
                    this.state = {}
                }
                return response.text()})
            .then((text) => {
                text = JSON.parse(text);
                if (text.error) {
                    this.state = {}
                } else {
                    this.state = text.response.storage.data.bank;
                }
            for (const [module_name, module] of Object.entries(this.modules)) {
                if(!this.state[module_name]) {
                    this.state[module_name] = {}
                }
                module.load(this.state[module_name])
            }
        })
    }

    setMarkup()
    {
        this.loadStorageState().then(() => {
            for (const [module_name, module] of Object.entries(this.modules)) {
                if(!this.state[module_name]) {
                    this.state[module_name] = {}
                }
                module.setMarkup(this.state[module_name])
            }
        })

        let button = document.querySelector('#post .button.submit')
        button.addEventListener("click", function (e) {
            bank.saveStorageState()
        });
    }

    saveStorageState()
    {
        return this.callApi('storage.set', {
            token: ForumAPITicket,
            key: "bank",
            value: JSON.stringify(this.state)
        })
            .then((response) => {
                if (response.status !== 200) {
                   console.log('State was not saved')
                }
                return response.text()})
    }


}