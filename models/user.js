var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    email: {type: String, required: true, maxlength:50},
    password: {type: String, required: true},
    isMember: {type: Boolean, required: true},
    isAdmin: {type: Boolean, required:true}
  }
);

// Virtual for author's full name
UserSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/users/' + this._id;
});

//Export model
module.exports = mongoose.model('User', UserSchema);