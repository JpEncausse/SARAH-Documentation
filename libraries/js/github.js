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
  //  REGISTER
  // ------------------------------------------
  
  var register = function(){
    setupLanguage();
    setupNavigation();
    checkIncludes();
  }
  
  // ------------------------------------------
  //  PUBLIC
  // ------------------------------------------
  
  // Plugin initialization on DOM ready
  $(document).ready(function() {
    register();
  });
  
  
}(jQuery);