//file for mongodb to store the username and password information
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {collection, Image } = require('./mongo')
const app = express();


const CryptoJS = require('crypto-js');
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get("/", cors(), (req,res)=>{
})

app.post("/login", async(req,res)=>{
    const{username, pass}=req.body;

    try{
        const user=await collection.findOne({username:username})
        //password decryption
        const key = '12345';
        const decrypted = CryptoJS.AES.decrypt(user.pass, key).toString(CryptoJS.enc.Utf8);
        
        //if username is already exist
        if(user){
            if (decrypted === pass){
                res.json("Success");
            }
            else {
                res.json("Password not match");
            }
        }
        else{
            res.json("not exist");
        }
    }
    catch(e){
        res.json("not exists");
    }
})

app.post("/signup", async(req,res)=>{
    const{username, pass}=req.body;
    //password encryption
    const key = '12345';
    const encrypted = CryptoJS.AES.encrypt(pass, key).toString();
    const data = {
        username:username,
        pass:encrypted
    }

    try{
        const user=await collection.findOne({username:username})
        
        //if username is already exist
        if(user){
            res.json("exist")
        }
        else{
            res.json("not exist");
            await collection.insertMany([data]);
        }
    }
    catch(e){
        res.json("not exist")
    }
})

app.listen(8001, ()=>{
    console.log("port connected");
})

app.post('/uploadimage', async (req, res) => {
    const { username, imageName, image } = req.body;

    try {
        const existingImage = await Image.findOne({ username, imageName });

        if (existingImage) {
            return res.status(400).json({ message: 'Image with the same username and imageName already exists. Please choose a different name.' });
        }
        const newImage = new Image({
            username: username,
            imageName: imageName,
            imageData: image
        });
        await newImage.save();

        res.send({ message: 'Image uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error uploading image' });
    }
});

app.listen(8002, () => {
    console.log('Server is running on port 8002');
});

app.get('/getimages/:username', async (req, res) => {
    const { username } = req.params; 
    try {
        const images = await Image.find({ username: username });
        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching images' });
    }
});

app.get('/getImageData/:username', async (req, res) => {
    const { username } = req.params;
    const { imageName } = req.query;

    try {
        const imageData = await Image.findOne({ username, imageName });

        if (imageData) {
            res.json({ imageData });
        } else {
            res.status(404).json({ message: 'Image not found' });
        }
    } catch (error) {
        console.error('Error fetching image data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(8003, () => {
    console.log('Server is running on port 8003');
});

