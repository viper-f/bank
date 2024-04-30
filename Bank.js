class Bank
{
    constructor(module_names) {
        this.module_names = module_names;
        this.modules = {}
    }
    init()
    {
        this.module_names.forEach((module_name) => {
            this.modules[module_name] = new module_name();
        })
    }

    loadStorageState()
    {

    }
}