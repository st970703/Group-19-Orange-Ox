# SE750/CS732 Group-19-Orange-Ox

## Notes for Warnings and Errors
```
MongoError: pool is draining, new operations prohibited
```
This warning will raise when testing MongoDB using Jest.
In order to test that the MongoDB was successfully deleting users, I had to put an `await` function inside another `.then()` function, which triggered this warning.
The test is still able to pass, and this issue seems more to do with MongoDB not liking it when a call to the database is placed inside another call to the database.