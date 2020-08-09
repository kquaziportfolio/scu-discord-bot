
//var POST_URL = "[INSERT WEBHOOK URL HERE]";
//
//function onSubmit(e) {
//    var form = FormApp.getActiveForm();
//    var allResponses = form.getResponses();
//    var latestResponse = allResponses[allResponses.length - 1];
//    var response = latestResponse.getItemResponses();
//      var items = {};
//   for (i in response){   
//     if (response[i].getItem().getTitle() == "First and Last Name") {
//       items['name'] = response[i].getResponse()
//     }
//     if (response[i].getItem().getTitle() == "Current Major") {
//       items['major'] = response[i].getResponse()
//     }
//     if (response[i].getItem().getTitle() == "Graduating Year") {
//       items['class'] = response[i].getResponse()
//     }
//     if (response[i].getItem().getTitle() == "Discord Tag") {
//       items['discord'] = response[i].getResponse()
//     }
//   }
//      var options = {
//        "method": "post",
//        "payload": JSON.stringify(items),
//        "headers": {
//          "key": "KEY_SET_IN_CONFIG",
//          "Content-Type": "application/json"
//        }
//      };
//  UrlFetchApp.fetch(POST_URL, options);
//};


var POST_URL = "https://discordapp.com/api/webhooks/722305154518482984/RFcEiZZ3hm-EwejsBRkexK2Pgn9tVkC5sSbZJzxhNNwNF7AYoiwIXu_mwpqgmVztkvZ5";

function onSubmit(e) {
    var form = FormApp.getActiveForm();
    var allResponses = form.getResponses();
    var latestResponse = allResponses[allResponses.length - 1];
    var response = latestResponse.getItemResponses();
      var items = {};
   for (i in response){   
     if (response[i].getItem().getTitle() == "First and Last Name") {
       items['name'] = response[i].getResponse()
     }
     if (response[i].getItem().getTitle() == "Current Major") {
       items['major'] = response[i].getResponse()
     }
     if (response[i].getItem().getTitle() == "Graduating Year") {
       items['class'] = response[i].getResponse()
     }
     if (response[i].getItem().getTitle() == "Discord Tag") {
       items['discord'] = response[i].getResponse()
     }
   }

    var options = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
            "key": "Bucky_bronco2024", 
        },
        "payload": JSON.stringify({
            "content": "‌", // This is not an empty string
            "embeds": [{
                "title": "SCU Discord Network",
                "fields": items,
                "footer": {
                    "text": "Brought to you by the server lords!",
                },
                "color": 10231598 ,
              "thumbnail": {
                "url": "https://jasonanhvu.github.io/assets/img/logo-pic.png",
              },
              "timestamp": new Date()
            }]
        })
    };

    UrlFetchApp.fetch(POST_URL, options);
};
