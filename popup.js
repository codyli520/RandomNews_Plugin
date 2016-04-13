document.addEventListener('DOMContentLoaded', function() {

  var changePageButton = document.getElementById('changePage');

  changePageButton.addEventListener('click', function() {

    document.getElementById('changePage').disabled = true;
    document.getElementById('changePage').textContent = "Loading..Please Wait.";
    var url="";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "https://webhose.io/search?token=1fa1a28c-6620-4294-9d0e-ea0abfe323b4&format=json&"+
      "q=language%3A(english)%20thread.country%3AUS%20"+
      "(site%3Acnn.com%20OR%20site%3Abbc.com%20OR%20site%3Awsj.com%20OR%20site%3Aabc.com%20OR%20site%3Acbs.com%20OR%20site%3Ausatoday.com%20OR%20site%3Anytimes.com)%20(site_type%3Anews)", true);
    xhr.send();

    xhr.onreadystatechange = processRequest;
    
    function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
          var response = JSON.parse(xhr.responseText);
          var random= Math.floor((Math.random() * 100));
          url = response["posts"][random]["url"];
          console.log(response);
          console.log(url);
          chrome.tabs.getCurrent(function() {
            chrome.tabs.update({url:url});
          });
      }
      document.getElementById('changePage').disabled = false;
      document.getElementById('changePage').textContent = "Try Your Luck!";
    }
  }, false); 
}, false);
