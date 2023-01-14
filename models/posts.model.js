const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        postImg: {
            type: String,
            trim: true,
        },
        title: {
            type: String,
            trim: true,
            required: true,
        },
        tags: {
            type: String,
            trim: true,
            required: true,
        },
        description: {
            type: String,
            trim: true,
            required: true,
        },
    },
    { timestamps: true }
);

postSchema.methods.toJSON = function () {
    const postData = this.toObject();
    delete postData.__v;
    delete postData.updatedAt;
    return postData;
};

module.exports = mongoose.model("Posts", postSchema);
