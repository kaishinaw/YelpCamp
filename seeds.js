var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
  {
    name: "Sun & Lake",
    image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ffdbb5e90a2c129258d4540ef0f29d06&auto=format&fit=crop&w=1350&q=80",
    description: "Sun setting over a lake"
  },
  {
    name: "Dusk Light",
    image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec456c4aeb71d3aecbe65e586d186ec0&auto=format&fit=crop&w=1350&q=80",
    description: "Camping at dusk"
  },
  {
    name: "Aurora",
    image: "https://images.unsplash.com/photo-1505735754789-3404132203ed?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8e0ef56213507ac99a507966ab9c5499&auto=format&fit=crop&w=1350&q=80",
    description: "Camping under the northern lights"
  },
]

function seedDB() {
  // Remove all campgrounds
  Campground.remove({}, function(err) {
    if(err) {
      console.log(err);
    }
    console.log("removed campgrounds");
    // add a few campgrounds
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if(err) {
          console.log(err);
        } else {
          console.log("added a campground");
          // create a comment
          Comment.create(
          {
            text: "This place is great, but I wish there was internet",
            author: "Homer"
          }, function(err, comment) {
              if(err) {
                console.log(err);
              } else {
                campground.comments.push(comment._id);
                campground.save();
                console.log("Created a new comment");
              }
          })
        }
      });
    });  
  });
}

module.exports = seedDB;