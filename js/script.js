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
    'Company C': {
        'Area 5': {
            'Region 9': ['Site q', 'Site r'],
            'Region 10': ['Site s', 'Site t']
        },
        'Area 6': {
            'Region 11': ['Site u', 'Site v'],
            'Region 12': ['Site w', 'Site x']
        }
    },
    'Company D': {
        'Area 13': {
            'Region 13': ['Site a', 'Site b'],
            'Region 14': ['Site c', 'Site d']
        },
        'Area 14': {
            'Region 15': ['Site e', 'Site f'],
            'Region 16': ['Site g', 'Site h']
        },
        'Area 15': {
            'Region 17': ['Site i', 'Site j'],
            'Region 18': ['Site k', 'Site l']
        }
    },
    'Company E': {
        'Area 16': {
            'Region 19': ['Site a', 'Site b'],
            'Region 20': ['Site c', 'Site d']
        },
        'Area 17': {
            'Region 21': ['Site e', 'Site f'],
            'Region 22': ['Site g', 'Site h']
        },
        'Area 18': {
            'Region 23': ['Site i', 'Site j'],
            'Region 24': ['Site k', 'Site l']
        }
    },
    'Company F': {
        'Area 19': {
            'Region 5': ['Site i', 'Site j'],
            'Region 6': ['Site k', 'Site l']
        },
        'Area 20': {
            'Region 7': ['Site m', 'Site n'],
            'Region 8': ['Site o', 'Site p']
        }
    },
    'Company G': {
        'Area 13': {
            'Region 13': ['Site a', 'Site b'],
            'Region 14': ['Site c', 'Site d']
        },
        'Area 14': {
            'Region 15': ['Site e', 'Site f'],
            'Region 16': ['Site g', 'Site h']
        },
        'Area 15': {
            'Region 17': ['Site i', 'Site j'],
            'Region 18': ['Site k', 'Site l']
        }
    },
}

$(document).ready(function() {
    //build html elements
    buildStructure();
    var $site_display = $('#site-display-container');
    var $site_selector = $('#site-selector-container');
    var $item_display = $('#item-display');
    var $company = $('.company');
    var $area = $('.area');
    var $region = $('.region');
    var $site = $('.site');

    //hides all the inner displays for the company children
    $area.css('display', 'none');
    $region.css('display', 'none');
    $site.css('display', 'none');

    //checks that when a click is made and two conditions are met, close the selector menu
    // two conditions are:
    // (1) if the selector menu is open
    // (2) if the click is made outside the selector menu
    $(document).click(function(event) {
        if ($site_selector.is(":visible") && !$(event.target).closest('#custom-selector-container').length) {
            // collapse all menus
            closeAll();
            $site_selector.hide();
            $site_display.show();
        }
    });
    
    //company click listener function
    $company.click(function(){
        //check for opened "Company" elements, then close it.
        var isOpen = $(this).parent().find('.area').is(':visible');
        if(isOpen){
            closeCompanyDescendents($(this));
        } else{
            //else, open the element
            $(this).parent().find('.area').slideDown();
        }
        //close all other company elements and children
        closeOtherCompanyDescendents($(this));
    });

    //area click listener function
    $area.click(function(){
        var isOpen = $(this).parent().find('.region').is(':visible');
        if(isOpen){
            closeAreaDescendents($(this));
        }else{
            $(this).parent().find('.region').slideDown();
        }
        closeOtherAreaDescendents($(this));
    });

    //region click listener function
    $region.click(function(){
        $(this).parent().find('.site').slideToggle();
        closeOtherRegionDescendents($(this));
    });

    $site.click(function(e){
        e.stopPropagation();
        $item_display.html($(this).text());
        $site_selector.hide();
        $site_display.show();
        closeAll();
    });
    
    //hides site display to display the site dropdown menu
    $site_display.click(function() {
        $(this).hide();
        $site_selector.show();
    });
});

//template for adding of li, div and ul tags.
var add_template = (name) => {
    return (
        `<li>
            <div class="item">${name}</div>
            <ul><ul>
        </li>`
    );
}

var modified_template = (name) => {
    return (
        `<li>
            <div class="item">${name}</div>
        </li>`
    );
}

function buildStructure(){
    var $company_list = $('.company-list');
    // loop through the data objects
    // add the html tags to create the list and add a class name
    for(var company in data){
        $company_list.append(add_template(company));
        $("li > div").last().addClass("item company");
        $("ul").last().addClass("area-list");

        for(var area in data[company]){
            $('.area-list').last().append(add_template(area));
            $("li > div").last().addClass("area");
            $("ul").last().addClass("region-list");
            
            for(var region in data[company][area]){
                $('.region-list').last().append(add_template(region));
                //add classname to last div created and then create a ul element right after
                $("li > div").last().addClass("region");
                $("ul").last().addClass("site-list");
                
                for(var i = 0; i <= data[company][area][region].length-1; i++){
                    var site = data[company][area][region][i];
                    $('.site-list').last().append(modified_template(site));
                    $("li > div").last().addClass("site");
                }
            }
        }
    }
}

function closeCompanyDescendents(currentCompany){
    currentCompany.parent().find('.area').slideUp();
    currentCompany.parent().find('.site').slideUp();
    currentCompany.parent().find('.region').slideUp();
}

//function that goes to all other 'companies' and close their respective
//children
function closeOtherCompanyDescendents(currentCompany){
    var otherCompanies = $('.company').not(currentCompany);
    otherCompanies.each(function(){
        closeCompanyDescendents($(this));
    });
}

function closeAreaDescendents(currentArea){
    currentArea.parent().find('.region').slideUp();
    currentArea.parent().find('.site').slideUp();
}

function closeOtherAreaDescendents(currentArea){
    var otherAreas = $('.area').not(currentArea);
    otherAreas.each(function(){
        closeAreaDescendents($(this));
    });
}

function closeOtherRegionDescendents(currentRegion){
    var otherRegion = $('.region').not(currentRegion);
    otherRegion.each(function(){
        $(this).parent().find('.site').slideUp();
    })
}

// goes through all 'company' and close their children
function closeAll() {
    $('.company').each(function(){
        closeCompanyDescendents($(this));
    })
}