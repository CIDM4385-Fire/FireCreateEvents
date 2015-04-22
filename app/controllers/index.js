var args = arguments[0] || {};
$.parentController = args.parentController;

$.showCreateEvent.addEventListener('click', showCreateEventclicked);
$.doCreateEvent.addEventListener('click', doCreateEventClicked);

function showCreateEvent() {
	$.createEventView.show();
};

function doCreateEventClicked() {
  if ($.event.value !== $.acct_password_confirmation.value) {
    alert("Please re-enter information");
    return;
  }

  var params = {
    first_name : $.acct_fname.value,
    last_name : $.acct_lname.value,
    username : $.acct_email.value,
    email : $.acct_email.value,
    password : $.acct_password.value,
    password_confirmation : $.acct_password_confirmation.value,
  };

  var user = Alloy.createModel('User');

  user.createAccount(params, userActionResponseHandler);
};