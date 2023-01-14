const router = require("express").Router();
const Post = require("../controller/posts.controller");
const upload = require("../middleware/upload.middleware");

router.post("/addpost", upload.single("img"), Post.addPost);

router.patch("/editpost/:id", upload.single("img"), Post.editPost);

router.delete("/removepost/:id", Post.removePost);

router.get("/", Post.showPosts);
router.get("/:id", Post.singlePost);

module.exports = router;
