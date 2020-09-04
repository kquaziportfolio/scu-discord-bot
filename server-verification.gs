var POST_URL = "[your portmap url]/verify";

function onSubmit(e) {
    var form = FormApp.getActiveForm();
    var allResponses = form.getResponses();
    var latestResponse = allResponses[allResponses.length - 1];
    var response = latestResponse.getItemResponses();
    var items = {};
    
      for (i in response){   
        if (response[i].getItem().getTitle() === "First Name") {
          items['name'] = response[i].getResponse()
        }
        if (response[i].getItem().getTitle() === "Current Major") {
          items['major'] = response[i].getResponse()
        }
        if (response[i].getItem().getTitle() === "Member Status") {
          items['status'] = response[i].getResponse()
        }
        if (response[i].getItem().getTitle() === "Discord Tag <-- (DiscordName#0000)") {
          items['discord'] = response[i].getResponse()
        }
      }
  
  Logger.log(JSON.stringify(items));
  
  var options = {
    "method": "post",
    "payload": JSON.stringify(items),
    "headers": {
      "key": "[your-private-personal-key]",
      "Content-Type": "application/json"
    }
  };

    UrlFetchApp.fetch(POST_URL, options);
};
