var sitetemplate = "<div class='site'> <input type='radio' name='site' />" +
                   "<input class='alias' type='text' /> <input class='domain' type='text' />" +
                   "<a class='remove' href='#'>Remove</a></div>";
var sitetemplator = function() {
    $('#sites').append(sitetemplate);
};

var patterntemplate = "<div class='pattern'> <input type='text' />" +
                      "<a class='remove' href='#'>Remove</a></div>";
var patterntemplator = function() {
    $('#patterns').append(patterntemplate);
};

function saveSites() {
    var sites = [];
    $('div.site').each(function() {
        var $this = $(this);
        
        var alias = $.trim($this.find('input.alias').val());
        var domain = $.trim($this.find('input.domain').val());
        var checked = $this.find('input:radio').prop('checked');
        
        if (alias.length > 0 && domain.length > 0) {
            var obj = { 'alias': alias, 'domain': domain };
            sites.push(obj);
            
            if (checked) {
                localStorage.setItem('selected', domain);
            }
        }
    });
    if (sites.length > 0) {
        localStorage.setItem('sites', JSON.stringify(sites));
    } else {
        var sites = [ { 'alias': 'Trial zone', 'domain': 'trialzone.collab.net' },
                      { 'alias': 'COCN', 'domain': 'ctf.open.collab.net' } ];
        localStorage.setItem('sites', JSON.stringify(sites));
        localStorage.setItem('selected', sites[0]['domain']);
    }
}

function savePatterns() {
    var patterns = [];
    
    $('div.pattern').each(function() {
        var $this = $(this);
        var pattern = $.trim($this.find('input:text').val());
        if (pattern.length > 0) {
            patterns.push(pattern);
        }
    });
    
    localStorage.setItem('patterns', JSON.stringify(patterns));
}

function save() {
    saveSites();
    savePatterns();
    window.close();
}

function loadSites() {
    var sites = JSON.parse(localStorage.getItem('sites') || '[]');
    
    
    if (sites == null || sites.length == 0) {
        sitetemplator();
    } else {
        var selected = localStorage.getItem('selected');
        for (var i = 0; i < sites.length; i++) {
            var obj = sites[i];
            if ($.trim(obj['domain']).length > 0) {
                sitetemplator();
                var sitediv = $('div.site:last');
                var site = obj['domain'];
                var checked = (selected == site);
                sitediv.find('input:radio').prop('checked', checked);
                sitediv.find('input.alias').val(obj['alias']);
                sitediv.find('input.domain').val(site);
            }
        }
    }
}

function registerAddSite() {
    $('#addsite').click(function() {
        var alias = $("div.site:last input.alias").val();
        var domain = $("div.site:last input.domain").val();
        if ($.trim(alias).length > 0 && $.trim(domain).length > 0) {
            sitetemplator();
        }
    });
}

function registerRemoveSite() {
    $('#sites').on('click', 'a.remove', function() {
        $(this).closest('div.site').remove();
        
        if ($('div.site').length == 0) {
            sitetemplator();
        }
        
        if ($('#sites input:radio:checked').length == 0) {
            $('div.site:first input:radio').prop('checked', true);
        }
    });
}

function loadPatterns() {
    var patterns = JSON.parse(localStorage.getItem('patterns') || '[]');
    
    if (patterns == null || patterns.length == 0) {
        patterntemplator();
    } else {
        for (var i = 0; i < patterns.length; i++) {
            var pattern = $.trim(patterns[i]);
            if (pattern.length > 0) {
                patterntemplator();
                $('div.pattern:last').find('input:text').val(pattern);
            }
        }
    }
}

function registerAddPattern() {
    $('#addpattern').click(function() {
        var pattern = $.trim($("div.pattern:last input:text").val());
        if (pattern.length > 0) {
            patterntemplator();
        }
    });
}

function registerRemovePattern() {
    $('#patterns').on('click', 'a.remove', function() {
        $(this).closest('div.pattern').remove();
        
        if ($('div.pattern').length == 0) {
            patterntemplator();
        }
    });
}



function sites() {
    loadSites();
    registerAddSite();
    registerRemoveSite();
}

function patterns() {
    loadPatterns();
    registerAddPattern();
    registerRemovePattern();
}

window.addEventListener('load', function() {
    sites();
    patterns();
    $('#savebutton').click(save);
});
