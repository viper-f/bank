class Bank
{
    constructor(modules) {
        this.modules = modules
        this.state = {}
        this.userId = UserID
        this.boardId = BoardID
    }

    callApiGet(parameters = false)
    {
        let p = ''
        if (parameters) {
            p = []
            for (const [key, value] of Object.entries(parameters)) {
                p.push(key + '=' + value);
            }
            p = p.join('&')
        }

        return fetch('https://frpgtools.com/storage/get?' + p).then((value) => {
            return value
        })
    }

    callApiPost(body)
    {
        return fetch('https://frpgtools.com/storage/post', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: body
        }).then((value) => {
            return value
        })
    }

    loadStorageState()
    {
        return this.callApiGet({key: "bank", user_id: this.userId, board_id: this.boardId})
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
                    this.state = text.response.bank;
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
        for (const [module_name, module] of Object.entries(this.modules)) {
                this.state[module_name] = module.save()
            }
        return this.callApiPost(JSON.stringify({
            user_id: this.userId,
            board_id: this.boardId,
            key: "bank",
            type: "json",
            value: this.state
        }))
            .then((response) => {
                if (response.status !== 200) {
                   console.log('State was not saved')
                }
                return response.text()})
    }


}