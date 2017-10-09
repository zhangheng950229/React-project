

//console.log(localStorage.getItem(Key))  //{"id":"8","count":"1"}
//alert(localStorage.length)
var str='';
var arr=[];
for(var i=0;i<localStorage.length;i++){
	var keys=localStorage.key(i)
	//console.log(keys)
	var val=JSON.parse(localStorage.getItem(keys))
	//console.log(val)	
	console.log(val.id)
	var  id=parseInt(val.id);
	var count=val.count;
	//console.log(val.id.length)
	arr.push(id);
	//console.log(arr);	
}
	//console.log($(".aaa"))
	
		$.ajax({
			url:"date/splist.json",
			success:function(data){
				//console.log(arr)				
				for(var id=0;id<arr.length;id++){		
					//alert(arr[id])
					for(var i in data){
						//console.log(i)
						if( i==arr[id] ){
							$(".kong").hide()
							//alert(arr[id])
							shopinfo = data[i];						
							str+='<div class="goodslist"><div class="btn"><input type="checkbox" class="ck" checked="checked"/></div><div class="goodsimg"><img src="'+shopinfo.src+'"/></div><div class="goodsinfo"><p>'+ shopinfo.name +'</p><h6>材质:'
							+shopinfo.cz+'</h6><i class="sumPrice">'
								+ shopinfo.price*count  +'元</i><div class="zj"'+
										'data-id="'+ id +'" '+
										'data-price="'+ shopinfo.price +'" data-count="'+ count +'"'+
										'data-name="'+ shopinfo.name +'" data-src="'+ shopinfo.src +'"'+'><b class="updateCount jia" data-number="1">+</b><em  class="shop-count">'
								+ count +'</em><b class="updateCount jian" data-number="-1">-</b></div></div><div class="goodsremove"><i class="iconfont icon-shanchu"></i></div></div>';
						}
					}
				}		
				$(".goods").append(str);
				
				//加减操作
			$(".updateCount").on("tap",function(){
				//取出操作符号 +  -
				var f = $(this).html();
				//取出num 
				var num=parseInt($(this).parent().parent().find(".shop-count").html());
				if(num==1&&f=="-"){
					return false;
				}	
				
				f=="+"?num++:num--;
				$(this).parent().find(".shop-count").html(num);
				$(this).parent().prev().html( num * shopinfo.price +"元" );
				//alert( count * shopinfo.price )					
				jiesuan();
				
			})	
				
			
				
				
				//删除	
			$(".goodsremove").on("click",function(){
				//alert(3)
				//var spid=$(this).attr("data-id")
				if(confirm('确定要删除么？')){
					$(this).parent().remove();
					localStorage.removeItem(keys)
				}
					if($(".goodslist").size()==0){
						$(".kong").show()
					}
			});
			
			
			
			
			
			
			
			
			
			
			jiesuan();
			function jiesuan(){
				var sumMoney = 0;
				$(".ck:checked").each(function(){
					//找到备选中的商品 及其数量和金额
					//alert(  $(this).parent().parent().find(".shop-count").html() )
					var num=parseInt($(this).parent().parent().find(".shop-count").html());
					sumMoney+=parseInt($(this).parent().parent().find(".sumPrice").html());					
				})
				$(".p1").html("合计:￥"+sumMoney);
			}
			
			
			//全选
			$(".qxa").on("touchend",function(){
				//alert(6)
				$(".ck").prop("checked",$(this).prop("checked"));
				jiesuan();
			})
			
			$(".ck").on("touchend",function(){
				if($(this).prop("checked")){
					$(this).checked=false;
				}
			})
			
			
			
			
			
			
			$(".btnjs").on("touchend",function(){	
				alert("结算成功！");
			})			
		}
	})


	
	
	
