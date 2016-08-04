function(schema,refs,api) {

   // WARNING:
   // value can be a completely blank object, make sure all tests and
   // pre-processing can handle a blank value!

   return function(value) {
      api.addHintOptions(value);
   };
}
