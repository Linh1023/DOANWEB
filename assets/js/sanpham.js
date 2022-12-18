window.onload=function(){
    alcoholList=getalcoholList()||alcoholList;
    addtable('All',1);
}
function getalcoholList() {
    return JSON.parse(window.localStorage.getItem('alcoholList'));
}
function addtable(value,thispage){
    //Chuyển ds đối tượng SP sang HTML
    var HTML=`<div class="search">
    <input class="khungtimkiem" type="text" placeholder="Tìm kiếm..." onkeyup="timKiemSanPham(this,'`+value+`')">
  </div>`;
    HTML += ChuyenDSDTSPthanhHTML(alcoholList,value,thispage);
    //Gắn đoạn HTML vào ListProducts
    var nodeProducts = document.getElementById("list-products");
    nodeProducts.innerHTML = HTML;

    var button=document.getElementsByClassName('button-value');
    var u;
    if(value=="All")u=0;
    if(value=="Rum")u=1;
    if(value=="Whisky")u=2;
    if(value=="Vodka")u=3;
    for(var i=0;i<button.length;i++)
    {
        if(i==u){
            button[i].style.background = '#626a67';
            button[i].style.color = '#fff';
            continue;
        }
        button[i].style.background="#fff";
        button[i].style.color='#626a67';
    }
    var trang=document.getElementsByClassName('listpage')[0].getElementsByClassName('lilistpage')[thispage-1];
    trang.style.background="#70c4c3";
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
function ChuyenDSDTSPthanhHTML(alcoholList,value,thispage){
    var mangdstam=[];
    var dem=0;
    var giatritren=document.getElementsByClassName('khoanggiatien')[1].value;
    var giatriduoi=document.getElementsByClassName('khoanggiatien')[0].value;
    //ham dem so san pham
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
    //in ra tìm thấy bao nhiêu sản phẩm
    var HTMLlistProducts = ' <div id="soluongsanpham">Tìm thấy '+dem+' sản phẩm </div> <div class="items">';

    for(var i = 0;i<alcoholList.length;i++){
        if(alcoholList[i].thuonghieu==value||value=='All'){
            if(giatriduoi!=''&&giatritren!=''){
                if(stringtoNum(alcoholList[i].gia)>giatriduoi&&stringtoNum(alcoholList[i].gia)<giatritren)
                    mangdstam.push(alcoholList[i]);
            }
            else
                mangdstam.push(alcoholList[i]);
        }
    }
        var sosp1trang=6;
        var sotrang;

        if(mangdstam.length % sosp1trang==0)
            sotrang=mangdstam.length/sosp1trang;
        else sotrang=(mangdstam.length-(mangdstam.length%sosp1trang))/sosp1trang+1;

        let begin=(thispage-1)*sosp1trang;
        let end=(thispage)*sosp1trang;

        for(var i=begin;i<end;i++){
            if(mangdstam[i]){

                var product = mangdstam[i];
                var htmlProducts = chuyenDTSPthanhHTML(product);
                HTMLlistProducts = HTMLlistProducts + htmlProducts;
            }
        }
        mangdstam.splice(0,mangdstam.length);
    
    HTMLlistProducts = HTMLlistProducts + '</div>'
    HTMLlistProducts +=`<ul class="listpage">`

    if(thispage>1)
    HTMLlistProducts+=`<li  onclick="addtable('`+value+`',`+(thispage-1)+`)">Prev</li>`
    else HTMLlistProducts+=`<li  style="background-color:#ccc">Prev</li>`


    for(var i=1;i<=sotrang;i++)
    HTMLlistProducts+=`<li class="lilistpage" onclick="addtable('`+value+`',`+i+`)">`+i+`</li>`

    if(thispage<sotrang)
    HTMLlistProducts+=`<li  onclick="addtable('`+value+`',`+(thispage+1)+`)">Next</li>`
    else
    HTMLlistProducts+=`<li  style="background-color:#ccc"">Next</li>`


    HTMLlistProducts+=`</ul>`
    
    return HTMLlistProducts;
}

function chuyenDTSPthanhHTML(product){
    var html = '';
   html+=           '<div class="item" onclick="addKhungItem(`'+product.masp+'`)" value="'+product.masp+'">'
   html+=                   '<div class="item-img">'
   if(product.hinh!=null)
   html+=                       '<img src="'+product.hinh+'" alt="">'
   else
   html+=                       '<img src="./assets/images/img-products/default.jpg" alt="">'

   html+=                   '</div>'
   html+=                   '<div class="stars">'
   for(var i=1;i<=product.sosao;i++){
       html+=                    '<span> <img src="assets/images/star.png" alt=""></span>'
   }
   html+=                   '</div>'
   html+=                '<div class="item-information">'
   html+=                   ' <h3 class="item-title">'+product.tensp+'</h3>'
   html+=                   '<div class="item-Category">'+product.thuonghieu+'</div>   '
   html+=                   '<div class="item-price">'+product.gia+'₫</div>'
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
    <span class="closes"  onclick="this.parentElement.style.transform = 'scale(0)';"><i class="ti-close"></i></span>
    <div class="grid">

    <div class="title">
      <header class="heading">`+sp.tensp+`</header>
      <div class="sub-heading">`+sp.dungtich+`ml / `+sp.nongdo+`%</div>
    </div>
    <div class="row">
        <div class="col l-4">
            <a href="" class="product-image">`
        if(sp.hinh==null)
            xuat+=`
                <img src="./assets/images/img-products/default.jpg" alt="MATUSALEM" class="product-image__img">`
        else
        xuat+=`
                <img src="`+sp.hinh+`" alt="MATUSALEM" class="product-image__img">`

        xuat+= `
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
                  <a class="product-buy__btn" onclick="themVaoGioHang(`+sp.masp+`,'`+sp.tensp+`')">Thêm Vào Giỏ Hàng</a>
              </div>
          </div>
      </div>
      <div class="col l-4">
          <div class="contain-price">
              <div class="price">
                  <h3 class="price__heading">GIÁ THAM KHẢO</h3>
                  <div class="price__coin">`+sp.gia+`<u>₫</u></div>
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
    if(text==""){
        addtable(value,thispage);return;
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

/////////////////////////////////////////////////////////////////// js trong chi tiet san pham
function themVaoGioHang(masp, tensp) {
    var user = getCurrentUser();
    if (!user) {
        addmess('Bạn cần đăng nhập để mua hàng !','#aa0000', '#fff', 10000);
        showTaiKhoan(true);
        return;
    }
    if (user.off) {
        addmess('Tài khoản của bạn hiện đang bị khóa nên không thể mua hàng!','#aa0000', '#fff', 10000);
        addmess('Tài khoản của bạn đã bị khóa bởi Admin.', '#aa0000', '#fff', 10000);
        return;
    }
    var t = new Date();
    var daCoSanPham = false;;

    for (var i = 0; i < user.products.length; i++) { // check trùng sản phẩm
        if (user.products[i].ma == masp) {
            user.products[i].soluong++;
            daCoSanPham = true;
            break;
        }
    }
    if (!daCoSanPham) { // nếu không trùng thì mới thêm sản phẩm vào user.products
        user.products.push({
            "ma": masp,
            "soluong": 1,
            "date": t
        }
        );
    }
    // animateCartNumber();
    addmess('Đã thêm ' + tensp + ' vào giỏ.', '#000', '#fff', 3500);

    setCurrentUser(user); // cập nhật giỏ hàng cho user hiện tại
    updateListUser(user); // cập nhật list user
}
function getCurrentUser() {
    return JSON.parse(window.localStorage.getItem('CurrentUser')); // Lấy dữ liệu từ localstorage
}
function getTongSoLuongSanPhamTrongGioHang(u) {
    var soluong = 0;
    for (var p of u.products) {
        soluong += p.soluong;
    }
    return soluong;
}
function addmess(text, bgcolor, textcolor, time) {
    var al = document.getElementById('message');
    var a = document.getElementById('hihi');
    a.innerHTML = text;

    al.style.backgroundColor = bgcolor;
    al.style.opacity = 1;
    al.style.zIndex = 200;

    if (textcolor) al.style.color = textcolor;
    if (time)
        setTimeout(function () {
            al.style.opacity = 0;
            al.style.zIndex = 0;
        }, time);
}