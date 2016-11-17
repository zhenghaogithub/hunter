(function () {
    var MyApp = angular.module('app');
    var controllerId = "robot";
    MyApp.controller(controllerId,['$rootScope', '$http', '$scope', 'common','config','datacontext', robot])
    function robot($scope)
    {
         $scope.sendMessage = function(){
				var txt=document.getElementById("account").value;
				writeMessage(txt);
				loadChat(txt);

                                function writeMessage(txt){
     				var d=document.getElementById("chatPanel")
     
     				var li =document.createElement("li");
     				var img =document.createElement("img");
     				var span =document.createElement("span");
     				span.innerHTML= txt;
     				img.src = "/static/images/1.jpg";
     				img.className = "imgleft";
     
     
     				span.className="spanleft";
     
     				li.appendChild(img);
     				li.appendChild(span);
     				d.appendChild(li);
                                };
     
                                function writeAnswer(txt){
      	                        var d=document.getElementById("chatPanel")
     				var li =document.createElement("li");
     				var img =document.createElement("img");
     				var span =document.createElement("span");

                                console.log("answer in " + txt);
     				span.innerHTML= txt;
     				img.src = "/static/images/0.jpg";
     				img.className = "imgright";
     				span.className="spanright";
     				li.appendChild(img);
     				li.appendChild(span);
     				d.appendChild(li);
                                };
     
                                function loadChat(tempStr){
     				var code =$("#account").val();
     				document.getElementById("account").value="";
     				code = "a1=" + code;
     				console.log(code);
     				$.ajax({
     					url: '/robot/robot',//后台地址
     					type: 'get',
     					data: code,
     					dataType:  'json',
     					success: function (data, textStatus) {
                                                console.log(data);
     						writeAnswer(data.answer);
     					},
     					error: function(XMLHttpRequest, textStatus, errorThrown) {
     						console.log(XMLHttpRequest.status);
     						console.log(XMLHttpRequest.readyState);
     						console.log(textStatus);
     					}
     				});
                                };

       }
}


})();
