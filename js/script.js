const data = {
    'Company A': {
      'Area 1': {
        'Region 1': ['Site a', 'Site b'],
        'Region 2': ['Site c', 'Site d']
      },
      'Area 2': {
        'Region 3': ['Site e', 'Site f'],
        'Region 4': ['Site g', 'Site h']
      }
    },
    'Company B': {
      'Area 3': {
        'Region 5': ['Site i', 'Site j'],
        'Region 6': ['Site k', 'Site l']
      },
      'Area 4': {
          'Region 7': ['Site m', 'Site n'],
        'Region 8': ['Site o', 'Site p']
      }
    },
    'Company C': {},
    'Company D': {}
  }

$(document).ready(function() {

    var $site_display = $('#site-display-container');
    var $site_selector = $('#site-selector-container');   


    $site_display.click(function() {
        $(this).hide();
        $site_selector.slideDown();
    });

});