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
    
   html+=           '<div class="item" onclick="addKhungItem('+product.masp+')">'
   html+=                   '<div class="item-img">'
   html+=                       '<img src="'+product.hinh+'" alt="">'
   html+=                   '</div>'
   html+=                   '<div class="stars">'
   for(var i=1;i<=product.sosao;i++){
       html+=                    '<span> <img src="assets/images/star.png" alt=""></span>'
   }
   html+=                   '</div>'
   html+=                '<div class="item-information">'
   html+=                   ' <h3 class="item-title">'+product.tensp+'</h3>'
   html+=                   '<div class="item-Category">'+product.thuonghieu+'</div>   '
   html+=                   '<div class="item-price">'+product.gia+'</div>'
   html+=                '</div>'
   html+=           ' </div>'

   return html;
}
function addKhungItem(masp){
    var sp;
    for(var a of alcoholList) {
        if(a.masp==masp) {
            sp = a;
        }
    }
    var khung=document.getElementById('khungchitietsanpham');
    var xuat=`
    <span class="close"  onclick="this.parentElement.style.transform = 'scale(0)';"><i class="ti-close"></i></span>
    <div class="grid">

    <div class="title">
      <header class="heading">`+sp.tensp+`</header>
      <div class="sub-heading">`+sp.dungtich+`ml / `+sp.nongdo+`%</div>
    </div>
    <div class="row">
        <div class="col l-4">
            <a href="" class="product-image">
              <img src="`+sp.hinh+`" alt="MATUSALEM" class="product-image__img">
            </a>
      </div>
      <div class="col l-4">
          <div class="product-rate">
              <div class="part">
                  <h4 class="part1__customer-rate">KHÁCH HÀNG ĐÁNH GIÁ</h4>`
    for(var i=1;i<=sp.sosao;i++){
        xuat+=
        `<i class="part1__rate-star-icon ti-star"></i>`
    }
        xuat+=`
              </div>
              <div class="part">
                  <h4 class="part1__customer-rate part1__customer-rate--hover">TASTING NOTES <span>(0)</span>
                  </h4>
                  <div class="part-wrap">
                      <div class="part1">
                          <i class="part__icon ti-angle-right"></i>
                          <h4 class="part1__customer-rate">THỜI GIAN GIAO HÀNG</h4>
                      </div>
                      <div class="part2">
                          <i class="part__icon ti-control-record"></i>
                          <h4 class="part1__customer-rate">ĐẶT HÀNG TRƯỚC 2-4 GIỜ</h4>
                      </div>
                  </div>
              </div>
              <div class="part">
                  <h4 class="part1__customer-rate">THẺ TỪ KHÓA</h4>
                  <a class="part__keyword-tag">`+sp.thuonghieu+`</a>
              </div>
              <div class="product-buy">
                  <a href="" class="product-buy__btn">MUA HÀNG</a>
              </div>
          </div>
      </div>
      <div class="col l-4">
          <div class="contain-price">
              <div class="price">
                  <h3 class="price__heading">GIÁ THAM KHẢO</h3>
                  <div class="price__coin">`+sp.gia+`<u>đ</u></div>
                  <div class="price__terms">ĐIỀU KHOẢN <a href="" class="price__terms-link">GIAO HÀNG</a>
                  </div>
              </div>
              <div class="compare">
                  <div class="like">
                      <i class="ti-heart like-icon"></i>
                      <span class="like-desc">ADD TO LIST</span>
                  </div>
                  <div class="compare-wrap">
                      <i class="compare-icon ti-arrows-horizontal"></i>
                      <span class="compare-desc">SO SÁNH</span>
                  </div>
              </div>
              <div class="support">
                  <div class="support-wrap">
                      <div class="customer-support">HỖ TRỢ KHÁCH HÀNG</div>
                      <span class="phone">HOTLINE: <a href="tel:012345678"
                              class="phone__number">012345678</a></span>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <div class="row parent-border">
  </div>      
  </div>`
    khung.innerHTML = xuat;
    khung.style.transform = 'scale(1)';
}
function numToString(num, char) {
    return num.toLocaleString().split(',').join(char || '.');
}