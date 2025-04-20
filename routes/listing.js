const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const flash = require("connect-flash");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer = require("multer");
const{storage} = require("../cloudConfig.js");
const upload = multer({storage});


router.route("/")
.get(wrapAsync(listingController.index)) //index route
.post(
    isLoggedIn,                          //create route
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing)
)
// .post( upload.single('listing[image]'),(req,res)=>{
//     res.send(req.file);
// });

//new route
router.get("/new",isLoggedIn,wrapAsync(listingController.renderNewForm));


router.route("/:id")
.get(wrapAsync(listingController.showListing)) //show route
.put(                                         //update route
    isLoggedIn,
    upload.single('listing[image]'),
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
)
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing)); //delete route


//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


module.exports = router;