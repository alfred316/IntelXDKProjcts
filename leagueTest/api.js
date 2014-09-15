// ********************SET YOUR API KEY HERE****************************
// Insert your World Weather Online API key here. README for more info.
var apiKey = '5113eac9-edfe-4a58-afe4-3cb446f7142d';
var outStr= "Text Legends requested info: ";
// *********************************************************************

// Check if valid API Key
function checkKeyValidity() {
    var url = "https://prod.api.pvp.net/api/lol/static-data/na/v1/champion?locale=en_US&champData=all&api_key=" + apiKey;
	invalidKey = false;

	// Docs: http://app-framework-software.intel.com/api2/index.html#$_get
	keyTest = $.get(url, "GET", function(data) {});
	keyTest.onreadystatechange = function() {
		if (keyTest.readyState == 4) {
			if (keyTest.status == 403) {
				invalidKeyAlert();
				invalidKey = true;
			}
		}
	}
}

function invalidKeyAlert() {
	alert('Invalid API key. See README and edit js/api.js file.');
}


function search(){
    
    var summoner = document.getElementById('summName').value;
    //alert(summoner);
    summonerNew = summoner.toLowerCase();
    summonerNew = summonerNew.replace(' ','');
    var nameURL = "https://prod.api.pvp.net/api/lol/na/v1.3/summoner/by-name/" + summonerNew +"?api_key=" + apiKey;
    //alert(nameURL);
        
    getSumm = $.get(nameURL, "GET", function(data){
        nameID = data[summonerNew].id;
        //alert(nameID);
        getStuff(nameID, summoner);
        getMoreStuff(nameID, summoner);
    });
} 

function getStuff(nameID, summoner){
     //var unrankedID;
     var phoneNo = document.getElementById('phNo').value;
        //alert(phoneNo);
   var url = "https://prod.api.pvp.net/api/lol/na/v1.2/stats/by-summoner/" +nameID+"/summary?season=SEASON4&api_key=" + apiKey;
    getInfo = $.get(url, "GET", function(data){
        
        
        var test;
    
        for (var i=0; i<data.playerStatSummaries.length;i++){
            var pattern = /^Unranked$/;
         
        if (pattern.test(data.playerStatSummaries[i].playerStatSummaryType)){
//         if(data.playerStatSummaries[i].playerStatSummaryType.test('Unranked'))
             //alert("found it! " + i);
            test =i;
            break;
//         else
//             continue
        }
        }
        //alert("wtf");
        
        //alert("unranked ID: " +unrankedID);
        
        summaries_index = data.playerStatSummaries[test];
        //alert(summaries_index);
        
        data = ". Summoner name: " +summoner+". Game Type: " + data.playerStatSummaries[test].playerStatSummaryType + " wins: " + data.playerStatSummaries[test].wins;
        
        outStr += data;
//        data = "Summoner name: " +summoner+" Game Type: " + summaries_index.playerStatSummaryType + " wins: " + data.playerStatSummaries[6].wins;
       // $('.search_result').text(outStr);
        //$.post("http://192.237.221.36/sendText.php",{Body:data, PhoneNo: phoneNo}, function(data){alert("text sent!");});  
     
    });
}
    function getMoreStuff (nameID, summoner){
        var phoneNo = document.getElementById('phNo').value;
       // alert(phoneNo);
        //alert("function getmorestuff");
    var urlRecent = "https://prod.api.pvp.net/api/lol/na/v1.3/game/by-summoner/"+nameID+"/recent?api_key=" + apiKey;
        //alert(urlRecent);
        
    getRecent = $.get(urlRecent, "GET", function(data1){ 
        champId = data1.games[0].championId;
        data1 = ". Last Game Played: Type: " + data1.games[0].gameType + ". Victory: " + data1.games[0].stats.win + ". KDA: " + data1.games[0].stats.championsKilled +" - "+ data1.games[0].stats.numDeaths +" - "+data1.games[0].stats.assists  ;
        outStr += data1;
       // dataStr= " K-D-A: " + data1.games[0].stats.championsKilled + " - " + data1.games[0].stats.numDeaths + " - " + data1.games[0].stats.assists;
        //+ " Champion Played: " + champId;
       // alert(data1);
       // $('.search_result1').text(outStr);
        //$('.search_result3').text(dataStr);
       // alert("starting champ name process");
       // alert(champId);
        getChampionName(champId);
        
        //$.post("http://192.237.221.36/sendText.php",{Body:data1, PhoneNo: phoneNo}, function(data){alert("text sent!");});
        
    });

}

function getChampionName (champId){
    var phoneNo = document.getElementById('phNo').value;
    //alert(phoneNo);
   // alert("In function get champ name");
    championID = champId;
    var champURL = "https://prod.api.pvp.net/api/lol/static-data/na/v1/champion?champData=all&api_key=" + apiKey;
    getChampName = $.get(champURL, "GET", function(data){
        useChampID = data.keys[championID];
        data= ". Champion Played: " + useChampID;
        outStr += data;
        $('.search_result2').text(outStr);
        $.post("http://192.237.221.36/sendText.php",{Body:outStr, PhoneNo: phoneNo}, function(data){alert("text sent!");});
        outStr = "Text Legends requested info: ";
    });
    
}




