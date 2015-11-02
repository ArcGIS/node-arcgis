# ArcGIS

Client library for interfacing with ArcGIS, either a Server installation of ArcGIS online. All methods return Promises, which on resolution return JSON.

**Params**

| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| Options        | Object       | see below               |

| Options        | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| Token          | String       | none                    |
| Domain         | url          | www.arcgis.com/         |

**Returns**

JSON Object with ArcGIS methods.

```
{
  auth: function,
  request: function,
  user: function,
  organization: function,
  group: function,
  item: function,
  items: function,
  favorites: function,
  usage: function,
  billing: function,
  search: function
}
```

**Example**

```
var ArcGIS = require('arcgis')

var anonAGO = ArcGIS()
<!-- Creates an anonymous session with www.arcgis.com -->

var authAGO = ArcGIS({
	token: token
})
<!-- Creates an authenticated session with www.arcgis.com -->

var serverGIS = ArcGIS({
	domain: 'myGIS.myurl.com'
})
<!-- Creates an anonymous session with ArcGIS Server -->
```

## User

**Params**

| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| Username       | String       | 'self'                  |

**Returns Promise**

JSON User object with User management methods.

```
{
  get: function(),           // gets user information
  update: function(options), // updates the user information
  delete: function(),        // deletes a user
  content: function(),       // gets users content
  tags: function(),          // returns the users tags?
  enable: function(),        // enables a disabled user
  disable: function(),       // disables a user
}
```

**Example**

```
var user = ago.user('username')
```

### user.get

**Returns**
```
// always returned on any user
  "created": Date            // when this user was created
  "firstName": String        // recorded first name of the user
  "fullName": String         // recorded name of the user
  "lastName": String         // recorded last name of the user
  "provider": String         // ???
  "username": String         // hard username for the user. Never changes.
// the following are not returned if the user is private
  "culture": String          // two letter lang code ex: 'en'
  "description": String      // text description set by the user
  "modified": Date           // date when the user
  "region": String           // two letter country code ex: 'us'
  "tags": Array              // array of tags that user has used maybe?
  "thumbnail": String        // name of the users thumbnail image ex: 'coolguy.jpg'
  "units": String,            // 'imperial' or 'metric'
```

**Example**
```
user.get()
.then(function (profile){
  console.log(profile)
})
```

### user.update

Takes an options object, and sets the users information to the options provided. Returns an error, or the updated user object.

**Options**

| Options        | Type         | Description             |
| -------------- | ------------ | ----------------------- |
| access         | 'public' / 'org' / 'private' | Visibillity of the user to searches. |
| preferredView  | 'Web' / 'GIS' / 'null' | Something about ... something? |
| description    | String | Plain text description of the user. |
| tags           | Array | Tags for the user used for ... something? |
| thumbnail      | Path | The file to be used as the users profile image. |
| password       | String | Set the users password to the new string. |
| fullname       | String | The full name of the user. |
| email          | Email Address | Email address to contact the user at. |
| securityQuestionIdx | Integer | Index of the security question in the Security Question Array. |
| securityAnswer | String | Plain string of the answer to the security question. |
| culture        | Culture Code | Culture code for the user. |
| region         | Country Code |  Region code for the user. |

**Returns**

Success: Returns the updated user object.


Error:
```
{
	error: {
		code: ???
		message: '???'
	}
}
```

**Example**

### user.delete

Deletes the user.

### user.content

Gets the users content.

### user.favorites

Gets the items the user has favorited.

### user.tags

Gets and sets the tags that a user uses I guess?

### user.enabled

Enables and disables the user within the organization.

## Organization

### organization.update

updates org information

### organization.users

gets users in an org

### organization.content

gets content in an org

### organization.summary

gets and sets the short summary of an org

### organization.addUsers

Invites users to an org.

### organization.deleteUsers

deletes users from an org

## Group

Gets a group?

### group.new

creates a new group?

### group.update

updates group information

### group.delete

deletes a group

### group.content

gets the content in a group

### group.users

adds a user to a group, via invitation if needed. If options is null, returns users in a group

### group.removeUser

kicks a user out of a group

### group.join

request an invitation for a user to a group

### group.leave

leave a group

### group.changeOwner

changes the owner of a group

## Item

returns an item by itemid.

### item.new

creates a new item.

### item.update

updates an items information.

### item.delete

deletes an item.

### item.createService

Creates a new feature service for hosted data?.

### item.folder

Returns the folder of an item, or adds an item to a folder.

### item.groups

Returns the groups an item is a part of, adds item to one or more groups.

### item.owner

returns the items owner, changes the owner of an item.

### item.favorite

adds item to favorites, removes item from favorites.

### item.rating

Gets an item rating, rates an item, or removes a rating on an item.

### item.publish

publishes a static data item to a usable layer.

### item.export

exports item as selected data type.

### item.data

gets the data behind an item, updates the data behind an item?

### item.deleteProtected

sets delete protection status.

### item.register

registers an item as an application.

### item.oAuth

returns oauth information for an app.

### item.relatedItems

returns items related to an item.

### item.permissions

sets permissions on an item to self, org, or public. If options is null,
returns current permissions.

### item.comments

Gets all the comments on an item.

#### item.comments.add

adds a comment to the item, if possible

#### item.comments.comment

returns a particular comment on an item

##### item.comments.comment.edit

edit the content of a comment

##### item.comments.comment.delete

deletes a comment from the item

