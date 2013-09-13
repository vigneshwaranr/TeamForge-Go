(function() {
    var selected = localStorage.getItem('selected');
    var sites = localStorage.getItem('sites');
    if (selected == null || selected == '') {
        sites = [ { 'alias': 'Trial zone', 'domain': 'trialzone.collab.net' },
                  { 'alias': 'COCN', 'domain': 'ctf.open.collab.net' } ];
        localStorage.setItem('sites', JSON.stringify(sites));
        localStorage.setItem('selected', sites[0]['domain']);
    }
})();
