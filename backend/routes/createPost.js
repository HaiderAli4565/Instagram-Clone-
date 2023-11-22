const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const POST = mongoose.model("POST")


//Route
router.get("/allposts", requireLogin, (req, res) => {
    POST.find()
        .populate("postedBy", "_id name Photo")
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .then(posts => res.json(posts))
        .catch(err => console.log(err))
})


router.post("/createPost", requireLogin, (req, res) => {
    const { body, pic } = req.body;
    console.log(pic)
    if (!body || !pic) {
        return res.status(422).json({ error: "please add all the fields" })
    }
    console.log(req.user)
    const post = new POST({
        body,
        photo: pic,
        postedBy: req.user

    })
    post.save().then((result) => {
        return res.json({ post: result })
    }).catch(err => console.log(err))
})
router.get("/myposts", requireLogin, (req, res) => {
    POST.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .then(myposts => {
            res.json(myposts)
        })

})

router.put("/like", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedBy", "_id name Photo")
        .then((result) => {
            if (!result) {
                return res.status(422).json({ error: "No post found with the given ID" });
            }
            res.json(result);
        })
        .catch((err) => {
            res.status(422).json({ error: err.message || "An error occurred while processing your request" });
        });
});


router.put("/unlike", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedBy", "_id name Photo")
        .then((result) => {
            if (!result) {
                return res.status(422).json({ error: "No post found with the given ID" });
            }
            res.json(result);
        })
        .catch((err) => {
            res.status(422).json({ error: err.message || "An error occurred while processing your request" });
        });
});


router.put("/comment", requireLogin, (req, res) => {
    const comment = {
        comment: req.body.text,
        postedBy: req.user._id
    }
    POST.findByIdAndUpdate(
        req.body.postId,
        { $push: { comments: comment } },
        { new: true }
      )
        .populate("comments.postedBy", "_id name")
        .populate("postedBy" , "_id name")
        .then((result) => {
          if (!result) {
            return res.status(422).json({ error: "No post found with the given ID" });
          }
          res.json(result);
        })
        .catch((err) => {
          res.status(422).json({ error: err });
        });
      
})

