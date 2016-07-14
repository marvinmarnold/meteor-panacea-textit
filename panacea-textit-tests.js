// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by panacea-textit.js.
import { name as packageName } from "meteor/panacea-textit";

// Write your tests here!
// Here is an example.
Tinytest.add('panacea-textit - example', function (test) {
  test.equal(packageName, "panacea-textit");
});
