function getalcoholList() {
    return JSON.parse(window.localStorage.getItem('alcoholList'));
}
window.onload=function(){
    //Lấy dssp trong localstorage
    // var jsonlistProducts = localStorage.getItem("alcoholList");
    // var alcoholList = JSON.parse(jsonlistProducts);
    alcoholList=getalcoholList()||alcoholList;
    addtable('All');
}
function addtable(value){
    //Chuyển ds đối tượng SP sang HTML
    var HTML=`<div class="search">
    <input class="khungtimkiem" type="text" placeholder="Tìm kiếm..." onkeyup="timKiemSanPham(this,'`+value+`')">
  </div>`;
    // HTML+=`<input >`
    HTML += ChuyenDSDTSPthanhHTML(alcoholList,value);
    //Gắn đoạn HTML vào ListProducts
    var nodeProducts = document.getElementById("list-products");
    nodeProducts.innerHTML = HTML;

    if(value=="All")
    var button=document.getElementsByClassName('button-value')[0];
    document.getElementsByClassName('button-value')[1].style.background = '#fff';
    document.getElementsByClassName('button-value')[2].style.background = '#fff';
    document.getElementsByClassName('button-value')[3].style.background = '#fff';
    document.getElementsByClassName('button-value')[1].style.color = '#6759ff';
    document.getElementsByClassName('button-value')[2].style.color = '#6759ff';
    document.getElementsByClassName('button-value')[3].style.color = '#6759ff';
    if(value=="Rum")
    var button=document.getElementsByClassName('button-value')[1];
    document.getElementsByClassName('button-value')[0].style.background = '#fff';
    document.getElementsByClassName('button-value')[2].style.background = '#fff';
    document.getElementsByClassName('button-value')[3].style.background = '#fff';
    document.getElementsByClassName('button-value')[0].style.color = '#6759ff';
    document.getElementsByClassName('button-value')[2].style.color = '#6759ff';
    document.getElementsByClassName('button-value')[3].style.color = '#6759ff';
    if(value=="Whisky")
    var button=document.getElementsByClassName('button-value')[2];
    document.getElementsByClassName('button-value')[1].style.background = '#fff';
    document.getElementsByClassName('button-value')[0].style.background = '#fff';
    document.getElementsByClassName('button-value')[3].style.background = '#fff';
    document.getElementsByClassName('button-value')[1].style.color = '#6759ff';
    document.getElementsByClassName('button-value')[0].style.color = '#6759ff';
    document.getElementsByClassName('button-value')[3].style.color = '#6759ff';
    if(value=="Vodka")
    var button=document.getElementsByClassName('button-value')[3];
    document.getElementsByClassName('button-value')[1].style.background = '#fff';
    document.getElementsByClassName('button-value')[2].style.background = '#fff';
    document.getElementsByClassName('button-value')[0].style.background = '#fff';
    document.getElementsByClassName('button-value')[1].style.color = '#6759ff';
    document.getElementsByClassName('button-value')[2].style.color = '#6759ff';
    document.getElementsByClassName('button-value')[0].style.color = '#6759ff';
    button.style.background = '#6759ff';
    button.style.color = '#fff';

}
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
var soitemtrongdanhmuc;
function ChuyenDSDTSPthanhHTML(alcoholList,value){
    var dem=0;
    var giatritren=document.getElementsByClassName('khoanggiatien')[1].value;
    var giatriduoi=document.getElementsByClassName('khoanggiatien')[0].value;

    for(var i = 0;i<alcoholList.length;i++){
        if(giatriduoi!=''&&giatritren!='')
        {  
            if((alcoholList[i].thuonghieu==value||value=='All')&&(stringtoNum(alcoholList[i].gia)>giatriduoi&&stringtoNum(alcoholList[i].gia)<giatritren)){
                dem++;
            }
        }
        else
        if(alcoholList[i].thuonghieu==value||value=='All'){
            dem++;
        }
        soitemtrongdanhmuc=dem;
    }
    var HTMLlistProducts = ' <div id="soluongsanpham">Tìm thấy '+dem+' sản phẩm </div> <div class="items">';
    for(var i = 0;i<alcoholList.length;i++){
        
            if(giatriduoi!=''&&giatritren!='')
            {  
                if((alcoholList[i].thuonghieu==value||value=='All')&&(stringtoNum(alcoholList[i].gia)>giatriduoi&&stringtoNum(alcoholList[i].gia)<giatritren)){
                    var product = alcoholList[i];
                    var htmlProducts = chuyenDTSPthanhHTML(product);
                    HTMLlistProducts = HTMLlistProducts + htmlProducts;
                }
            }
            else
            if(alcoholList[i].thuonghieu==value||value=='All'){
                var product = alcoholList[i];
                var htmlProducts = chuyenDTSPthanhHTML(product);
                HTMLlistProducts = HTMLlistProducts + htmlProducts;


            }

    }
    HTMLlistProducts = HTMLlistProducts + '</div>'
    
    return HTMLlistProducts;
}

function chuyenDTSPthanhHTML(product){
    var html = '';
   html+=           '<div class="item" onclick="addKhungItem(`'+product.masp+'`)" value="'+product.masp+'">'
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
   html+=                   '<div class="item-price">'+product.gia+'$</div>'
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
                  <div class="price__coin">`+sp.gia+`<u>$</u></div>
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
function stringtoNum(str,char){
    return Number(str.split(char || '.').join(''));
}
function numToString(num, char) {
    return num.toLocaleString().split(',').join(char || '.');
}
function timKiemSanPham(inp,value) {
    var text = inp.value.toLowerCase();
    // alert(text)
    if(text==""){
        addtable(value);return;
    }
    // Lọc
    var dem=0;
    for (var i=0;i<soitemtrongdanhmuc;i++) {
        //bắt đầu từ item số 6 vì trên menu cũng có 6 class item
        var item=document.getElementById("list-products").getElementsByClassName("item")[i];
        for(var c of alcoholList)
        if(c.masp==item.getAttribute('value'))
            var td = c.tensp.toLowerCase();
            if(td.indexOf(text)>=0){
                item.style.display = '';
                dem++;
            }
            else {
                item.style.display = 'none';
            }
        }
    var sosanphamcu=document.getElementById('soluongsanpham');
    var sossanphammoi=`Tìm thấy `+dem+` sản phẩm`;
    sosanphamcu.innerHTML=sossanphammoi;
    
}