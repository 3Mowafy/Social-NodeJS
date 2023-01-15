const postModel = require("../models/posts.model");
const cloudinary = require("../helper/cloudinary.helper");

class Post {
    static addPost = async (req, res) => {
        try {
            const postData = new postModel(req.body);

            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                postData.postImg = result.secure_url;
            }

            await postData.save();
            res.status(200).send({
                apiStatus: true,
                data: postData,
                message: "Post Added",
            });
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: "",
                message: e.message,
            });
        }
    };

    static editPost = async (req, res) => {
        try {
            const postData = await postModel.findById(req.params.id);
            const postKeys = ["title", "tags", "description"];

            for (let key of postKeys) {
                postData[key] = req.body[key];
            }
            const result = await cloudinary.uploader.upload(req.file.path);
            postData.postImg = req.file ? result.secure_url : postData.postImg;

            await postData.save();
            res.status(200).send({
                apiStatus: true,
                data: postData,
                message: "Post Edited",
            });
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: "",
                message: e.message,
            });
        }
    };

    static removePost = async (req, res) => {
        try {
            const postData = await postModel.findByIdAndDelete(req.params.id);

            res.status(200).send({
                apiStatus: true,
                data: "",
                message: "Post Deleted",
            });
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: "",
                message: e.message,
            });
        }
    };

    static showPosts = async (req, res) => {
        try {
            const postData = await postModel.find();

            res.status(200).send({
                apiStatus: true,
                data: postData,
                message: "All Posts",
            });
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: "",
                message: e.message,
            });
        }
    };

    static singlePost = async (req, res) => {
        try {
            const postData = await postModel.findById(req.params.id);
            res.status(200).send({
                apiStatus: true,
                data: postData,
                message: `Post => ${postData.title}`,
            });
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: "",
                message: e.message,
            });
        }
    };
}

module.exports = Post;
