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

    buildStructure();

    var $site_display = $('#site-display-container');
    var $site_selector = $('#site-selector-container');
    var $company = $('.company');
    var $area = $('.area');
    var $region = $('.region');
    var $site = $('.site');

    $area.css('display', 'none');
    $region.css('display', 'none');
    $site.css('display', 'none');
    
    

    $company.click(function(){
        var isOpen = $(this).parent().find('.area').is(':visible');
        if(isOpen){
            closeCompanyDescendents($(this));
        }
        closeOtherCompanyDescendents($(this));
    
        $(this).parent().find('.area').slideToggle();
    });

    $area.click(function(){
        var isOpen = $(this).parent().find('.region').is(':visible');
        if(isOpen){
            closeAreaDescendents($(this));
        }
        closeOtherAreaDescendents($(this));
        $(this).parent().find('.region').slideToggle();
    });

    $region.click(function(){
        $(this).parent().find('.site').slideToggle();
        closeOtherRegionDescendents($(this));
    });

    $site_display.click(function() {
        $(this).hide();
        $site_selector.slideDown();
    });

    
});

var add_template = (name) => `<li><div>${name}</div></li>`;
var add_ul = () => `<ul></ul>`;


function buildStructure(){
    
    var $company_list = $('.company-list');

    for(var company in data){
        $company_list.append(add_template(company));
        $("li > div").last().addClass("item company").after(add_ul());
        $("ul").last().addClass("area-list");

        for(var area in data[company]){
            $('.area-list').last().append(add_template(area));
            $("li > div").last().addClass("item area").after(add_ul());
            $("ul").last().addClass("region-list");
            
            for(var region in data[company][area]){
                $('.region-list').last().append(add_template(region));

                //add classname to last div created and then create a ul element right after
                $("li > div").last().addClass("item region").after(add_ul());
                $("ul").last().addClass("site-list");
                
                for(var i = 0; i <= data[company][area][region].length-1; i++){
                    var site = data[company][area][region][i];
                    $('.site-list').last().append(add_template(site));
                    $("li > div").last().addClass("item site");
                }
            }
        }
    }
    
}

function closeCompanyDescendents(that){
    that.parent().find('.site').slideUp();
    that.parent().find('.region').slideUp();
}

function closeOtherCompanyDescendents(that){
    var otherCompanies = $('.company').not(that);
    otherCompanies.each(function(){
        $(this).parent().find('.area').slideUp();
        closeCompanyDescendents($(this));
    });
}

function closeAreaDescendents(that){
    that.parent().find('.site').slideUp();
}

function closeOtherAreaDescendents(that){
    var otherAreas = $('.area').not(that);
    otherAreas.each(function(){
        $(this).parent().find('.region').slideUp();
        closeCompanyDescendents($(this));
    });
}

function closeOtherRegionDescendents(that){
    var otherRegion = $('.region').not(that);
    otherRegion.each(function(){
        $(this).parent().find('.site').slideUp();
    })
}