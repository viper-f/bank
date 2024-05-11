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
    let state = {
        PostCount: {
            previous_date: "2024-05-10 12:00:00"
        }
    }
    return this.callApi('storage.set', {
        token: ForumAPITicket,
        key: "bank",
        value: JSON.stringify(state)
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
        text = JSON.parse(text);
        console.log(text.response.storage.data.bank);
    })


