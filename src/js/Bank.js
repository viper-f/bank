class Bank
{
    constructor(module_names) {
        this.module_names = module_names;
        this.modules = {}
        this.state = {}
        this.module_names.forEach((module_name) => {
            this.modules[module_name] = new module_name();
        })
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

        return fetch('/api.php?method='+method + p).then((value) => {
            return value
        })
    }

    loadStorageState()
    {
        return this.callApi('storage.get', {key: "bank"}).then((value) => {
            this.state = JSON.parse(value.text())
            for (const [module_name, module] of Object.entries(this.modules)) {
                if(!this.state[module_name]) {
                    this.state[module_name] = {}
                }
                module.load(this.state[module_name])
            }
        })
    }

    addItem(key, elem)
    {
            this.modules['Default'].addElem(key, elem)
    }

    removeItem(key)
    {
        this.modules['Default'].removeElem(key)
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
    }


}