var URL = '';
//取一个元素
function $(id){
	return document.getElementById(id);
}

//获得当前的url,设置回调函数
function removeCurrentCookies(callback){
  var queryInfo = {
      active: true,
      currentWindow: true
  };
  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.log('tab url is :'+url);
    callback(url);
  });
}

//注入cookie
function inject_cookies(cookies,attr){
	if(!cookies){
		$('status').innerHTML = 'No Cookies Injected.';
		return;
	}
    var isHttps = false;
	var isHttpOnly = false;
	if(attr.https){
		isHttps= true;
	}
	if(attr.httpOnly){
		isHttpOnly = true;
	}
	if (!chrome.cookies) {
	  chrome.cookies = chrome.experimental.cookies;
	}
	
	d = new Date();;
	expired = 365*1; // 1 year ttl
	e = d.setTime(d.getTime()/1000+expired*24*3600); //second
	
	domain = URL.split('/')[2];
	if($('domain').value != domain){
		domain = $('domain').value;
	}
	url = URL.split('/')[0] + '//' + domain;

	cc = cookies.split(';');
	for(i in cc){
		c = cc[i].replace(/^\s+|\s+$/g, "");
		if(!c) continue;
		k = c.split('=')[0].replace(/^\s+|\s+$/g, "").replace(' ', '+');
		v = c.split('=')[1].replace(/^\s+|\s+$/g, "").replace(' ', '+');
		chrome.cookies.set({
			'url': url,
			'name': k,
			'value': v,
			'domain': $('domain').value,
			'path': '/',
			'secure':isHttps,
			'httpOnly':isHttpOnly,
			'expirationDate': e,
		});
	};
	$('status').innerHTML = 'Inject OK.';
	
}

//初始化
function init(){
	$('content').focus();
	//获取进行了本地存储的cookie
	var cookie = localStorage.getItem('cookies');
	$('content').value = cookie;
	chrome.tabs.getSelected(null,function(tab) {  
	    URL = tab.url;
		$('domain').value = URL.split('/')[2];
	});

	$('content').addEventListener('blur', function(){
		localStorage.setItem('cookies',$('content').value);
	});

	//向本地注入一个cookie值
	$('exec_btn').addEventListener('click', function () {
		//是否https，是否httpOnly
        var attr = {};
		if($('https').checked){
			attr.https = true;
		}
		if($('httpOnly').checked){
			attr.httpOnly = true;
		}
		inject_cookies($('content').value, attr);
	});
	//清除localStorage中的cookie
	$('clear_btn').addEventListener('click',function(){
		removeCurrentCookies(function(url){
			console.log('remove url is:'+url);
			var cookie = localStorage.getItem('cookies');
			cookieName = cookie.split(';');
			console.log('cookie name is :'+cookieName);
			var domain = url.split('/')[2];
			var url = url.split('/')[0] + '//' + domain;
			console.log('clear cookie url is:'+url);
			for(var c in cookieName){
				console.log('c is:'+c);
				var removeName = cookieName[c].split('=')[0];
				console.log('removeName is:'+removeName);
				obj = {
					'url':url,
					'name':removeName.replace(/[\r\n|\ +]/g,"")
				};
				chrome.cookies.remove(obj);
			}
			})
			$('status').innerHTML = 'Clear Ok';
		});
	}
document.addEventListener('DOMContentLoaded', init);