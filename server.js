import mongoose from 'mongoose'
import dotenv from 'dotenv'

process.on('uncaughtException', err => {
	console.log('Uncaught Exception: Shutting down...');
	console.log(err.name, err.message);
	process.exit(1);
})

dotenv.config({path: './config.env'});
import app from './app.js'
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
}).then(con => console.log(con.connections))
.catch(err => console.log(err));

//Start Server
const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`Server running on port : ${port}`);
})

process.on('unhandledRejection', err => {
	console.log('Unhandled Rejection: Shutting down...');
	console.log(err.name, err.message);
	server.close(() => {		
	process.exit(1);
	})
})