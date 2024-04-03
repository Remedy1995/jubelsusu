const AddUser = require('../models/createuser');
const Upload = require('../models/uploads');
const md5 = require('md5');
const cloudinary = require('cloudinary').v2;
const config = require('../config/config');
const ErrorResponse = require('../init/Response');
const fs = require('fs');



const userAudioUpload = (req, res) => {
  if (!req.file) {
    const error = new ErrorResponse(500, "Invalid Request", 'Please upload File does not exist');
    res.status(400).json(error.errorObject());
  }
  uploadAudio(req.file.filename).then(data => {
    return data;
  }).catch((error) => {
    throw new Error('This is an error', error);
  });


  async function uploadAudio(audioFile) {
    config();//configuration of the cloudinary apis
    var audioSrc = 'client/public/images/' + audioFile
    try {
      const result = await cloudinary.uploader.upload(audioSrc,
        {
          resource_type: 'video',
          audio_codec: 'mp3',
          folder: 'audio'
        });
      // return res.status(201).json(result);
      //after create a record in the database 
      try {
        const postAudio = new Upload({
          name: req.body.name,
          uri: result.url,
          suri: result.secure_url,
          type: result.format
        })

        const submit = await postAudio.save();
        if (submit) {
          return res.status(200).json({
            'status': true,
            'message': 'Audio has been successfully uploaded'
          })
        }

      }
      catch (err) {
        const error = new ErrorResponse(500, "Sorry An Error Occured", err);
        return res.status(500).json(error.errorObject());
      }
    }
    catch (err) {
      console.log('my error', err);
      const error = new ErrorResponse(500, "Sorry An Error Occured", err);
      return res.status(500).json(error.errorObject());
    }
  }
}


const allUserAudioUploads = async(req ,res)=>{
  try{
    const uploads = await Upload.find({});
    return res.status(200).json({
     status :true,
     data : uploads
    });
  }
  catch(err){
    const error = new ErrorResponse(500, "Sorry An Error Occured", err);
    return res.status(500).json(error.errorObject())}
}






module.exports = { userAudioUpload,allUserAudioUploads};