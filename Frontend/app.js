const btn = document.querySelector("button");

btn.addEventListener("click",() => {
    const inputNumber = document.querySelector("#numberInput")
    const lowerCase = document.querySelector("#lowercase")
    const upperCase = document.querySelector("#uppercase")
    const number = document.querySelector("#number")
    const symbol = document.querySelector("#symbol")

    const data = {
        length: parseInt(inputNumber.value),
        lowerCase: lowerCase.checked,
        upperCase: upperCase.checked,
        number: number.checked,
        symbol: symbol.checked
    }

    const baseURL = "http://localhost:3000"
    fetch(`${baseURL}/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        if(data.success == false)
        {
            const output = document.querySelector("#output")
            output.innerHTML = ''
            const p = document.createElement("p")
            p.innerText = data.message
            p.setAttribute("id", "err")
            output.append(p)
            return 
        }
        else{
            const output = document.querySelector("#output")
            output.innerHTML = ''
            const p = document.createElement("p")
            p.innerText = data.data
            output.append(p)
            p.setAttribute("id", "success")
        }
    })
    .catch((err) => {
        console.log(err)
    })
})