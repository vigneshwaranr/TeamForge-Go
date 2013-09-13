function populate() {
    chrome.tabs.executeScript(null, {file: "content_script.js"});
    var template = "<div class='site'><label><input type='radio' name='site' value='' /></label></div>";
    var templator = function(checked, sitename, site) {
        $('#addlink').before(template);
        $('div.site:last')
            .find('input:radio')
                .prop('checked', checked)
                .val(site)
                .end()
            .find('label')
                .append(sitename + " <span>(" + site + ")</span>");
    };
    
    var selected = localStorage.getItem('selected');
    var sites = JSON.parse(localStorage.getItem('sites') || '[]');
    for (var i = 0; i < sites.length; i++) {
        var obj = sites[i];
        var site = obj['domain'];
        var checked = (selected == site);
        templator(checked, obj['alias'], site);
    }
    
    $("#query-field").focus();
}

chrome.extension.onConnect.addListener(function(port) {
    if (port.name != 'teamforgego') {
        return;
    }
    port.onMessage.addListener(function(data) {
        if (data.command == "postSelection") {
            var ids = getMatchingObjectIds(data.selection);
            $("#query-field").val(ids.join(', '));
        } 
    });
});

function getMatchingObjectIds(str) {
    if (str.match(/^\d{4,}$/)) {
        return [ 'artf' + str ];
    }
    
    var ids = [];
    var findmatch = function(re) {
        var arr = str.match(re);
        if (arr == null) return;
        for (var i = 0; i < arr.length; i++) {
            var id = arr[i];
            if ($.inArray(id, ids) == -1) {
                ids.push(id);
            }
        }
    };

    findmatch(/artf\d{4,}(?:#\d+)?/ig);
    findmatch(/(?:cmmt|doc|frs|news|post|report|task|forum|pkg)\d{4,}/ig);
    findmatch(/(?:rel|docr|docf|topc|tracker|user|proj)\d{4,}/ig);
    findmatch(/(?:plan|reps|taskgrp|wiki|page|srch)\d{4,}/ig);
    findmatch(/REV_\d+/ig);
    
    //Now for user patterns
    var patterns = JSON.parse(localStorage.getItem('patterns') || '[]');
    for (var i = 0; i < patterns.length; i++) {
        try {
            findmatch(new RegExp(patterns[i], "g"));
        } catch (e) {
            console.log(e.message);
        }
    }
    return ids;
}

function openTabs() {
    var text = $.trim($("#query-field").val());
    if (text == null || text == "") {
        alert("Please enter a valid object id!");
        return;
    }
    
    var site = localStorage.getItem('selected');
    var ids = getMatchingObjectIds(text);
    
    for (var i = 0; i < ids.length; i++) {
        chrome.tabs.create({
            url: "http://" + site + "/sf/go/" + ids[i]
        });
    }
}


$(document).ready(function() {
	$(".sitesflip").click(function() {
    	$("#sitespanel").slideToggle("fast");
	});
	
    $("#sitespanel").on('click', 'input:radio', function() {
        localStorage.setItem('selected', this.value);
    });
    
    $("#lookup-form").submit(openTabs);
    
    $("#addlink").click(function() {
        var optionsurl = chrome.extension.getURL('options.html');
		chrome.tabs.create({ url: optionsurl });
    });
    populate();
});

