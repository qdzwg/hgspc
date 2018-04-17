$(function(){
    //满减切换
    if($("#coupon-ch").length>0){
		$("#coupon-ch").click(function(){
			if( $(this).find("option:selected").data("yh") =="code" ){
				$("#coupon-yhq").hide();
				$("#coupon-code").show();
			}else if($(this).find("option:selected").data("yh") =="reduce"){
				$("#coupon-yhq").show();
				$("#coupon-code").hide();
			}else{
				$("#coupon-card").show();
				$("#coupon-yhq").hide();
			}
		});
	}

	if($(".changeTime").length>0){
        $(".changeTime").click(function(){
            $(this).parent(".modify-time-rear").hide();
            $(this).parent().siblings(".modify-time-box").css({"display":"inline-block"});
        });

    }

    if($(".xy-btn").length>0){
        $(".xy-btn").click(function(){
            $(".xy-box,.mask").show();
        })
        $(".layer-close").click(function(){
            $(".xy-box,.mask").hide();
        })
    }
})


//优惠券
function changeCoupon(opts) {
    var couponOrderId = $("#coupon-yhq select option:selected").data("denominationprice");
    // var couponInfoId = $("#coupon-yhq select option:selected").data("couponinfoid");
    $("#couponOrderId").val(couponOrderId);
    $("#yhje").text(couponOrderId);
    // $("#couponInfoId").val(couponInfoId);
    // $("#ccouponInfoId").val(couponInfoId);
    opts?totalprice(opts):hoteltotalprice();
}

function postForm(obj,validator,module) {
    $("."+obj).click(function () {
        if(validator.form()){
            console.log($("#validateForm").serialize())
            $.post(window.location.href,$("#validateForm").serialize())
                .success(function (data) {
                    var datas = data[0];
                    if (datas.status === 200){
                        window.location.href = '/pay/'+module+'/' + datas.data.orderNo;
                    }
                    else if(datas.status === 400){
                        window.location.href = '/login';
                    }else{
                        dilogbox(datas.status,datas.message,'javascript:;')
                    }
                })
        }
    });
}








