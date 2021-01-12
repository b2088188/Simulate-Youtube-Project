import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from '../models/videoModel.js';
import Channel from '../models/channelModel.js';

dotenv.config({path: './config.env'});
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)
mongoose.connect(DB, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
}).then(con => console.log(con.connections))

const port = process.env.PORT || 3000;

const videos = JSON.parse(fs.readFileSync(`./data/videos.json`, 'utf-8'));
const channels = JSON.parse(fs.readFileSync(`./data/channels.json`, 'utf-8'));

async function importData() {
	try {
		//await Channel.create(channels);
	   await Video.create(videos);
       console.log('Date successfully loaded!');
	}
	catch(err) {
	        console.log(err);       
	}
}


async function deleteData() {	
	try {
	await Video.deleteMany();
	//await User.deleteMany();
	//await Order.deleteMany();
	console.log('Date successfully deleted!');
	}
	catch(err) {		
	}
	process.exit();
}
//node ./data/import-dev-data.js --import
if(process.argv[2] === '--import')
	importData();
//node ./data/import-dev-data.js --delete
if(process.argv[2] === '--delete')
	deleteData();
