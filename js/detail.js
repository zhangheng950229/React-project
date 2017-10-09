var gurl = location.href;
count = 1;
var goodsId = gurl.split("?")[1]
goodsId = goodsId.split("=")[1];
setTimeout(function() {
	myscroll=new IScroll("#main", {
		tap: true,
		click:true
	})
}, 100)

new Swiper('.swiper-container', {
	direction: 'horizontal',
	loop: true,
	pagination: '.swiper-pagination'
})
$.ajax({
	url: "date/splist.json",
	success: function(msg) {
		for (var i in msg) {
			if (i == goodsId) {
				var str = "<img src=" + msg[i].src + " />"
				var dataIn = "<p class='addcart' dataid=" + i + " dataCount=" + msg[i].count + " datasrc=" + msg[i].src + " dataprice=" + msg[i].price + " dataname=" + msg[i].name + " ><i class='icon iconfont'>&#xe63f;</i> 加入购物车</p><p>立即购买</p>"
				$(".swiper-slide").html(str);
				$(".goodsInfo").html(msg[i].name)
				$(".detail_pirce").html(msg[i].price);
				$("footer").html(dataIn)
				$(".addcart").on("tap", function() {
					var dataInfo={
						id:$(this).attr("dataid"),
						count:$(".goods_num").html(),
					}
				localStorage.setItem(i,JSON.stringify(dataInfo))
				})
				break;
			}
		}
	}
});
$("#jian").on("tap", function() {
	count--;
	if (count < 0) {
		count = 0;
	}
	$(".goods_num").html(count)
})
$("#jia").on("tap", function() {
	count++;
	$(".goods_num").html(count)
})
$.ajax({
	url:"http://datainfo.duapp.com/shopdata/getGoods.php",
	dataType:"jsonp",
	success:function(msg){
		var like=eval(msg)
		for(var i in like){
			var str=""
			var str="<dl>"
			str+="<dt><img src="+like[i].goodsListImg+">"
			str+="<dd>"
			str+="<p>"+like[i].goodsName+"</p>"
			str+="<p class=detail_pirce>￥"+like[i].price+"</p>"
			str+="</dd>"
			str+="</dl>"
			$(".personal_guestlike").append(str)
			
		}
		myscroll.refresh();
	}
});
