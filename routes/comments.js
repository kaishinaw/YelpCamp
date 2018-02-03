var express = require("express"),
    router = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middleware = require ("../middleware");

// Comments new
router.get("/new", middleware.isLoggedIn, function(req, res) {
  // find campground by id
  Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

// Comments create
router.post("/", middleware.isLoggedIn, function(req, res) {
  // lookup campground using ID
  Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      console.log(err);
      redirect("/campgrounds")
    } else {
      // create new comment
      Comment.create(req.body.comment, function(err, comment) {
        if(err) {
          console.log(err);
        } else {
        //add username and id to comments
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
        // connect and associate to a new campground
          comment.save();
          campground.comments.push(comment._id);
          campground.save();
        // redirect campground show page
          req.flash("success", "Comment added")
          res.redirect("/campgrounds/" + campground._id)
        }
      });
    }
  });
});

//comment edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
  Comment.findById(req.params.comment_id, function(err, foundComment) {
    if(err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    }
  });
});

//comment update route
router.put("/:comment_id", function(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
    if(err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//comment destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if(err) {
      console.log(err);
      res.redirect("back");
    } else {
      req.flash("success", "Comment removed");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});




module.exports = router;