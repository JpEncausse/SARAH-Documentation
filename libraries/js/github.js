!function ($) {
  
  var getUrlParameter = function(param){
    var url = window.location.search.substring(1);
    var qs  = url.split('&');
    for (var i = 0; i < qs.length; i++){
      var name = qs[i].split('=');
      if (name[0] == param){
        return name[1];
      }
    }
  }
  
  // ------------------------------------------
  //  LANGUAGE
  // ------------------------------------------
  
  var language = 'fr';
  var setupLanguage = function(){
    var lang = getUrlParameter('lang');

    // Local Storage : Retrieve / Backup
    if (lang){
      window.localStorage.setItem("SARAH-doc-lang", lang);
    } else {
      lang = window.localStorage.getItem("SARAH-doc-lang");
    }
    
    if (lang){
      language = lang;
    }
  }
  
  // ------------------------------------------
  //  NAVIGATION
  // ------------------------------------------
  
  var setupNavigation = function(){
    var page = getUrlParameter('page')
    if (page){ $('#doc-content').attr('data-page', page).removeAttr('data-wiki', ''); }
    
    var wiki = getUrlParameter('wiki')
    if (wiki){ $('#doc-content').attr('data-wiki', wiki).removeAttr('data-page', ''); }
  }
  
  // ------------------------------------------
  //  AJAX
  // ------------------------------------------
  
  var checkIncludes = function(scope){
    
    var $scope = $(scope || document);
    $scope.find('DIV[data-page]').each(ajaxGitHub)
    $scope.find('DIV[data-wiki]').each(ajaxWiki)
  }
  
  var ajaxGitHub = function(){
    var $div = $(this);
    var url = 'markdown/' + language + '/' + $div.attr('data-page') + '.md';
    ajax(url, {}, function(html){
      $div.html( convertMarkdown(html) );
    });
  }
  
  var ajaxWiki = function(){
    var $div = $(this);
    var url = 'https://raw.githubusercontent.com/wiki/JpEncausse/SARAH-Documentation/' + $div.attr('data-wiki') + '.md';
    ajax(url, {}, function(html){
      $div.html( convertMarkdown(html) );
    });
  }
  
  var ajax = function(url, params, callback, method){
    // Build Request
    var request = $.ajax({
      url: url, 
      data: params,
      type: method || 'GET', 
      traditional: true
    });
    
    // Handle Response
    request.done(function(html) {
      if (callback) callback(html);
    });
  }
  
  // ------------------------------------------
  //  MARKDOWN
  // ------------------------------------------
  
  var convertMarkdown = function(md){
    return markdown.toHTML(md); // FIXME
  }
  
  // ------------------------------------------
  //  CLICK
  // ------------------------------------------
  
  var registerClick = function(){
    
    $(document).on('mousedown', 'A[href]', function(){
      var $link = $(this);
      if ($link.attr('rel')){ return; }
      
      var href  = $link.attr('href');
      if (href.startsWith('http')){ return; }
      
      // if the link is an internal link, just jump to the correct section
      if (href.startsWith('#')) {
        href = href.slice(1);
        // search for the hx elements to find the related one
        var $el = $('h1,h2,h3,h4').filter(function() { return $(this).text().toLowerCase().replace(/ /g,"-") == href });
        // scroll to this element
        if ($el.length === 1) $('.wrapper')[0].scrollTop = $el.offset().top;
        
        return false;
      }
      
      $link.attr('href','?page='+href)
    })
  }
  
  
  // ------------------------------------------
  //  REGISTER
  // ------------------------------------------
  
  var register = function(){
    setupLanguage();
    setupNavigation();
    checkIncludes();
    registerClick();
  }
  
  // ------------------------------------------
  //  PUBLIC
  // ------------------------------------------
  
  // Plugin initialization on DOM ready
  $(document).ready(function() {
    register();
  });
  
  
}(jQuery);
