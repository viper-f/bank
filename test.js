callApi = function (method, parameters = false)
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

saveStorageState = function ()
{
    return this.callApi('storage.set', {
        token: ForumAPITicket,
        key: "bank",
        value: "something"
    })
        .then((response) => {
            if (response.status !== 200) {
                console.log('State was not saved')
            }
            return response.text()})
}


let button = document.querySelector('#post .button.submit')
button.addEventListener("click", function (e) {
    saveStorageState()
});


callApi('storage.get', {key: "bank"})
    .then((response) => {
        if (response.status !== 200) {
            this.state = {}
        }
        return response.text()})
    .then((text) => {
        console.log(text)
    })