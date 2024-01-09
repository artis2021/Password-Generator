import express from 'express'
import cors from 'cors'
import generator from 'generate-password'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3000, () => {
    console.log(`server is running on the port 3000`)
})

app.post('/generate', (req, res) => {
    const data = req.body
    // console.log(data)
    // res.json({
    //     message: "data receive successfully"
    // })
    if(!data.length)
    {
        res.json({
            success: false,
            message: "Please provide the length of password"
        })
        return
    }
    if(!data.lowerCase && !data.upperCase && !data.number && !data.symbol){
        res.json({
            success: false,
            message: "Please provide atleast 1 of the above option."
        })
        return
    }

    if(data.length<6 || data.length>20)
    {
        res.json({
            success: false,
            message: "Length of the password must be between 6 to 20." 
        })
        return 
    }

    const password = generator.generate({
        length: data.length,
        numbers: data.number,
        symbols: data.symbol,
        lowercase: data.lowerCase,
        uppercase: data.upperCase
    })

    
    res.json({
        success: true,
        data: password
    })

})