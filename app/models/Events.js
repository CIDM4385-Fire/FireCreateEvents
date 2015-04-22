exports.definition = {
	config: {

		adapter: {
			type: "acs",
			collection_name: "events"
		}
	},
	
	extendModel: function(Model) {
		_.extend(Model.prototype, {      createEvent : function(_userInfo, _callback) {
        var cloud = this.config.Cloud;
        var TAP = Ti.App.Properties;

        // bad data so return to caller
        if (!_eventInfo) {
          _callback && _callback({
            success : false,
            model : null
          });
        } else {
          cloud.Events.create(_userInfo, function(e) {
            if (e.success) {
              var event = e.events[0];
              TAP.setString("sessionId", e.meta.session_id);
              TAP.setString("event", JSON.stringify(user));

              // set this for ACS to track session connected
              cloud.sessionId = e.meta.session_id;

              // callback with newly created user
              _callback && _callback({
                success : true,
                model : new model(event)
              });
            } else {
              Ti.API.error(e);
              _callback && _callback({
                success : false,
                model : null,
                error : e
              });
            }
          });
        }
      },
      
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {});

		return Collection;
	}
};