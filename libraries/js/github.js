
// source: http://lions-mark.com/jquery/scrollTo/
$.fn.scrollTo=function(c,a,d){if(typeof a=="function"&&arguments.length==2){d=a;a=c}var b=$.extend({scrollTarget:c,offsetTop:50,duration:500,easing:"swing"},a);return this.each(function(){var e=$(this);var f=(typeof b.scrollTarget=="number")?b.scrollTarget:$(b.scrollTarget);var g=(typeof f=="number")?f:f.offset().top+e.scrollTop()-parseInt(b.offsetTop);e.animate({scrollTop:g},parseInt(b.duration),b.easing,function(){if(typeof d=="function"){d.call(this)}})})};

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
  }
  
  // ------------------------------------------
  //  AJAX
  // ------------------------------------------
  
  var checkIncludes = function(scope){
    
    var $scope = $(scope || document);
    $scope.find('DIV[data-page]').each(ajaxGitHub)
  }
  
  var ajaxGitHub = function(){
    var $div = $(this);
    var url = 'markdown/' + language + '/' + $div.attr('data-page') + '.md';
    ajax(url, {}, function(html){
      $div.html( convertMarkdown(html) );
      highlight($div);
      bindLinks($div);
      blocks($div);
    });
  }

  var ajax = function(url, params, callback, method){
    // Build Request
    var request = $.ajax({
      url: url, 
      data: params,
      type: method || 'GET', 
      cache: false,
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
    // replace the <table> by adding the Bootstrap classes
    return marked(md).replace(/<table>/g, '<table class="table table-bordered">');
  }
  
  // ------------------------------------------
  //  BLOCKS
  // ------------------------------------------
  
  var blocks = function($div){
    $div.find('.block-tabs').each(function(){
     
     // Build Tab Header
     var active = true;
     var tabHead  = '<ul class="nav nav-tabs" role="tablist">';
     var $content = $('<div class="tab-content"></div>');
     var $block   = $(this);
     $block.find('H4').each(function(){
        var $this = $(this);
        var clazz = active ? 'active' : ''; active = false;
        var title = $this.text();
        var id    = title.replace(/^[^a-z]+|[^\w:.-]+/gi, "");
        tabHead += '<li role="presentation" class="'+ clazz + '"><a href="#'+id+'">'+title+'</a></li>'; 
        $content.append($('<div role="tabpanel" id="'+id+'" class="tab-pane '+clazz+'"></div>').append($this.nextUntil('H4')));
     });
     tabHead += '</ul>';
     
     $block.html('<div role="tabpanel"></div>');
     $block.append(tabHead);
     $block.append($content);
    });
    
    // Register Tabs
    $(document).on('click', '.nav-tabs A', function(event){
      $(this).tab('show');
      event.preventDefault();
    })
  }
  
  
  // ------------------------------------------
  //  CLICK
  // ------------------------------------------
  
  var bindLinks = function($div) {
    // we first want to change the regular link to a special link
    // e.g. href="mypage" will be changed to href="?page=mypage"
    $div.find('a[href]').map(function() {
      var $link = $(this);
      var href = $link.attr("href");
      if (href.slice(0,4) !== 'http' && !$link.attr('rel') && href.charAt(0) !== '#' && href.charAt(0) !== '?') {
        $link.attr('href','?page='+href)
      }
    });
    
    // we also want to scroll down to the # from the URL
    // only if we deal with the #doc-content
    if ($div.attr("id") === "doc-content") scrollTo(window.location.hash)
  }

  // when a # appears in the URL then we want to internally scroll to the correct Hx element
  $(window).on('hashchange', function(event) {
    event.preventDefault();
    scrollTo(window.location.hash)
  });
  
  // Permits to scroll to the Hx element that is named like the parameter
  var scrollTo = function(hash) {
    if (!hash) return;
    if (hash.charAt(0)==="#") hash=hash.slice(1);
    // search for the Hx elements to find the related one
    // we use the text() of the Hx elements
    // and we change it to a lower case, replacing single quote (') and ? by null
    // and replacing white space with a dash "-"
    // So "Hello World ?" will look like "hello-world"
    hash=decodeURIComponent(hash.toLowerCase());
    var $el = $('h1,h2,h3,h4').filter(function() {
      return $(this).text().toLowerCase().replace(/('| ?\?$)/g,"").replace(/ /g,"-") == hash
    });
    // scroll to this element
    if ($el.length === 1) $('#doc-content').scrollTo($el);
  }

  // ------------------------------------------
  //  HIGHLIGHT
  // ------------------------------------------
  
  var highlight = function(scope){
    var $scope = $(scope || document);
    
    $scope.find('CODE[class^=lang-]').each(function(){
      var $elm = $(this);
      var lang = $elm.attr('class').substring(5);
      $elm.attr('class', lang)
      hljs.highlightBlock($elm[0]);
    })
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
