import 'dotenv/config'
import app from "./src/index.js"

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`server is running on port ${port}`))

export default app
