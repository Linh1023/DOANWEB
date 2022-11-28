function CreateProduct(masp,tensp,thuonghieu,hinh,gia,sosao,nongdo,dungtich){
    var product = new Object();
    product.masp = masp;
    product.tensp=tensp;
    product.thuonghieu = thuonghieu;
    product.hinh = hinh;
    product.gia = gia;
    product.sosao = sosao;
    product.nongdo = nongdo;
    product.dungtich = dungtich;

    product.toJson = function(){
        var json = JSON.stringify(this);
        return json;
    }

    product.fromJSON = function(json){
        var doiTuongDayDu = new Object();
        var doiTuong = JSON.parse(json);

        var doiTuongDayDu = CreateProduct(doiTuong.masp,doiTuong.tensp,doiTuong.thuonghieu,doiTuong.hinh,doiTuong.gia,doiTuong.sosao,doiTuong.nongdo,doiTuong.dungtich);
        return doiTuongDayDu;
    }
    return product;
}

function ChuyenDSDTSPthanhHTML(alcoholList){
    var HTMLlistProducts = ' <div class="items"> ';
    for(var i = 0;i<alcoholList.length;i++){
        var product = alcoholList[i];
        var htmlProducts = chuyenDTSPthanhHTML(product);
        HTMLlistProducts = HTMLlistProducts + htmlProducts;
    }
    HTMLlistProducts = HTMLlistProducts + '</div>'
    return HTMLlistProducts;
}



function chuyenDTSPthanhHTML(product){
    var html = ' ';
    
   html+=           '<div class="item">'
   html+=                   '< <div class="item-img">'
   html+=                       '<img src="'+product.hinh+'" alt="">'
   html+=                   '</div>'
   html+=                   '<div class="stars">'
   for(var i=1;i<=product.sosao;i++){
       html+=                    '<span> <img src="assets/images/star.png" alt=""></span>'
   }
   html+=                   '</div>'
   html+=                     '<div class="item-information">'
   html+=                ' <h3 class="item-title">'+product.tensp+'</h3>'
   html+=                '<div class="item-Category">'+product.thuonghieu+'</div>   '
   html+=                '<div class="item-price">'+product.gia+'</div>'
   html+=                   '</div>'
   html+=           ' </div>'

   return html;
}