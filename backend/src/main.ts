import {
  objectType,
  interfaceType,
  queryType,
  stringArg,
  enumType,
  intArg,
  arg,
  makeSchema,
} from "@nexus/schema";

const Node = interfaceType({
  name: "Node",
  definition(t) {
    t.id("id", { description: "Unique identifier for the resource" });
    t.resolveType(() => null);
  },
});

const Account = objectType({
  name: "Account",
  definition(t) {
    t.implements(Node); // or t.implements("Node")
    t.string("username");
    t.string("email");
  },
});

const StatusEnum = enumType({
  name: "StatusEnum",
  members: ["ACTIVE", "DISABLED"],
});

const Query = queryType({
  definition(t) {
    t.field("account", {
      type: Account, // or "Account"
      args: {
        name: stringArg(),
        status: arg({ type: "StatusEnum" }),
      },
    });
    t.list.field("accountsById", {
      type: Account, // or "Account"
      args: {
        ids: intArg({ list: true }),
      },
    });
  },
});

// Recursively traverses the value passed to types looking for
// any valid Nexus or graphql-js objects to add to the schema,
// so you can be pretty flexible with how you import types here.
const schema = makeSchema({
  types: [Account, Node, Query, StatusEnum],
  // or types: { Account, Node, Query }
  // or types: [Account, [Node], { Query }]
});
