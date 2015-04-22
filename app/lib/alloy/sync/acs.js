function S4() {
  return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
}

function guid() {
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

function InitAdapter(config) {
  Cloud = require("ti.cloud");
  Cloud.debug = !0;
  config.Cloud = Cloud;
}

function Sync(method, model, options) {
  var object_name = model.config.adapter.collection_name;

  if (object_name === "events") {
    processACSEvents(model, method, options);
  }
}

function processACSEvents(model, method, options) {
  switch (method) {
    case "read":
      options.data = options.data || {};
      model.id && (options.data.event_id = model.id);
      var readMethod = model.id ? Cloud.Events.show : Cloud.Events.query;
      readMethod(options.data || {}, function(e) {
        if (e.success) {
          model.meta = e.meta;
          1 === e.events.length ? options.success(e.events[0]) : options.success(e.events);
          model.trigger("fetch");
          return;
        }
        Ti.API.error("Cloud.Events.query " + e.message);
        options.error && options.error(e.error && e.message || e);
      });
      break;
  }
}

var _ = require("alloy/underscore")._;

module.exports.sync = Sync;

module.exports.beforeModelCreate = function(config) {
  config = config || {};
  config.data = {};
  InitAdapter(config);
  return config;
};

module.exports.afterModelCreate = function(Model) {
  Model = Model || {};
  Model.prototype.config.Model = Model;
  return Model;
};
