const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.setHeader("Content-Type", "application/json")
  res.json(
    [
      {
        name: "joe",
        age: 30
      },
      {
        name: "sarah",
        age: 25
      },
      {
        name: "bob",
        age: 33
      },
      {
        name: "jenny",
        age: 39
      },
      {
        name: "jet",
        age: 18
      },
    ]
  )
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
